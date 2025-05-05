import { database } from "../database/index"
import AsyncStorage from "@react-native-async-storage/async-storage"

// URLs des API - Mise à jour avec le nouveau chemin
const API_BASE_URL = "http://82.112.240.194:8585"
const API_PATH = "/api"

// Clés pour AsyncStorage
const LAST_SYNC_KEY = "last_sync_timestamp"
const SYNC_SETTINGS_KEY = "sync_settings"

// Tables à synchroniser
const TABLES = ["dossiers", "consultations", "accouchements", "cpns", "dentaires", "pmis", "suivis", "vaccins"]

// Variable pour stocker l'intervalle de synchronisation
let syncIntervalId = null

/**
 * Fonction utilitaire pour convertir les noms de champs camelCase en snake_case
 * @param {string} camel - Nom en camelCase
 * @returns {string} - Nom en snake_case
 */
function camelToSnake(camel) {
  return camel.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

/**
 * Fonction utilitaire pour convertir les noms de champs snake_case en camelCase
 * @param {string} snake - Nom en snake_case
 * @returns {string} - Nom en camelCase
 */
function snakeToCamel(snake) {
  return snake.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * Fonction utilitaire pour mapper les champs de l'API vers le format de la base de données
 * @param {Object} apiRecord - Enregistrement de l'API
 * @returns {Object} - Enregistrement formaté pour WatermelonDB
 */
function mapApiRecordToDb(apiRecord) {
  const dbRecord = {}

  // Traiter l'ID spécial - CRUCIAL pour éviter les doublons
  if (apiRecord.id !== undefined) {
    dbRecord.api_id = apiRecord.id
  }

  // Mapper tous les autres champs
  Object.entries(apiRecord).forEach(([key, value]) => {
    if (key !== "id") {
      // Ignorer l'ID car déjà traité
      const dbKey = camelToSnake(key)
      dbRecord[dbKey] = value
    }
  })

  return dbRecord
}

/**
 * Fonction utilitaire pour mapper les champs de la base de données vers le format de l'API
 * @param {Object} dbRecord - Enregistrement de la base de données
 * @returns {Object} - Enregistrement formaté pour l'API
 */
function mapDbRecordToApi(dbRecord) {
  const apiRecord = {}

  // Traiter l'ID spécial
  if (dbRecord.api_id !== undefined) {
    apiRecord.id = dbRecord.api_id
  }

  // Mapper tous les autres champs
  Object.entries(dbRecord).forEach(([key, value]) => {
    if (key !== "api_id" && !key.startsWith("_")) {
      // Ignorer api_id et champs internes
      const apiKey = snakeToCamel(key)
      apiRecord[apiKey] = value
    }
  })

  return apiRecord
}

/**
 * Démarre la synchronisation en arrière-plan
 * @param {Function} syncFunction - Fonction à exécuter pour la synchronisation
 * @returns {Promise<void>}
 */
export async function startBackgroundSync(syncFunction) {
  try {
    // Arrêter toute synchronisation en cours
    stopBackgroundSync()

    // Récupérer les paramètres de synchronisation
    const settings = await getSyncSettings()

    if (!settings || !settings.autoSync) {
      console.log("Synchronisation automatique désactivée")
      return
    }

    const intervalMinutes = settings.syncInterval || 30
    console.log(`Synchronisation en arrière-plan démarrée (intervalle: ${intervalMinutes} minutes)`)

    // Démarrer la synchronisation périodique
    syncIntervalId = setInterval(
      () => {
        if (typeof syncFunction === "function") {
          syncFunction(true) // true = synchronisation silencieuse
        } else {
          syncAll(true) // Utiliser syncAll par défaut avec mode silencieux
        }
      },
      intervalMinutes * 60 * 1000,
    )

    return syncIntervalId
  } catch (error) {
    console.error("Erreur lors du démarrage de la synchronisation en arrière-plan:", error)
  }
}

/**
 * Arrête la synchronisation en arrière-plan
 */
export function stopBackgroundSync() {
  if (syncIntervalId) {
    clearInterval(syncIntervalId)
    syncIntervalId = null
    console.log("Synchronisation en arrière-plan arrêtée")
  }
}

/**
 * Récupère les paramètres de synchronisation
 * @returns {Promise<Object>} - Paramètres de synchronisation
 */
export async function getSyncSettings() {
  try {
    const settings = await AsyncStorage.getItem(SYNC_SETTINGS_KEY)
    return settings
      ? JSON.parse(settings)
      : {
          autoSync: true,
          syncInterval: 30, // minutes
          syncOnStartup: true,
          syncOnlyOnWifi: false,
          lastFullSync: null,
          tables: TABLES.reduce((acc, table) => {
            acc[table] = { enabled: true, lastSync: 0 }
            return acc
          }, {}),
        }
  } catch (error) {
    console.error("Erreur lors de la récupération des paramètres de synchronisation:", error)
    return null
  }
}

/**
 * Enregistre les paramètres de synchronisation
 * @param {Object} settings - Paramètres de synchronisation
 * @returns {Promise<boolean>} - Succès de l'opération
 */
export async function saveSyncSettings(settings) {
  try {
    await AsyncStorage.setItem(SYNC_SETTINGS_KEY, JSON.stringify(settings))
    return true
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des paramètres de synchronisation:", error)
    return false
  }
}

/**
 * Vérifie la connectivité Internet
 * @returns {Promise<boolean>} - Connectivité Internet
 */
export async function checkConnectivity() {
  try {
    // Essayer d'abord avec l'endpoint principal de l'API
    const response = await fetch(`${API_BASE_URL}${API_PATH}/dossiers`, {
      method: "HEAD",
      timeout: 8000,
    })

    if (response.ok) {
      return true
    }

    // Si ça ne fonctionne pas, essayer avec l'URL de base
    const baseResponse = await fetch(`${API_BASE_URL}`, {
      method: "HEAD",
      timeout: 8000,
    })

    return baseResponse.ok
  } catch (error) {
    console.log("Erreur de connectivité:", error.message)

    // Essayer une dernière tentative avec une requête GET simple
    try {
      const lastAttempt = await fetch(`${API_BASE_URL}`, {
        method: "GET",
        timeout: 8000,
      })
      return lastAttempt.ok || lastAttempt.status < 500 // Accepter toute réponse non-serveur
    } catch (e) {
      console.log("Pas de connexion Internet confirmée:", e.message)
      return false
    }
  }
}

/**
 * Récupère les données d'une table depuis l'API
 * @param {string} tableName - Nom de la table
 * @param {number} lastSync - Timestamp de la dernière synchronisation
 * @param {boolean} silent - Mode silencieux (sans logs)
 * @returns {Promise<Array>} - Données récupérées
 */
export async function fetchTableData(tableName, lastSync = 0, silent = false) {
  try {
    // Construire l'URL avec le nouveau chemin API
    const url = `${API_BASE_URL}${API_PATH}/${tableName}`

    if (!silent) {
      console.log(`Récupération des données pour ${tableName} depuis ${url}`)
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Erreur serveur: ${response.status}`)
    }

    const data = await response.json()

    // Vérifier le format de la réponse
    if (Array.isArray(data)) {
      // Format tableau simple comme dans l'exemple fourni
      if (!silent) {
        console.log(`${data.length} enregistrements récupérés pour ${tableName}`)
      }
      return data
    } else if (data._embedded && data._embedded[tableName]) {
      // Format HATEOAS (ancien format)
      const records = data._embedded[tableName]
      if (!silent) {
        console.log(`${records.length} enregistrements récupérés pour ${tableName} (format HATEOAS)`)
      }
      return records
    } else {
      // Si les données sont un objet unique
      if (!silent) {
        console.log(`1 enregistrement récupéré pour ${tableName}`)
      }
      return [data]
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${tableName}:`, error)
    throw error
  }
}

/**
 * Synchronise une table spécifique
 * @param {string} tableName - Nom de la table
 * @param {boolean} silent - Mode silencieux (sans notifications)
 * @param {boolean} forceSync - Forcer la synchronisation même sans connectivité
 * @returns {Promise<Object>} - Résultat de la synchronisation
 */
export async function syncTable(tableName, silent = false, forceSync = false) {
  try {
    if (!silent) {
      console.log(`Synchronisation de la table ${tableName}...`)
    }

    // Récupérer les paramètres de synchronisation
    const settings = await getSyncSettings()
    if (!settings || !settings.tables[tableName]?.enabled) {
      return { success: false, message: `Synchronisation de ${tableName} désactivée` }
    }

    // Récupérer le timestamp de la dernière synchronisation
    const lastSync = settings.tables[tableName]?.lastSync || 0

    // 1. Envoyer les modifications locales au serveur
    const collection = database.collections.get(tableName)
    if (!collection) {
      return { success: false, error: `Collection ${tableName} non trouvée` }
    }

    const localRecords = await collection.query().fetch()

    // Filtrer les enregistrements modifiés depuis la dernière synchronisation
    const modifiedRecords = localRecords.filter((record) => {
      const updatedAt = record.updatedAt ? new Date(record.updatedAt).getTime() : 0
      return updatedAt > lastSync
    })

    if (modifiedRecords.length > 0) {
      if (!silent) {
        console.log(`Envoi de ${modifiedRecords.length} enregistrements pour ${tableName}`)
      }

      // Convertir les enregistrements en objets simples et mapper pour l'API
      const recordsToSync = modifiedRecords.map((record) => {
        const rawRecord = { ...record._raw }
        const apiRecord = mapDbRecordToApi(rawRecord)

        // Ajouter le statut
        apiRecord._status = record._hasPendingUpdate ? "updated" : "created"

        return apiRecord
      })

      try {
        // Envoyer les enregistrements au serveur avec le nouveau chemin API
        const pushResponse = await fetch(`${API_BASE_URL}${API_PATH}/${tableName}/batch`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recordsToSync),
        })

        if (!pushResponse.ok) {
          throw new Error(`Erreur serveur: ${pushResponse.status}`)
        }

        if (!silent) {
          console.log(`Enregistrements ${tableName} envoyés avec succès`)
        }
      } catch (error) {
        if (!silent) {
          console.error(`Erreur lors de l'envoi des données pour ${tableName}:`, error)
        }
        // Ne pas bloquer la synchronisation si l'envoi échoue
        console.warn(`Échec de l'envoi des données pour ${tableName}, mais la récupération va continuer`)
      }
    } else if (!silent) {
      console.log(`Aucun enregistrement modifié pour ${tableName}`)
    }

    // 2. Récupérer les nouvelles données du serveur
    try {
      // Utiliser la fonction fetchTableData mise à jour
      const serverRecords = await fetchTableData(tableName, lastSync, silent)

      if (serverRecords.length > 0) {
        // Créer une map pour les enregistrements locaux par API ID
        const localRecordsByApiId = new Map()

        // Créer une map secondaire pour les enregistrements par numeroDossier (comme fallback)
        const localRecordsByNumeroDossier = new Map()

        // Remplir les maps
        localRecords.forEach((record) => {
          // Map par API ID (prioritaire)
          if (record._raw.api_id !== undefined) {
            localRecordsByApiId.set(record._raw.api_id.toString(), record)
          }

          // Map par numeroDossier (secondaire)
          if (record._raw.numero_dossier) {
            localRecordsByNumeroDossier.set(record._raw.numero_dossier.toString(), record)
          }
        })

        if (!silent) {
          console.log(`Traitement de ${serverRecords.length} enregistrements pour ${tableName}`)
        }

        // Compteurs pour les statistiques
        let created = 0
        let updated = 0
        const skipped = 0

        // Traiter chaque enregistrement du serveur
        await database.write(async () => {
          for (const serverRecord of serverRecords) {
            // Mapper l'enregistrement de l'API au format de la base de données
            const dbRecord = mapApiRecordToDb(serverRecord)

            // Chercher l'enregistrement local par différentes clés
            let localRecord = null

            // 1. Chercher par API ID (prioritaire)
            if (serverRecord.id !== undefined) {
              localRecord = localRecordsByApiId.get(serverRecord.id.toString())

              if (!silent && localRecord) {
                console.log(`Trouvé un enregistrement existant par API ID: ${serverRecord.id}`)
              }
            }

            // 2. Si non trouvé, chercher par numeroDossier (secondaire)
            if (!localRecord && serverRecord.numeroDossier) {
              localRecord = localRecordsByNumeroDossier.get(serverRecord.numeroDossier.toString())

              if (!silent && localRecord) {
                console.log(`Trouvé un enregistrement existant par numeroDossier: ${serverRecord.numeroDossier}`)
              }
            }

            if (!localRecord) {
              // Nouvel enregistrement à créer localement
              if (!silent) {
                console.log(
                  `Création d'un nouvel enregistrement pour ${tableName} avec ID=${serverRecord.id}, numeroDossier=${serverRecord.numeroDossier}`,
                )
              }

              await collection.create((record) => {
                Object.entries(dbRecord).forEach(([key, value]) => {
                  if (value !== null && value !== undefined && !key.startsWith("_")) {
                    // Convertir les dates si nécessaire
                    if (key.toLowerCase().includes("date") && typeof value === "string") {
                      try {
                        record[key] = new Date(value)
                      } catch (e) {
                        record[key] = value
                      }
                    } else {
                      record[key] = value
                    }
                  }
                })
              })
              created++
            } else {
              // Mettre à jour l'enregistrement existant
              if (!silent) {
                console.log(
                  `Mise à jour d'un enregistrement existant pour ${tableName} avec ID=${serverRecord.id}, numeroDossier=${serverRecord.numeroDossier}`,
                )
              }

              await localRecord.update((record) => {
                // IMPORTANT: Toujours mettre à jour l'api_id si on a trouvé par numeroDossier
                if (serverRecord.id !== undefined && record.api_id === undefined) {
                  record.api_id = serverRecord.id
                }

                Object.entries(dbRecord).forEach(([key, value]) => {
                  if (value !== null && value !== undefined && !key.startsWith("_")) {
                    // Convertir les dates si nécessaire
                    if (key.toLowerCase().includes("date") && typeof value === "string") {
                      try {
                        record[key] = new Date(value)
                      } catch (e) {
                        record[key] = value
                      }
                    } else {
                      record[key] = value
                    }
                  }
                })
              })
              updated++
            }
          }
        })

        if (!silent) {
          console.log(
            `Synchronisation ${tableName} terminée: ${created} créés, ${updated} mis à jour, ${skipped} ignorés`,
          )
        }
      }

      // Mettre à jour le timestamp de la dernière synchronisation
      const newSettings = await getSyncSettings()
      newSettings.tables[tableName].lastSync = Date.now()
      await saveSyncSettings(newSettings)

      return {
        success: true,
        message: `Synchronisation de ${tableName} terminée avec succès`,
        stats: { created, updated, skipped },
      }
    } catch (error) {
      if (!silent) {
        console.error(`Erreur lors de la synchronisation de ${tableName} depuis le serveur:`, error)
      }
      throw new Error(`Erreur lors de la synchronisation de ${tableName} depuis le serveur: ${error.message}`)
    }
  } catch (error) {
    if (!silent) {
      console.error(`Erreur lors de la synchronisation de ${tableName}:`, error)
    }
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Synchronise toutes les tables activées
 * @param {boolean} silent - Mode silencieux (sans notifications)
 * @param {boolean} forceSync - Forcer la synchronisation même sans connectivité
 * @returns {Promise<Object>} - Résultat de la synchronisation
 */
export async function syncAll(silent = false, forceSync = false) {
  if (!silent) {
    console.log("Début de la synchronisation de toutes les tables...")
  }

  try {
    // Vérifier la connectivité sauf si forceSync est true
    if (!forceSync) {
      const isConnected = await checkConnectivity()
      if (!isConnected) {
        return { success: false, error: "Pas de connexion Internet" }
      }
    }

    // Récupérer les paramètres de synchronisation
    const settings = await getSyncSettings()
    if (!settings) {
      return { success: false, error: "Impossible de récupérer les paramètres de synchronisation" }
    }

    const results = {}
    let hasErrors = false

    // Synchroniser chaque table activée
    for (const tableName of TABLES) {
      if (settings.tables[tableName]?.enabled) {
        try {
          results[tableName] = await syncTable(tableName, silent, forceSync)
          if (!results[tableName].success) {
            hasErrors = true
          }
        } catch (error) {
          results[tableName] = { success: false, error: error.message }
          hasErrors = true
        }
      } else {
        results[tableName] = { success: true, message: "Synchronisation désactivée" }
      }
    }

    // Mettre à jour la date de dernière synchronisation complète
    settings.lastFullSync = Date.now()
    await saveSyncSettings(settings)

    if (!silent) {
      console.log("Synchronisation de toutes les tables terminée")
    }

    return {
      success: !hasErrors,
      results,
    }
  } catch (error) {
    if (!silent) {
      console.error("Erreur lors de la synchronisation:", error)
    }
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Formate une date pour l'affichage
 * @param {number|string|Date} timestamp - Timestamp ou date
 * @returns {string} - Date formatée
 */
export function formatSyncDate(timestamp) {
  if (!timestamp) return "Jamais"

  try {
    const date = new Date(timestamp)
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch (e) {
    return "Date invalide"
  }
}

/**
 * Récupère et stocke les données initiales pour toutes les tables
 * @param {boolean} silent - Mode silencieux (sans logs)
 * @returns {Promise<Object>} - Résultat de l'initialisation
 */
export async function initializeData(silent = false) {
  if (!silent) {
    console.log("Initialisation des données...")
  }

  try {
    const results = {}

    for (const tableName of TABLES) {
      try {
        if (!silent) {
          console.log(`Initialisation de la table ${tableName}...`)
        }

        const collection = database.collections.get(tableName)
        if (!collection) {
          results[tableName] = { success: false, error: `Collection ${tableName} non trouvée` }
          continue
        }

        // Récupérer les données depuis l'API
        const serverRecords = await fetchTableData(tableName, 0, silent)

        if (serverRecords.length > 0) {
          // Récupérer les enregistrements locaux existants
          const localRecords = await collection.query().fetch()

          // Créer une map pour les enregistrements locaux par API ID
          const localRecordsByApiId = new Map()

          // Créer une map secondaire pour les enregistrements par numeroDossier (comme fallback)
          const localRecordsByNumeroDossier = new Map()

          // Remplir les maps
          localRecords.forEach((record) => {
            // Map par API ID (prioritaire)
            if (record._raw.api_id !== undefined) {
              localRecordsByApiId.set(record._raw.api_id.toString(), record)
            }

            // Map par numeroDossier (secondaire)
            if (record._raw.numero_dossier) {
              localRecordsByNumeroDossier.set(record._raw.numero_dossier.toString(), record)
            }
          })

          // Compteurs pour les statistiques
          let created = 0
          let updated = 0
          const skipped = 0

          // Traiter chaque enregistrement du serveur
          await database.write(async () => {
            for (const serverRecord of serverRecords) {
              // Mapper l'enregistrement de l'API au format de la base de données
              const dbRecord = mapApiRecordToDb(serverRecord)

              // Chercher l'enregistrement local par différentes clés
              let localRecord = null

              // 1. Chercher par API ID (prioritaire)
              if (serverRecord.id !== undefined) {
                localRecord = localRecordsByApiId.get(serverRecord.id.toString())

                if (!silent && localRecord) {
                  console.log(`Trouvé un enregistrement existant par API ID: ${serverRecord.id}`)
                }
              }

              // 2. Si non trouvé, chercher par numeroDossier (secondaire)
              if (!localRecord && serverRecord.numeroDossier) {
                localRecord = localRecordsByNumeroDossier.get(serverRecord.numeroDossier.toString())

                if (!silent && localRecord) {
                  console.log(`Trouvé un enregistrement existant par numeroDossier: ${serverRecord.numeroDossier}`)
                }
              }

              if (!localRecord) {
                // Nouvel enregistrement à créer localement
                if (!silent) {
                  console.log(
                    `Création d'un nouvel enregistrement pour ${tableName} avec ID=${serverRecord.id}, numeroDossier=${serverRecord.numeroDossier}`,
                  )
                }

                await collection.create((record) => {
                  Object.entries(dbRecord).forEach(([key, value]) => {
                    if (value !== null && value !== undefined && !key.startsWith("_")) {
                      // Convertir les dates si nécessaire
                      if (key.toLowerCase().includes("date") && typeof value === "string") {
                        try {
                          record[key] = new Date(value)
                        } catch (e) {
                          record[key] = value
                        }
                      } else {
                        record[key] = value
                      }
                    }
                  })
                })
                created++
              } else {
                // Mettre à jour l'enregistrement existant
                if (!silent) {
                  console.log(
                    `Mise à jour d'un enregistrement existant pour ${tableName} avec ID=${serverRecord.id}, numeroDossier=${serverRecord.numeroDossier}`,
                  )
                }

                await localRecord.update((record) => {
                  // IMPORTANT: Toujours mettre à jour l'api_id si on a trouvé par numeroDossier
                  if (serverRecord.id !== undefined && record.api_id === undefined) {
                    record.api_id = serverRecord.id
                  }

                  Object.entries(dbRecord).forEach(([key, value]) => {
                    if (value !== null && value !== undefined && !key.startsWith("_")) {
                      // Convertir les dates si nécessaire
                      if (key.toLowerCase().includes("date") && typeof value === "string") {
                        try {
                          record[key] = new Date(value)
                        } catch (e) {
                          record[key] = value
                        }
                      } else {
                        record[key] = value
                      }
                    }
                  })
                })
                updated++
              }
            }
          })

          if (!silent) {
            console.log(
              `Initialisation de ${tableName} terminée: ${created} créés, ${updated} mis à jour, ${skipped} ignorés`,
            )
          }

          results[tableName] = {
            success: true,
            message: `Initialisation de ${tableName} terminée avec succès`,
            stats: { created, updated, skipped },
          }
        } else {
          results[tableName] = {
            success: true,
            message: `Aucune donnée à initialiser pour ${tableName}`,
          }
        }

        // Mettre à jour le timestamp de la dernière synchronisation
        const settings = await getSyncSettings()
        settings.tables[tableName].lastSync = Date.now()
        await saveSyncSettings(settings)
      } catch (error) {
        console.error(`Erreur lors de l'initialisation de ${tableName}:`, error)
        results[tableName] = { success: false, error: error.message }
      }
    }

    if (!silent) {
      console.log("Initialisation des données terminée")
    }

    return {
      success: true,
      results,
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation des données:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

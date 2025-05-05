import { useState, useEffect } from "react"
import { StyleSheet, View, Text, Switch, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

import Header from "../../components/header/Header"
import { useToast } from "../../components/toast/ToastProvider"
import {
  getSyncSettings,
  saveSyncSettings,
  syncAll,
  syncTable,
  formatSyncDate,
  checkConnectivity,
  initializeData,
} from "../../services/syncService"

export default function SyncScreen() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncingTable, setSyncingTable] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [initializing, setInitializing] = useState(false)
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    loadSettings()
    checkConnection()
  }, [])

  const checkConnection = async () => {
    const connected = await checkConnectivity()
    setIsConnected(connected)
  }

  const loadSettings = async () => {
    try {
      setLoading(true)
      const syncSettings = await getSyncSettings()
      setSettings(syncSettings)
    } catch (error) {
      toast.showError(`Erreur: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAutoSync = async (value) => {
    try {
      const newSettings = { ...settings, autoSync: value }
      await saveSyncSettings(newSettings)
      setSettings(newSettings)
      toast.showSuccess(value ? "Synchronisation automatique activée" : "Synchronisation automatique désactivée")
    } catch (error) {
      toast.showError(`Erreur: ${error.message}`)
    }
  }

  const handleToggleStartupSync = async (value) => {
    try {
      const newSettings = { ...settings, syncOnStartup: value }
      await saveSyncSettings(newSettings)
      setSettings(newSettings)
      toast.showSuccess(value ? "Synchronisation au démarrage activée" : "Synchronisation au démarrage désactivée")
    } catch (error) {
      toast.showError(`Erreur: ${error.message}`)
    }
  }

  const handleToggleWifiOnly = async (value) => {
    try {
      const newSettings = { ...settings, syncOnlyOnWifi: value }
      await saveSyncSettings(newSettings)
      setSettings(newSettings)
      toast.showSuccess(
        value ? "Synchronisation uniquement en WiFi activée" : "Synchronisation sur tous les réseaux activée",
      )
    } catch (error) {
      toast.showError(`Erreur: ${error.message}`)
    }
  }

  const handleToggleTable = async (tableName, value) => {
    try {
      const newSettings = {
        ...settings,
        tables: {
          ...settings.tables,
          [tableName]: {
            ...settings.tables[tableName],
            enabled: value,
          },
        },
      }
      await saveSyncSettings(newSettings)
      setSettings(newSettings)
      toast.showSuccess(value ? `Table ${tableName} activée` : `Table ${tableName} désactivée`)
    } catch (error) {
      toast.showError(`Erreur: ${error.message}`)
    }
  }

  const handleSyncIntervalChange = async (minutes) => {
    try {
      const newSettings = { ...settings, syncInterval: minutes }
      await saveSyncSettings(newSettings)
      setSettings(newSettings)
      toast.showSuccess(`Intervalle de synchronisation défini à ${minutes} minutes`)
    } catch (error) {
      toast.showError(`Erreur: ${error.message}`)
    }
  }

  const handleSyncAll = async () => {
    if (syncing) return

    try {
      // Vérifier la connexion mais ne pas bloquer la synchronisation
      const connected = await checkConnectivity()
      setIsConnected(connected)

      if (!connected) {
        toast.showInfo("Connexion au serveur incertaine, tentative de synchronisation quand même...")
      }

      setSyncing(true)
      toast.showInfo("Synchronisation en cours...")

      // Utiliser forceSync=true pour ignorer la vérification de connectivité
      const result = await syncAll(false, true)

      if (result.success) {
        toast.showSuccess("Synchronisation réussie!")
        loadSettings() // Recharger les paramètres pour mettre à jour les timestamps
      } else {
        toast.showError(`Échec de la synchronisation: ${result.error || "Erreur inconnue"}`)
      }
    } catch (error) {
      toast.showError(`Erreur: ${error.message}`)
    } finally {
      setSyncing(false)
    }
  }

  const handleSyncTable = async (tableName) => {
    if (syncingTable === tableName) return

    try {
      // Vérifier la connexion mais ne pas bloquer la synchronisation
      const connected = await checkConnectivity()
      setIsConnected(connected)

      if (!connected) {
        toast.showInfo("Connexion au serveur incertaine, tentative de synchronisation quand même...")
      }

      setSyncingTable(tableName)
      toast.showInfo(`Synchronisation de ${tableName} en cours...`)

      // Ajouter un paramètre forceSync=true à syncTable
      const result = await syncTable(tableName, false, true)

      if (result.success) {
        toast.showSuccess(`Synchronisation de ${tableName} réussie!`)
        loadSettings() // Recharger les paramètres pour mettre à jour les timestamps
      } else {
        toast.showError(`Échec de la synchronisation de ${tableName}: ${result.error || "Erreur inconnue"}`)
      }
    } catch (error) {
      toast.showError(`Erreur: ${error.message}`)
    } finally {
      setSyncingTable(null)
    }
  }

  // Nouvelle fonction pour initialiser les données
  const handleInitializeData = () => {
    Alert.alert(
      "Initialisation des données",
      "Cette opération va récupérer toutes les données du serveur et les stocker localement. Voulez-vous continuer?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Continuer",
          onPress: async () => {
            try {
              setInitializing(true)
              toast.showInfo("Initialisation des données en cours...")

              const result = await initializeData()

              if (result.success) {
                toast.showSuccess("Initialisation des données réussie!")
                loadSettings() // Recharger les paramètres pour mettre à jour les timestamps
              } else {
                toast.showError(`Échec de l'initialisation: ${result.error || "Erreur inconnue"}`)
              }
            } catch (error) {
              toast.showError(`Erreur: ${error.message}`)
            } finally {
              setInitializing(false)
            }
          },
        },
      ],
    )
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Synchronisation" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2b7a78" />
          <Text style={styles.loadingText}>Chargement des paramètres...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Synchronisation"
        leftComponent={
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>État de la connexion:</Text>
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, { backgroundColor: isConnected ? "#4CAF50" : "#F44336" }]} />
            <Text style={styles.statusText}>{isConnected ? "Connecté" : "Déconnecté"}</Text>
          </View>
          <TouchableOpacity style={styles.refreshButton} onPress={checkConnection}>
            <Ionicons name="refresh" size={20} color="#2b7a78" />
            <Text style={styles.refreshText}>Vérifier</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres généraux</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Synchronisation automatique</Text>
              <Text style={styles.settingDescription}>Synchroniser périodiquement les données</Text>
            </View>
            <Switch
              value={settings.autoSync}
              onValueChange={handleToggleAutoSync}
              trackColor={{ false: "#767577", true: "#a8e0de" }}
              thumbColor={settings.autoSync ? "#2b7a78" : "#f4f3f4"}
            />
          </View>

          {settings.autoSync && (
            <View style={styles.settingItem}>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>Intervalle de synchronisation</Text>
                <Text style={styles.settingDescription}>Fréquence de synchronisation automatique</Text>
              </View>
              <View style={styles.intervalContainer}>
                {[15, 30, 60].map((minutes) => (
                  <TouchableOpacity
                    key={minutes}
                    style={[styles.intervalButton, settings.syncInterval === minutes && styles.intervalButtonActive]}
                    onPress={() => handleSyncIntervalChange(minutes)}
                  >
                    <Text
                      style={[
                        styles.intervalButtonText,
                        settings.syncInterval === minutes && styles.intervalButtonTextActive,
                      ]}
                    >
                      {minutes} min
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Synchroniser au démarrage</Text>
              <Text style={styles.settingDescription}>Synchroniser à l'ouverture de l'application</Text>
            </View>
            <Switch
              value={settings.syncOnStartup}
              onValueChange={handleToggleStartupSync}
              trackColor={{ false: "#767577", true: "#a8e0de" }}
              thumbColor={settings.syncOnStartup ? "#2b7a78" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Uniquement en WiFi</Text>
              <Text style={styles.settingDescription}>Synchroniser uniquement en connexion WiFi</Text>
            </View>
            <Switch
              value={settings.syncOnlyOnWifi}
              onValueChange={handleToggleWifiOnly}
              trackColor={{ false: "#767577", true: "#a8e0de" }}
              thumbColor={settings.syncOnlyOnWifi ? "#2b7a78" : "#f4f3f4"}
            />
          </View>

          <View style={styles.syncInfoContainer}>
            <Text style={styles.syncInfoLabel}>Dernière synchronisation complète:</Text>
            <Text style={styles.syncInfoValue}>{formatSyncDate(settings.lastFullSync)}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.syncAllButton, syncing && styles.syncingButton]}
              onPress={handleSyncAll}
              disabled={syncing || initializing}
            >
              {syncing ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Ionicons name="sync" size={20} color="#fff" />
              )}
              <Text style={styles.syncAllButtonText}>
                {syncing ? "Synchronisation en cours..." : "Synchroniser toutes les tables"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.initButton, initializing && styles.syncingButton]}
              onPress={handleInitializeData}
              disabled={syncing || initializing}
            >
              {initializing ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Ionicons name="cloud-download" size={20} color="#fff" />
              )}
              <Text style={styles.syncAllButtonText}>
                {initializing ? "Initialisation en cours..." : "Initialiser les données"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tables à synchroniser</Text>

          {Object.entries(settings.tables).map(([tableName, tableSettings]) => (
            <View key={tableName} style={styles.tableItem}>
              <View style={styles.tableHeader}>
                <View style={styles.tableNameContainer}>
                  <Text style={styles.tableName}>{tableName}</Text>
                  <Text style={styles.tableLastSync}>Dernière sync: {formatSyncDate(tableSettings.lastSync)}</Text>
                </View>
                <Switch
                  value={tableSettings.enabled}
                  onValueChange={(value) => handleToggleTable(tableName, value)}
                  trackColor={{ false: "#767577", true: "#a8e0de" }}
                  thumbColor={tableSettings.enabled ? "#2b7a78" : "#f4f3f4"}
                />
              </View>

              {tableSettings.enabled && (
                <TouchableOpacity
                  style={[styles.syncTableButton, syncingTable === tableName && styles.syncingButton]}
                  onPress={() => handleSyncTable(tableName)}
                  disabled={syncingTable === tableName || syncing || initializing}
                >
                  {syncingTable === tableName ? (
                    <ActivityIndicator size="small" color="#2b7a78" />
                  ) : (
                    <Ionicons name="sync-outline" size={16} color="#2b7a78" />
                  )}
                  <Text style={styles.syncTableButtonText}>
                    {syncingTable === tableName ? "Synchronisation..." : "Synchroniser maintenant"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    padding: 6,
  },
  refreshText: {
    fontSize: 14,
    color: "#2b7a78",
    marginLeft: 4,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  settingDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  intervalContainer: {
    flexDirection: "row",
  },
  intervalButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    marginLeft: 8,
  },
  intervalButtonActive: {
    backgroundColor: "#2b7a78",
  },
  intervalButtonText: {
    fontSize: 14,
    color: "#555",
  },
  intervalButtonTextActive: {
    color: "#fff",
  },
  syncInfoContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
  },
  syncInfoLabel: {
    fontSize: 14,
    color: "#555",
  },
  syncInfoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 16,
    gap: 12,
  },
  syncAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2b7a78",
    padding: 12,
    borderRadius: 8,
  },
  initButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
  },
  syncingButton: {
    opacity: 0.7,
  },
  syncAllButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  tableItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingVertical: 12,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableNameContainer: {
    flex: 1,
  },
  tableName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  tableLastSync: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  syncTableButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  syncTableButtonText: {
    color: "#2b7a78",
    fontSize: 14,
    marginLeft: 6,
  },
})

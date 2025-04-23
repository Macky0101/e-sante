import { Alert } from "react-native"

// URL de base de l'API
const BASE_URL = "http://82.112.240.194:8585";


/**
 * Fonction pour gérer les erreurs de l'API
 * @param {Error} error - L'erreur à gérer
 * @returns {string} - Message d'erreur
 */
const handleError = (error) => {
  console.error("API Error:", error)

  if (error.response) {
    // La requête a été faite et le serveur a répondu avec un code d'état
    // qui n'est pas dans la plage 2xx
    console.error("Response data:", error.response.data)
    console.error("Response status:", error.response.status)

    if (error.response.data && error.response.data.message) {
      return error.response.data.message
    }

    return `Erreur ${error.response.status}: ${error.response.statusText}`
  } else if (error.request) {
    // La requête a été faite mais aucune réponse n'a été reçue
    return "Aucune réponse du serveur. Vérifiez votre connexion internet."
  } else {
    // Une erreur s'est produite lors de la configuration de la requête
    return error.message || "Une erreur inconnue s'est produite."
  }
}

/**
 * Fonction pour effectuer des requêtes API
 * @param {string} endpoint - Point de terminaison de l'APIn de l'API
 * @param {string} method - Méthode HTTP (GET, POST, PUT, DELETE)
 * @param {Object} data - Données à envoyer
 * @param {Object} options - Options supplémentaires
 * @returns {Promise} - Promesse avec les données de réponse
 */
const apiRequest = async (endpoint, method = "GET", data = null, options = {}) => {
  const url = `${BASE_URL}${endpoint}`

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  // Ajouter le token d'authentification s'il existe
  const token = await getAuthToken()
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const config = {
    method,
    headers,
    ...options,
  }

  if (data) {
    config.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url, config)

    // Vérifier si la réponse est OK (status 200-299)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw {
        response: {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        },
      }
    }

    // Vérifier si la réponse est vide
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return await response.json()
    }

    return await response.text()
  } catch (error) {
    const errorMessage = handleError(error)
    throw new Error(errorMessage)
  }
}

/**
 * Fonction pour récupérer le token d'authentification
 * @returns {Promise<string>} - Token d'authentification
 */
const getAuthToken = async () => {
  // Implémentez la logique pour récupérer le token d'authentification
  // Par exemple, depuis AsyncStorage
  // return await AsyncStorage.getItem('authToken');
  return null
}

/**
 * Fonctions CRUD
 */

/**
 * Récupérer une liste d'éléments
 * @param {string} endpoint - Point de terminaison de l'API
 * @param {Object} params - Paramètres de requête
 * @returns {Promise<Array>} - Liste d'éléments
 */
export const getList = async (endpoint, params = {}) => {
  // Construire la chaîne de requête à partir des paramètres
  const queryString = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&")

  const url = queryString ? `${endpoint}?${queryString}` : endpoint

  return apiRequest(url)
}

/**
 * Récupérer un élément par son ID
 * @param {string} endpoint - Point de terminaison de l'API
 * @param {string|number} id - ID de l'élément
 * @returns {Promise<Object>} - Élément
 */
export const getById = async (endpoint, id) => {
  return apiRequest(`${endpoint}/${id}`)
}

/**
 * Créer un nouvel élément
 * @param {string} endpoint - Point de terminaison de l'API
 * @param {Object} data - Données de l'élément
 * @returns {Promise<Object>} - Élément créé
 */
export const create = async (endpoint, data) => {
  return apiRequest(endpoint, "POST", data)
}

/**
 * Mettre à jour un élément existant
 * @param {string} endpoint - Point de terminaison de l'API
 * @param {string|number} id - ID de l'élément
 * @param {Object} data - Données mises à jour
 * @returns {Promise<Object>} - Élément mis à jour
 */
export const update = async (endpoint, id, data) => {
  return apiRequest(`${endpoint}/${id}`, "PUT", data)
}

/**
 * Supprimer un élément
 * @param {string} endpoint - Point de terminaison de l'API
 * @param {string|number} id - ID de l'élément
 * @returns {Promise<Object>} - Résultat de la suppression
 */
export const remove = async (endpoint, id) => {
  return apiRequest(`${endpoint}/${id}`, "DELETE")
}

/**
 * Supprimer un élément avec confirmation
 * @param {string} endpoint - Point de terminaison de l'API
 * @param {string|number} id - ID de l'élément
 * @param {string} message - Message de confirmation
 * @returns {Promise<Object>} - Résultat de la suppression
 */
export const removeWithConfirmation = (endpoint, id, message = "Êtes-vous sûr de vouloir supprimer cet élément ?") => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      "Confirmation",
      message,
      [
        {
          text: "Annuler",
          style: "cancel",
          onPress: () => reject(new Error("Suppression annulée")),
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await remove(endpoint, id)
              resolve(result)
            } catch (error) {
              reject(error)
            }
          },
        },
      ],
      { cancelable: true },
    )
  })
}

import { mockAccouchements, generateId } from "../data/mockAccouchements"

// Service pour gérer les accouchements avec des données mockées
const accouchementService = {
  /**
   * Récupérer la liste des accouchements
   * @param {Object} params - Paramètres de filtrage et pagination
   * @returns {Promise<Array>} - Liste des accouchements
   */
  getAccouchements: (params = {}) => {
    return new Promise((resolve) => {
      // Simuler un délai réseau
      setTimeout(() => {
        let filteredAccouchements = [...mockAccouchements]

        // Filtrage (exemple simple)
        if (params.search) {
          const searchLower = params.search.toLowerCase()
          filteredAccouchements = filteredAccouchements.filter(
            (accouchement) =>
              accouchement.patient.nom.toLowerCase().includes(searchLower) ||
              accouchement.patient.prenom.toLowerCase().includes(searchLower) ||
              accouchement.numero_dossier.toLowerCase().includes(searchLower),
          )
        }

        resolve(filteredAccouchements)
      }, 500) // Délai de 500ms pour simuler une requête réseau
    })
  },

  /**
   * Récupérer un accouchement par son ID
   * @param {string|number} id - ID de l'accouchement
   * @returns {Promise<Object>} - Accouchement
   */
  getAccouchementById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const accouchement = mockAccouchements.find((p) => p.id === Number.parseInt(id))
        if (accouchement) {
          resolve({ ...accouchement })
        } else {
          reject(new Error("Accouchement non trouvé"))
        }
      }, 300)
    })
  },

  /**
   * Créer un nouvel accouchement
   * @param {Object} data - Données de l'accouchement
   * @returns {Promise<Object>} - Accouchement créé
   */
  createAccouchement: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAccouchement = {
          ...data,
          id: generateId(),
        }
        mockAccouchements.push(newAccouchement)
        resolve(newAccouchement)
      }, 700)
    })
  },

  /**
   * Mettre à jour un accouchement existant
   * @param {string|number} id - ID de l'accouchement
   * @param {Object} data - Données mises à jour
   * @returns {Promise<Object>} - Accouchement mis à jour
   */
  updateAccouchement: (id, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockAccouchements.findIndex((p) => p.id === Number.parseInt(id))
        if (index !== -1) {
          const updatedAccouchement = { ...mockAccouchements[index], ...data }
          mockAccouchements[index] = updatedAccouchement
          resolve(updatedAccouchement)
        } else {
          reject(new Error("Accouchement non trouvé"))
        }
      }, 700)
    })
  },

  /**
   * Supprimer un accouchement
   * @param {string|number} id - ID de l'accouchement
   * @returns {Promise<Object>} - Résultat de la suppression
   */
  deleteAccouchement: (id) => {
    return new Promise((resolve, reject) => {
      // Cette fonction est appelée après confirmation
      setTimeout(() => {
        const index = mockAccouchements.findIndex((p) => p.id === Number.parseInt(id))
        if (index !== -1) {
          mockAccouchements.splice(index, 1)
          resolve({ success: true, message: "Accouchement supprimé avec succès" })
        } else {
          reject(new Error("Accouchement non trouvé"))
        }
      }, 500)
    })
  },
}

export default accouchementService

import { mockPlanning, generateId } from "../data/mockPlanning"

// Service pour gérer le planning familial avec des données mockées
const planningService = {
  /**
   * Récupérer la liste des consultations de planning familial
   * @param {Object} params - Paramètres de filtrage et pagination
   * @returns {Promise<Array>} - Liste des consultations
   */
  getPlannings: (params = {}) => {
    return new Promise((resolve) => {
      // Simuler un délai réseau
      setTimeout(() => {
        let filteredPlannings = [...mockPlanning]

        // Filtrage (exemple simple)
        if (params.search) {
          const searchLower = params.search.toLowerCase()
          filteredPlannings = filteredPlannings.filter(
            (planning) =>
              planning.patient.nom.toLowerCase().includes(searchLower) ||
              planning.patient.prenom.toLowerCase().includes(searchLower) ||
              planning.numero_dossier.toLowerCase().includes(searchLower),
          )
        }

        resolve(filteredPlannings)
      }, 500) // Délai de 500ms pour simuler une requête réseau
    })
  },

  /**
   * Récupérer une consultation de planning par son ID
   * @param {string|number} id - ID de la consultation
   * @returns {Promise<Object>} - Consultation de planning
   */
  getPlanningById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const planning = mockPlanning.find((p) => p.id === Number.parseInt(id))
        if (planning) {
          resolve({ ...planning })
        } else {
          reject(new Error("Consultation de planning non trouvée"))
        }
      }, 300)
    })
  },

  /**
   * Créer une nouvelle consultation de planning
   * @param {Object} data - Données de la consultation
   * @returns {Promise<Object>} - Consultation créée
   */
  createPlanning: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPlanning = {
          ...data,
          id: generateId(),
        }
        mockPlanning.push(newPlanning)
        resolve(newPlanning)
      }, 700)
    })
  },

  /**
   * Mettre à jour une consultation de planning existante
   * @param {string|number} id - ID de la consultation
   * @param {Object} data - Données mises à jour
   * @returns {Promise<Object>} - Consultation mise à jour
   */
  updatePlanning: (id, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockPlanning.findIndex((p) => p.id === Number.parseInt(id))
        if (index !== -1) {
          const updatedPlanning = { ...mockPlanning[index], ...data }
          mockPlanning[index] = updatedPlanning
          resolve(updatedPlanning)
        } else {
          reject(new Error("Consultation de planning non trouvée"))
        }
      }, 700)
    })
  },

  /**
   * Supprimer une consultation de planning
   * @param {string|number} id - ID de la consultation
   * @returns {Promise<Object>} - Résultat de la suppression
   */
  deletePlanning: (id) => {
    return new Promise((resolve, reject) => {
      // Cette fonction est appelée après confirmation
      setTimeout(() => {
        const index = mockPlanning.findIndex((p) => p.id === Number.parseInt(id))
        if (index !== -1) {
          mockPlanning.splice(index, 1)
          resolve({ success: true, message: "Consultation de planning supprimée avec succès" })
        } else {
          reject(new Error("Consultation de planning non trouvée"))
        }
      }, 500)
    })
  },
}

export default planningService

import { mockSuivi, generateId } from "../data/mockSuivi"

const suiviService = {
  /**
   * Récupérer la liste des suivis médicaux
   * @param {Object} params - Paramètres de filtrage et pagination
   * @returns {Promise<Array>} - Liste des suivis médicaux
   */
  getSuivis: (params = {}) => {
    return new Promise((resolve) => {
      // Simuler un délai réseau
      setTimeout(() => {
        let filteredSuivis = [...mockSuivi]

        // Filtrage (exemple simple)
        if (params.search) {
          const searchLower = params.search.toLowerCase()
          filteredSuivis = filteredSuivis.filter(
            (suivi) =>
              suivi.patient.nom.toLowerCase().includes(searchLower) ||
              suivi.patient.prenom.toLowerCase().includes(searchLower) ||
              suivi.numero_dossier.toLowerCase().includes(searchLower),
          )
        }

        resolve(filteredSuivis)
      }, 500) // Délai de 500ms pour simuler une requête réseau
    })
  },

  /**
   * Récupérer un suivi médical par son ID
   * @param {string|number} id - ID du suivi médical
   * @returns {Promise<Object>} - Suivi médical
   */
  getSuiviById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const suivi = mockSuivi.find((p) => p.id === Number.parseInt(id))
        if (suivi) {
          resolve({ ...suivi })
        } else {
          reject(new Error("Suivi médical non trouvé"))
        }
      }, 300)
    })
  },

  /**
   * Créer un nouveau suivi médical
   * @param {Object} data - Données du suivi médical
   * @returns {Promise<Object>} - Suivi médical créé
   */
  createSuivi: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSuivi = {
          ...data,
          id: generateId(),
        }
        mockSuivi.push(newSuivi)
        resolve(newSuivi)
      }, 700)
    })
  },

  /**
   * Mettre à jour un suivi médical existant
   * @param {string|number} id - ID du suivi médical
   * @param {Object} data - Données mises à jour
   * @returns {Promise<Object>} - Suivi médical mis à jour
   */
  updateSuivi: (id, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockSuivi.findIndex((p) => p.id === Number.parseInt(id))
        if (index !== -1) {
          const updatedSuivi = { ...mockSuivi[index], ...data }
          mockSuivi[index] = updatedSuivi
          resolve(updatedSuivi)
        } else {
          reject(new Error("Suivi médical non trouvé"))
        }
      }, 700)
    })
  },

  /**
   * Supprimer un suivi médical
   * @param {string|number} id - ID du suivi médical
   * @returns {Promise<Object>} - Résultat de la suppression
   */
  deleteSuivi: (id) => {
    return new Promise((resolve, reject) => {
      // Cette fonction est appelée après confirmation
      setTimeout(() => {
        const index = mockSuivi.findIndex((p) => p.id === Number.parseInt(id))
        if (index !== -1) {
          mockSuivi.splice(index, 1)
          resolve({ success: true, message: "Suivi médical supprimé avec succès" })
        } else {
          reject(new Error("Suivi médical non trouvé"))
        }
      }, 500)
    })
  },
}

export default suiviService

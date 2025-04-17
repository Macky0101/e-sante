import { mockDentaire, generateId } from "../data/mockDentaire"

// Service pour gérer les soins dentaires avec des données mockées
const dentaireService = {
  /**
   * Récupérer la liste des soins dentaires
   * @param {Object} params - Paramètres de filtrage et pagination
   * @returns {Promise<Array>} - Liste des soins dentaires
   */
  getDentaires: (params = {}) => {
    return new Promise((resolve) => {
      // Simuler un délai réseau
      setTimeout(() => {
        let filteredDentaires = [...mockDentaire]

        // Filtrage (exemple simple)
        if (params.search) {
          const searchLower = params.search.toLowerCase()
          filteredDentaires = filteredDentaires.filter(
            (dentaire) =>
              dentaire.patient.nom.toLowerCase().includes(searchLower) ||
              dentaire.patient.prenom.toLowerCase().includes(searchLower) ||
              dentaire.numero_dossier.toLowerCase().includes(searchLower),
          )
        }

        resolve(filteredDentaires)
      }, 500) // Délai de 500ms pour simuler une requête réseau
    })
  },

  /**
   * Récupérer un soin dentaire par son ID
   * @param {string|number} id - ID du soin dentaire
   * @returns {Promise<Object>} - Soin dentaire
   */
  getDentaireById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const dentaire = mockDentaire.find((p) => p.id === Number.parseInt(id))
        if (dentaire) {
          resolve({ ...dentaire })
        } else {
          reject(new Error("Soin dentaire non trouvé"))
        }
      }, 300)
    })
  },

  /**
   * Créer un nouveau soin dentaire
   * @param {Object} data - Données du soin dentaire
   * @returns {Promise<Object>} - Soin dentaire créé
   */
  createDentaire: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDentaire = {
          ...data,
          id: generateId(),
        }
        mockDentaire.push(newDentaire)
        resolve(newDentaire)
      }, 700)
    })
  },

  /**
   * Mettre à jour un soin dentaire existant
   * @param {string|number} id - ID du soin dentaire
   * @param {Object} data - Données mises à jour
   * @returns {Promise<Object>} - Soin dentaire mis à jour
   */
  updateDentaire: (id, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockDentaire.findIndex((p) => p.id === Number.parseInt(id))
        if (index !== -1) {
          const updatedDentaire = { ...mockDentaire[index], ...data }
          mockDentaire[index] = updatedDentaire
          resolve(updatedDentaire)
        } else {
          reject(new Error("Soin dentaire non trouvé"))
        }
      }, 700)
    })
  },

  /**
   * Supprimer un soin dentaire
   * @param {string|number} id - ID du soin dentaire
   * @returns {Promise<Object>} - Résultat de la suppression
   */
  deleteDentaire: (id) => {
    return new Promise((resolve, reject) => {
      // Cette fonction est appelée après confirmation
      setTimeout(() => {
        const index = mockDentaire.findIndex((p) => p.id === Number.parseInt(id))
        if (index !== -1) {
          mockDentaire.splice(index, 1)
          resolve({ success: true, message: "Soin dentaire supprimé avec succès" })
        } else {
          reject(new Error("Soin dentaire non trouvé"))
        }
      }, 500)
    })
  },
}

export default dentaireService

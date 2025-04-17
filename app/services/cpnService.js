import { mockCpn, generateId } from "../data/mockCpn"

const cpnService = {
  /**
   * Récupérer la liste des consultations prénatales
   * @param {Object} params - Paramètres de filtrage et pagination
   * @returns {Promise<Array>} - Liste des consultations prénatales
   */
  getCpns: (params = {}) => {
    return new Promise((resolve) => {
      // Simuler un délai réseau
      setTimeout(() => {
        let filteredCpns = [...mockCpn]

        // Filtrage (exemple simple)
        if (params.search) {
          const searchLower = params.search.toLowerCase()
          filteredCpns = filteredCpns.filter(
            (cpn) =>
              cpn.patient.nom.toLowerCase().includes(searchLower) ||
              cpn.patient.prenom.toLowerCase().includes(searchLower) ||
              cpn.numero_dossier.toLowerCase().includes(searchLower),
          )
        }

        resolve(filteredCpns)
      }, 500) // Délai de 500ms pour simuler une requête réseau
    })
  },

  /**
   * Récupérer une consultation prénatale par son ID
   * @param {string|number} id - ID de la consultation prénatale
   * @returns {Promise<Object>} - Consultation prénatale
   */
  getCpnById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cpn = mockCpn.find((p) => p.id === Number.parseInt(id))
        if (cpn) {
          resolve({ ...cpn })
        } else {
          reject(new Error("Consultation prénatale non trouvée"))
        }
      }, 300)
    })
  },

  /**
   * Créer une nouvelle consultation prénatale
   * @param {Object} data - Données de la consultation prénatale
   * @returns {Promise<Object>} - Consultation prénatale créée
   */
  createCpn: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCpn = {
          ...data,
          id: generateId(),
        }
        mockCpn.push(newCpn)
        resolve(newCpn)
      }, 700)
    })
  },

  /**
   * Mettre à jour une consultation prénatale existante
   * @param {string|number} id - ID de la consultation prénatale
   * @param {Object} data - Données mises à jour
   * @returns {Promise<Object>} - Consultation prénatale mise à jour
   */
  updateCpn: (id, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockCpn.findIndex((p) => p.id === Number.parseInt(id))
        if (index !== -1) {
          const updatedCpn = { ...mockCpn[index], ...data }
          mockCpn[index] = updatedCpn
          resolve(updatedCpn)
        } else {
          reject(new Error("Consultation prénatale non trouvée"))
        }
      }, 700)
    })
  },

  /**
   * Supprimer une consultation prénatale
   * @param {string|number} id - ID de la consultation prénatale
   * @returns {Promise<Object>} - Résultat de la suppression
   */
  deleteCpn: (id) => {
    return new Promise((resolve, reject) => {
      // Cette fonction est appelée après confirmation
      setTimeout(() => {
        const index = mockCpn.findIndex((p) => p.id === Number.parseInt(id))
        if (index !== -1) {
          mockCpn.splice(index, 1)
          resolve({ success: true, message: "Consultation prénatale supprimée avec succès" })
        } else {
          reject(new Error("Consultation prénatale non trouvée"))
        }
      }, 500)
    })
  },
}

export default cpnService

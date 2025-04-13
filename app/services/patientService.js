import { mockPatients, generateId, generateDossierNumber } from "../data/mockPatients"

// Service pour gérer les patients avec des données mockées
const patientService = {
  /**
   * Récupérer la liste des patients
   * @param {Object} params - Paramètres de filtrage et pagination
   * @returns {Promise<Array>} - Liste des patients
   */
  getPatients: (params = {}) => {
    return new Promise((resolve) => {
      // Simuler un délai réseau
      setTimeout(() => {
        let filteredPatients = [...mockPatients]

        // Filtrage (exemple simple)
        if (params.search) {
          const searchLower = params.search.toLowerCase()
          filteredPatients = filteredPatients.filter(
            (patient) =>
              patient.nom.toLowerCase().includes(searchLower) ||
              patient.prenom.toLowerCase().includes(searchLower) ||
              patient.numero_dossier.toLowerCase().includes(searchLower),
          )
        }

        resolve(filteredPatients)
      }, 500) // Délai de 500ms pour simuler une requête réseau
    })
  },

  /**
   * Récupérer un patient par son ID
   * @param {string|number} id - ID du patient
   * @returns {Promise<Object>} - Patient
   */
  getPatientById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const patient = mockPatients.find((p) => p.id === Number.parseInt(id))
        if (patient) {
          resolve({ ...patient })
        } else {
          reject(new Error("Patient non trouvé"))
        }
      }, 300)
    })
  },

  /**
   * Créer un nouveau patient
   * @param {Object} data - Données du patient
   * @returns {Promise<Object>} - Patient créé
   */
  createPatient: (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPatient = {
          ...data,
          id: generateId(),
          numero_dossier: generateDossierNumber(),
        }
        mockPatients.push(newPatient)
        resolve(newPatient)
      }, 700)
    })
  },

  /**
   * Mettre à jour un patient existant
   * @param {string|number} id - ID du patient
   * @param {Object} data - Données mises à jour
   * @returns {Promise<Object>} - Patient mis à jour
   */
  updatePatient: (id, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockPatients.findIndex((p) => p.id === Number.parseInt(id))
        if (index !== -1) {
          const updatedPatient = { ...mockPatients[index], ...data }
          mockPatients[index] = updatedPatient
          resolve(updatedPatient)
        } else {
          reject(new Error("Patient non trouvé"))
        }
      }, 700)
    })
  },

  /**
   * Supprimer un patient
   * @param {string|number} id - ID du patient
   * @returns {Promise<Object>} - Résultat de la suppression
   */
  deletePatient: (id) => {
    return new Promise((resolve, reject) => {
      // Cette fonction est appelée après confirmation
      setTimeout(() => {
        const index = mockPatients.findIndex((p) => p.id === Number.parseInt(id))
        if (index !== -1) {
          mockPatients.splice(index, 1)
          resolve({ success: true, message: "Patient supprimé avec succès" })
        } else {
          reject(new Error("Patient non trouvé"))
        }
      }, 500)
    })
  },
}

export default patientService

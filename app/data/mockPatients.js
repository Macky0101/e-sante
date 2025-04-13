// Données mockées pour les patients
export const mockPatients = [
    {
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      date_naissance: "15/05/1975",
      genre: 1, // 1 = Homme
      profession: "Ingénieur",
      telephone1: "06 12 34 56 78",
      telephone_2: "01 23 45 67 89",
      statut_matrimonial: "marie",
      numero_dossier: "PAT-001",
      hors_haire: false,
      alerte: false,
      adresse: "123 Rue de Paris, 75001 Paris",
      email: "jean.dupont@email.com",
      groupe_sanguin: "A+",
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Sophie",
      date_naissance: "22/11/1982",
      genre: 2, // 2 = Femme
      profession: "Médecin",
      telephone1: "06 98 76 54 32",
      telephone_2: "",
      statut_matrimonial: "celibataire",
      numero_dossier: "PAT-002",
      hors_haire: true,
      alerte: false,
      adresse: "45 Avenue Victor Hugo, 69003 Lyon",
      email: "sophie.martin@email.com",
      groupe_sanguin: "O-",
    },
    {
      id: 3,
      nom: "Petit",
      prenom: "Robert",
      date_naissance: "03/07/1965",
      genre: 1,
      profession: "Avocat",
      telephone1: "07 11 22 33 44",
      telephone_2: "",
      statut_matrimonial: "divorce",
      numero_dossier: "PAT-003",
      hors_haire: false,
      alerte: true,
      adresse: "8 Boulevard Gambetta, 33000 Bordeaux",
      email: "robert.petit@email.com",
      groupe_sanguin: "B+",
    },
    {
      id: 4,
      nom: "Dubois",
      prenom: "Marie",
      date_naissance: "17/09/1990",
      genre: 2,
      profession: "Enseignante",
      telephone1: "06 55 44 33 22",
      telephone_2: "04 33 22 11 00",
      statut_matrimonial: "marie",
      numero_dossier: "PAT-004",
      hors_haire: false,
      alerte: false,
      adresse: "27 Rue des Fleurs, 44000 Nantes",
      email: "marie.dubois@email.com",
      groupe_sanguin: "AB+",
    },
    {
      id: 5,
      nom: "Leroy",
      prenom: "Thomas",
      date_naissance: "30/12/1978",
      genre: 1,
      profession: "Architecte",
      telephone1: "06 87 65 43 21",
      telephone_2: "",
      statut_matrimonial: "marie",
      numero_dossier: "PAT-005",
      hors_haire: false,
      alerte: false,
      adresse: "56 Avenue de la République, 13001 Marseille",
      email: "thomas.leroy@email.com",
      groupe_sanguin: "A-",
    },
  ]
  
  // Fonction pour générer un ID unique
  export const generateId = () => {
    return Date.now() + Math.floor(Math.random() * 1000)
  }
  
  // Fonction pour générer un numéro de dossier unique
  export const generateDossierNumber = () => {
    return `PAT-${String(Math.floor(Math.random() * 10000)).padStart(3, "0")}`
  }
  
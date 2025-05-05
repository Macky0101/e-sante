// import { useState, useEffect } from "react"
// import { View, StyleSheet } from "react-native"
// import { useRouter, useLocalSearchParams } from "expo-router"
// import { SafeAreaView } from "react-native-safe-area-context"

// import Header from "../../components/header/Header"
// import TextField from "../../components/form/TextField"
// import SelectField from "../../components/form/SelectField"
// import RadioField from "../../components/form/RadioField"
// import CheckboxField from "../../components/form/CheckboxField"
// import FormStepper from "../../components/stepper/FormStepper"
// import { useToast } from "../../components/toast/ToastProvider"
// import { useLoading } from "../../components/loading/LoadingProvider"
// // import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import {
//   createDossier,
//   getAllDossiers,
//   getDossierById,
//   updateDossier,
//   deleteDossier,
//   deleteAllDossiers,
//   findDossiersByField
// } from '../../database/helpers/helperDossier';
// // Options pour le genre
// const genreOptions = [
//   { value: 1, label: "Homme" },
//   { value: 2, label: "Femme" },
// ]

// // Options pour le statut matrimonial
// const statutMatrimonialOptions = [
//   { value: "celibataire", label: "Célibataire" },
//   { value: "marie", label: "Marié(e)" },
//   { value: "divorce", label: "Divorcé(e)" },
//   { value: "veuf", label: "Veuf/Veuve" },
// ]
// const EthnieOption = [
//   {value: "bamara", label: "Bambara"},
//   {value: "malinke", label: "Malinké"},
//   {value: "soninké", label: "Soninké"},
//   {value: "peul", label: "Peul"},
//   {value: "arabe", label: "Arabe"},
//   {value: "tamasheq", label: "Tamasheq"},
//   {value: "bobo", label: "Bobo"},
//   {value: "dogon", label: "Dogon"},
//   {value: "minianka", label: "Minianka"},
//   {value: "senufo", label: "Sénoufo"},
// ]

// export default function PatientFormScreen() {
//   const router = useRouter()
//   const params = useLocalSearchParams()
//   const patientId = params.id
//   const isEditing = !!patientId

//   const toast = useToast()
//   const { showLoading, hideLoading } = useLoading()
//   const [loading, setLoading] = useState(false)

//   // État du formulaire
//   const [form, setForm] = useState({
//    numero_dossier: "",
//    hors_haire: false,
//    alerte: false,
//    nom: "",
//    prenom: "",
//    ethnie: "",
//    profession: "",
//    date_naissance: "",
//    genre: "",
//    prenom_pere: "",
//    nom_mere: "",
//    prenom_mere: "",
//    nom_conjoint: "",
//    prenom_conjoint: "",
//    credit: "",
//    nina: "",
//    amo: "",
//    mutuelle: "",
//    autre_pieces: "",
//    statut_matrimonial: "",
//    date_creation: "",
//    quartier: "",
//    telephone1: "",
//    telephone_2: "",
//    etat: "",

//   })
//  const listeDossiers = async () => {
//   try {
//     const dossiers = await getAllDossiers()
//     // console.log("Liste des dossiers:", dossiers)
//     // console.log("liste des dossier", JSON.stringify(dossiers), null, 2)
//     const rawDossiers = dossiers.map(dossier => dossier._raw);
//     console.log("Liste des dossiers:", JSON.stringify(rawDossiers, null, 2));


//   } catch (error) {
//     console.error("Erreur lors de la récupération des dossiers:", error)
    
//   }
//  }
//   // Charger les données du patient si en mode édition
//   useEffect(() => {
//     listeDossiers();
//     if (isEditing) {
//       loadPatient()
//     }
//   }, [isEditing])

//   const loadPatient = async () => {
//     try {
//       showLoading("Chargement des données du patient...")
//       const patient = await getDossierById(patientId)
//       setForm({
//         nom: patient.nom || "",
//         prenom: patient.prenom || "",
//         date_naissance: patient.date_naissance || "",
//         genre: patient.genre || "",
//         profession: patient.profession || "",
//         telephone1: patient.telephone1 || "",
//         telephone_2: patient.telephone_2 || "",
//         email: patient.email || "",
//         adresse: patient.adresse || "",
//         ville: patient.ville || "",
//         code_postal: patient.code_postal || "",
//         statut_matrimonial: patient.statut_matrimonial || "",
//         hors_haire: patient.hors_haire || false,
//         alerte: patient.alerte || false,
//         ethnie: patient.ethnie || "",
//         region: patient.region || "",
//         district: patient.district || "",
//         village: patient.village || "",
//       })
//     } catch (error) {
//       toast.showError(`Erreur lors du chargement du patient: ${error.message}`)
//     } finally {
//       hideLoading()
//     }
//   }

//   // Mettre à jour les champs du formulaire
//   const handleChange = (field, value) => {
//     setForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const validateForm = () => {
//     const newErrors = {};

//     if (!nom.trim()) {
//       newErrors.nom = "Le nom est requis";
//     }
//     if (!prenom.trim()) {
//       newErrors.prenom = "Le prénom est requis";
//     }
//     if (!date_naissance.trim()) {
//       newErrors.date_naissance = "La date de naissance est requise";
//     } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date_naissance)) {
//       newErrors.date_naissance = "Le format de la date de naissance est invalide (JJ/MM/AAAA)";
//     }
//     if (!genre) {
//       newErrors.genre = "Le genre est requis";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }};

//   // Soumettre le formulaire
//   const handleSubmit = async () => {

//     // if (!validateForm()) {
//     //   return;
//     // }
//     try {
//       const loadingMessage = isEditing ? "Mise à jour du patient..." : "Création du patient..."
//       showLoading(loadingMessage)
//       if (isEditing) {
//         await updateDossier(patientId, form)
//         toast.showSuccess("Patient mis à jour avec succès")
//       }
//       else {
//         await createDossier(form)
//         toast.showSuccess("Patient créé avec succès")
//       } 
//       setLoading(false)
//       router.back()
//     } catch (error) {
//       toast.showError(`Erreur: ${error.message}`)
//     }finally {
//       hideLoading();
//     }
//   }

//   // Annuler et revenir en arrière
//   const handleCancel = () => {
//     router.back()
//   }

//   // Définir les étapes du formulaire
//   const steps = [
//     {
//       title: "Références dossier",
//       component: (
//         <View>
//            <CheckboxField
//             label="Hors haire"
//             checked={form.hors_haire}
//             onValueChange={(value) => handleChange("hors_haire", value)}
//           />
//           <CheckboxField
//             label="Alerte"
//             checked={form.alerte}
//             onValueChange={(value) => handleChange("alerte", value)}
//           />
//           <TextField
//             label="Nom"
//             value={form.nom}
//             onChangeText={(value) => handleChange("nom", value)}
//             placeholder="Entrez le nom"
//             required
//           />
//           <TextField
//             label="Prénom"
//             value={form.prenom}
//             onChangeText={(value) => handleChange("prenom", value)}
//             placeholder="Entrez le prénom"
//             required
//           />
//            <SelectField
//             label="Ethnie"
//             value={form.ethnie}
//             onValueChange={(value) => handleChange("ethnie", value)}
//             options={EthnieOption}
//             placeholder="Sélectionnez l'ethnie"
           
//           />
//            <TextField
//             label="Profession"
//             value={form.profession}
//             onChangeText={(value) => handleChange("profession", value)}
//             placeholder="Entrez la profession"
//           />
//           <TextField
//             label="Date de naissance"
//             value={form.date_naissance}
//             onChangeText={(value) => handleChange("date_naissance", value)}
//             placeholder="JJ/MM/AAAA"
//             required
//             inputProps={{
//               keyboardType: "numeric",
//             }}
//           />
//           <RadioField
//             label="Genre"
//             value={form.genre}
//             onValueChange={(value) => handleChange("genre", value)}
//             options={genreOptions}
//             required
//           />
//         </View>
//       ),
//     },
//     {
//       title: "Famille",
//       component: (
//         <View>
          
//           <TextField
//             label="Email"
//             value={form.email}
//             onChangeText={(value) => handleChange("email", value)}
//             placeholder="Entrez l'adresse email"
//             inputProps={{
//               keyboardType: "email-address",
//             }}
//           />
//           <TextField
//             label="Adresse"
//             value={form.adresse}
//             onChangeText={(value) => handleChange("adresse", value)}
//             placeholder="Entrez l'adresse"
//           />
//           <TextField
//             label="Ville"
//             value={form.ville}
//             onChangeText={(value) => handleChange("ville", value)}
//             placeholder="Entrez la ville"
//           />
//           <TextField
//             label="Code postal"
//             value={form.code_postal}
//             onChangeText={(value) => handleChange("code_postal", value)}
//             placeholder="Entrez le code postal"
//             inputProps={{
//               keyboardType: "numeric",
//             }}
//           />
//         </View>
//       ),
//     },
//     {
//       title: "Domiciliation",
//       component: (
//         <View>
//         <TextField
//         label="Région"
//         value={form.region}
//         onChangeText={(value) => handleChange("region", value)}
//         placeholder="Entrez la région"
//         />
//         <TextField
//         label="District"
//         value={form.District}
//         onChangeText={(value) => handleChange("District", value)}
//         placeholder="Entrez le district"
//         />
//         <TextField
//         label="Village"
//         value={form.Village}
//         onChangeText={(value) => handleChange("Village", value)}
//         placeholder="Entrez le village"
//         />
//         <TextField
//             label="Tel Perso"
//             value={form.telephone1}
//             onChangeText={(value) => handleChange("telephone1", value)}
//             placeholder="Entrez le numéro de téléphone"
//             inputProps={{
//               keyboardType: "phone-pad",
//             }}
//           />
//           <TextField
//             label="Tel contact"
//             value={form.telephone_2}
//             onChangeText={(value) => handleChange("telephone_2", value)}
//             placeholder="Entrez le numéro de téléphone secondaire"
//             inputProps={{
//               keyboardType: "phone-pad",
//             }}
//           />
//         </View>
//       ),
//     },
//   ]

//   return (
   
//     <SafeAreaView style={styles.container}>
//       <Header title={isEditing ? "Modifier un patient" : "Ajouter un patient"} />
//       {/* <KeyboardAwareScrollView
//       enableOnAndroid={true}
//       enableAutomaticScroll={true}
//       keyboardShouldPersistTaps="handled"
//       contentContainerStyle={{ flexGrow: 1 }}
//     > */}
//       <FormStepper steps={steps} onComplete={handleSubmit} onCancel={handleCancel} loading={loading} />
//       {/* </KeyboardAwareScrollView> */}
   
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//   },
// })


































"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import Header from "../../components/header/Header"
import TextField from "../../components/form/TextField"
import SelectField from "../../components/form/SelectField"
import RadioField from "../../components/form/RadioField"
import CheckboxField from "../../components/form/CheckboxField"
import FormStepper from "../../components/stepper/FormStepper"
import { useToast } from "../../components/toast/ToastProvider"
import { useLoading } from "../../components/loading/LoadingProvider"
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  createDossier,
  getAllDossiers,
  getDossierById,
  updateDossier,
  findDossiersByField,
} from "../../database/helpers/helperDossier"
// Options pour le genre
const genreOptions = [
  { value: 1, label: "Homme" },
  { value: 2, label: "Femme" },
]

// Options pour le statut matrimonial
const statutMatrimonialOptions = [
  { value: "celibataire", label: "Célibataire" },
  { value: "marie", label: "Marié(e)" },
  { value: "divorce", label: "Divorcé(e)" },
  { value: "veuf", label: "Veuf/Veuve" },
]
const EthnieOption = [
  { value: "bamara", label: "Bambara" },
  { value: "malinke", label: "Malinké" },
  { value: "soninké", label: "Soninké" },
  { value: "peul", label: "Peul" },
  { value: "arabe", label: "Arabe" },
  { value: "tamasheq", label: "Tamasheq" },
  { value: "bobo", label: "Bobo" },
  { value: "dogon", label: "Dogon" },
  { value: "minianka", label: "Minianka" },
  { value: "senufo", label: "Sénoufo" },
]

export default function PatientFormScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const patientId = params.id
  const isEditing = !!patientId

  const toast = useToast()
  const { showLoading, hideLoading } = useLoading()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // État du formulaire
  const [form, setForm] = useState({
    numero_dossier: "",
    hors_haire: false,
    alerte: false,
    nom: "",
    prenom: "",
    ethnie: "",
    profession: "",
    date_naissance: "",
    genre: "",
    prenom_pere: "",
    nom_mere: "",
    prenom_mere: "",
    nom_conjoint: "",
    prenom_conjoint: "",
    credit: "",
    nina: "",
    amo: "",
    mutuelle: "",
    autre_pieces: "",
    statut_matrimonial: "",
    date_creation: "",
    quartier: "",
    telephone1: "",
    telephone_2: "",
    etat: "",
  })
  const listeDossiers = async () => {
    try {
      const dossiers = await getAllDossiers()
      // console.log("Liste des dossiers:", dossiers)
      // console.log("liste des dossier", JSON.stringify(dossiers), null, 2)
      const rawDossiers = dossiers.map((dossier) => dossier._raw)
      console.log("Liste des dossiers:", JSON.stringify(rawDossiers, null, 2))
    } catch (error) {
      console.error("Erreur lors de la récupération des dossiers:", error)
    }
  }
  // Charger les données du patient si en mode édition
  useEffect(() => {
    listeDossiers()
    if (isEditing) {
      loadPatient()
    } else {
      // Generate a unique random number for new patients
      generateUniqueDossierNumber()
    }
  }, [isEditing])

  const loadPatient = async () => {
    try {
      showLoading("Chargement des données du patient...")
      const patient = await getDossierById(patientId)
      setForm({
        numero_dossier: patient.numeroDossier || "",
        hors_haire: patient.horsHaire || false,
        alerte: patient.alerte || false,
        nom: patient.nom || "",
        prenom: patient.prenom || "",
        ethnie: patient.ethnie || "",
        profession: patient.profession || "",
        date_naissance: patient.dateNaissance || "",
        genre: patient.genre || "",
        prenom_pere: patient.prenomPere || "",
        nom_mere: patient.nomMere || "",
        prenom_mere: patient.prenomMere || "",
        nom_conjoint: patient.nomConjoint || "",
        prenom_conjoint: patient.prenomConjoint || "",
        credit: patient.credit || "",
        nina: patient.nina || "",
        amo: patient.amo || "",
        mutuelle: patient.mutuelle || "",
        autre_pieces: patient.autrePieces || "",
        statut_matrimonial: patient.statutMatrimonial || "",
        date_creation: patient.dateCreation || "",
        quartier: patient.quartier || "",
        telephone1: patient.telephone1 || "",
        telephone_2: patient.telephone2 || "",
        etat: patient.etat || "actif",
      })
    } catch (error) {
      toast.showError(`Erreur lors du chargement du patient: ${error.message}`)
    } finally {
      hideLoading()
    }
  }

  const generateUniqueDossierNumber = async () => {
    try {
      // Generate a random 8-digit number
      const currentDate = new Date()
      const year = currentDate.getFullYear().toString().slice(2) // Get last 2 digits of year
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0")
      const day = currentDate.getDate().toString().padStart(2, "0")
      const random = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")

      const newNumber = `${year}${month}${day}${random}`

      // Check if this number already exists
      const existingDossiers = await findDossiersByField("numero_dossier", newNumber)

      if (existingDossiers.length > 0) {
        // If exists, try again
        generateUniqueDossierNumber()
      } else {
        // Set the new unique number
        setForm((prev) => ({
          ...prev,
          numero_dossier: newNumber,
          date_creation: new Date().toISOString().split("T")[0],
        }))
      }
    } catch (error) {
      console.error("Error generating unique dossier number:", error)
      // Fallback to timestamp-based ID if there's an error
      const fallbackId = `${Date.now()}`
      setForm((prev) => ({
        ...prev,
        numero_dossier: fallbackId,
        date_creation: new Date().toISOString().split("T")[0],
      }))
    }
  }

  // Mettre à jour les champs du formulaire
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.nom.trim()) {
      newErrors.nom = "Le nom est requis"
    }
    if (!form.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis"
    }
    if (!form.date_naissance) {
      newErrors.date_naissance = "La date de naissance est requise"
    }
    if (!form.genre) {
      newErrors.genre = "Le genre est requis"
    }
    if (!form.numero_dossier) {
      newErrors.numero_dossier = "Le numéro de dossier est requis"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Soumettre le formulaire
  const handleSubmit = async () => {
    // if (!validateForm()) {
    //   return;
    // }
    try {
      const loadingMessage = isEditing ? "Mise à jour du patient..." : "Création du patient..."
      showLoading(loadingMessage)
      if (isEditing) {
        await updateDossier(patientId, form)
        toast.showSuccess("Patient mis à jour avec succès")
      } else {
        await createDossier(form)
        toast.showSuccess("Patient créé avec succès")
      }
      setLoading(false)
      router.back()
    } catch (error) {
      toast.showError(`Erreur: ${error.message}`)
    } finally {
      hideLoading()
    }
  }

  // Annuler et revenir en arrière
  const handleCancel = () => {
    router.back()
  }

  // Définir les étapes du formulaire
  const steps = [
    {
      title: "Références dossier",
      component: (
        <View>
          <TextField
            label="Numéro de dossier"
            value={form.numero_dossier}
            onChangeText={(value) => handleChange("numero_dossier", value)}
            placeholder="Numéro de dossier"
            editable={false} // Make it read-only
          />
          <CheckboxField
            label="Hors haire"
            checked={form.hors_haire}
            onValueChange={(value) => handleChange("hors_haire", value)}
          />
          <CheckboxField
            label="Alerte"
            checked={form.alerte}
            onValueChange={(value) => handleChange("alerte", value)}
          />
          <TextField
            label="Nom"
            value={form.nom}
            onChangeText={(value) => handleChange("nom", value)}
            placeholder="Entrez le nom"
            required
          />
          <TextField
            label="Prénom"
            value={form.prenom}
            onChangeText={(value) => handleChange("prenom", value)}
            placeholder="Entrez le prénom"
            required
          />
          <SelectField
            label="Ethnie"
            value={form.ethnie}
            onValueChange={(value) => handleChange("ethnie", value)}
            options={EthnieOption}
            placeholder="Sélectionnez l'ethnie"
          />
          <TextField
            label="Profession"
            value={form.profession}
            onChangeText={(value) => handleChange("profession", value)}
            placeholder="Entrez la profession"
          />
          <DateField
            label="Date de naissance"
            value={form.date_naissance ? new Date(form.date_naissance) : null}
            onValueChange={(value) => handleChange("date_naissance", value.toISOString().split("T")[0])}
            placeholder="Sélectionnez la date de naissance"
            required
          />
          <RadioField
            label="Genre"
            value={form.genre}
            onValueChange={(value) => handleChange("genre", value)}
            options={genreOptions}
            required
          />
        </View>
      ),
    },
    {
      title: "Famille",
      component: (
        <View>
          <TextField
            label="Prénom du père"
            value={form.prenom_pere}
            onChangeText={(value) => handleChange("prenom_pere", value)}
            placeholder="Entrez le prénom du père"
          />
          <TextField
            label="Nom de la mère"
            value={form.nom_mere}
            onChangeText={(value) => handleChange("nom_mere", value)}
            placeholder="Entrez le nom de la mère"
          />
          <TextField
            label="Prénom de la mère"
            value={form.prenom_mere}
            onChangeText={(value) => handleChange("prenom_mere", value)}
            placeholder="Entrez le prénom de la mère"
          />
          <TextField
            label="Nom du conjoint"
            value={form.nom_conjoint}
            onChangeText={(value) => handleChange("nom_conjoint", value)}
            placeholder="Entrez le nom du conjoint"
          />
          <TextField
            label="Prénom du conjoint"
            value={form.prenom_conjoint}
            onChangeText={(value) => handleChange("prenom_conjoint", value)}
            placeholder="Entrez le prénom du conjoint"
          />
          <SelectField
            label="Statut matrimonial"
            value={form.statut_matrimonial}
            onValueChange={(value) => handleChange("statut_matrimonial", value)}
            options={statutMatrimonialOptions}
            placeholder="Sélectionnez le statut matrimonial"
          />
        </View>
      ),
    },
    {
      title: "Domiciliation",
      component: (
        <View>
          <TextField
            label="Quartier"
            value={form.quartier}
            onChangeText={(value) => handleChange("quartier", value)}
            placeholder="Entrez le quartier"
          />
          <TextField
            label="Tel Perso"
            value={form.telephone1}
            onChangeText={(value) => handleChange("telephone1", value)}
            placeholder="Entrez le numéro de téléphone"
            inputProps={{
              keyboardType: "phone-pad",
            }}
          />
          <TextField
            label="Tel contact"
            value={form.telephone_2}
            onChangeText={(value) => handleChange("telephone_2", value)}
            placeholder="Entrez le numéro de téléphone secondaire"
            inputProps={{
              keyboardType: "phone-pad",
            }}
          />
        </View>
      ),
    },
    {
      title: "Documents",
      component: (
        <View>
          <TextField
            label="Crédit"
            value={form.credit}
            onChangeText={(value) => handleChange("credit", value)}
            placeholder="Entrez le crédit"
          />
          <TextField
            label="NINA"
            value={form.nina}
            onChangeText={(value) => handleChange("nina", value)}
            placeholder="Entrez le numéro NINA"
          />
          <TextField
            label="AMO"
            value={form.amo}
            onChangeText={(value) => handleChange("amo", value)}
            placeholder="Entrez le numéro AMO"
          />
          <TextField
            label="Mutuelle"
            value={form.mutuelle}
            onChangeText={(value) => handleChange("mutuelle", value)}
            placeholder="Entrez la mutuelle"
          />
          <TextField
            label="Autres pièces"
            value={form.autre_pieces}
            onChangeText={(value) => handleChange("autre_pieces", value)}
            placeholder="Entrez les autres pièces"
          />
          <DateField
            label="Date de création"
            value={form.date_creation ? new Date(form.date_creation) : new Date()}
            onValueChange={(value) => handleChange("date_creation", value.toISOString().split("T")[0])}
            placeholder="Date de création du dossier"
            editable={false}
          />
          <TextField
            label="État"
            value={form.etat || "actif"}
            onChangeText={(value) => handleChange("etat", value)}
            placeholder="État du dossier"
            editable={false}
          />
        </View>
      ),
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Header title={isEditing ? "Modifier un patient" : "Ajouter un patient"} />
      {/* <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    > */}
      <FormStepper steps={steps} onComplete={handleSubmit} onCancel={handleCancel} loading={loading} />
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
})
import DateField from "../../components/form/DateField"

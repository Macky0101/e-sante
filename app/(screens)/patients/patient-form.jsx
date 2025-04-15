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
import patientService from "../../services/patientService"
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
  {value: "bamara", label: "Bambara"},
  {value: "malinke", label: "Malinké"},
  {value: "soninké", label: "Soninké"},
  {value: "peul", label: "Peul"},
  {value: "arabe", label: "Arabe"},
  {value: "tamasheq", label: "Tamasheq"},
  {value: "bobo", label: "Bobo"},
  {value: "dogon", label: "Dogon"},
  {value: "minianka", label: "Minianka"},
  {value: "senufo", label: "Sénoufo"},
]

export default function PatientFormScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const patientId = params.id
  const isEditing = !!patientId

  const toast = useToast()
  const { showLoading, hideLoading } = useLoading()
  const [loading, setLoading] = useState(false)

  // État du formulaire
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    genre: "",
    profession: "",
    telephone1: "",
    telephone_2: "",
    email: "",
    adresse: "",
    ville: "",
    code_postal: "",
    statut_matrimonial: "",
    hors_haire: false,
    alerte: false,
    ethnie:"",
    region: "",
    District: "",
    Village: "",
  })

  // Charger les données du patient si en mode édition
  useEffect(() => {
    if (isEditing) {
      loadPatient()
    }
  }, [isEditing])

  const loadPatient = async () => {
    try {
      showLoading("Chargement des données du patient...")
      const patient = await patientService.getPatientById(patientId)
      setForm({
        nom: patient.nom || "",
        prenom: patient.prenom || "",
        date_naissance: patient.date_naissance || "",
        genre: patient.genre || "",
        profession: patient.profession || "",
        telephone1: patient.telephone1 || "",
        telephone_2: patient.telephone_2 || "",
        email: patient.email || "",
        adresse: patient.adresse || "",
        ville: patient.ville || "",
        code_postal: patient.code_postal || "",
        statut_matrimonial: patient.statut_matrimonial || "",
        hors_haire: patient.hors_haire || false,
        alerte: patient.alerte || false,
        ethnie: patient.ethnie || "",
        region: patient.region || "",
        District: patient.District || "",
        Village: patient.Village || "",
      })
    } catch (error) {
      toast.showError(`Erreur lors du chargement du patient: ${error.message}`)
    } finally {
      hideLoading()
    }
  }

  // Mettre à jour les champs du formulaire
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Soumettre le formulaire
  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (isEditing) {
        await patientService.updatePatient(patientId, form)
        toast.showSuccess("Patient mis à jour avec succès")
      } else {
        await patientService.createPatient(form)
        toast.showSuccess("Patient créé avec succès")
      }
      router.back()
    } catch (error) {
      toast.showError(`Erreur: ${error.message}`)
    } finally {
      setLoading(false)
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
          <TextField
            label="Date de naissance"
            value={form.date_naissance}
            onChangeText={(value) => handleChange("date_naissance", value)}
            placeholder="JJ/MM/AAAA"
            required
            inputProps={{
              keyboardType: "numeric",
            }}
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
            label="Email"
            value={form.email}
            onChangeText={(value) => handleChange("email", value)}
            placeholder="Entrez l'adresse email"
            inputProps={{
              keyboardType: "email-address",
            }}
          />
          <TextField
            label="Adresse"
            value={form.adresse}
            onChangeText={(value) => handleChange("adresse", value)}
            placeholder="Entrez l'adresse"
          />
          <TextField
            label="Ville"
            value={form.ville}
            onChangeText={(value) => handleChange("ville", value)}
            placeholder="Entrez la ville"
          />
          <TextField
            label="Code postal"
            value={form.code_postal}
            onChangeText={(value) => handleChange("code_postal", value)}
            placeholder="Entrez le code postal"
            inputProps={{
              keyboardType: "numeric",
            }}
          />
        </View>
      ),
    },
    {
      title: "Domiciliation",
      component: (
        <View>
        <TextField
        label="Région"
        value={form.region}
        onChangeText={(value) => handleChange("region", value)}
        placeholder="Entrez la région"
        />
        <TextField
        label="District"
        value={form.District}
        onChangeText={(value) => handleChange("District", value)}
        placeholder="Entrez le district"
        />
        <TextField
        label="Village"
        value={form.Village}
        onChangeText={(value) => handleChange("Village", value)}
        placeholder="Entrez le village"
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

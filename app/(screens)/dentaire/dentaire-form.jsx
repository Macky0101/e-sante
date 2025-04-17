"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import Header from "../../components/header/Header"
import TextField from "../../components/form/TextField"
import CheckboxField from "../../components/form/CheckboxField"
import FormStepper from "../../components/stepper/FormStepper"
import { useToast } from "../../components/toast/ToastProvider"
import { useLoading } from "../../components/loading/LoadingProvider"
import dentaireService from "../../services/dentaireService"
import patientService from "../../services/patientService"

export default function DentaireFormScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const dentaireId = params.id
  const patientId = params.patientId
  const isEditing = !!dentaireId

  const toast = useToast()
  const { showLoading, hideLoading } = useLoading()
  const [loading, setLoading] = useState(false)

  // État du formulaire
  const [form, setForm] = useState({
    numero_dossier: "",
    patient: {
      id: "",
      nom: "",
      prenom: "",
      date_naissance: "",
      genre: 1,
    },
    visite: new Date().toISOString().split("T")[0],
    consultation: false,
    Nb_extraction: "",
    drainage: false,
    refere: false,
    soins_obturateurs: false,
    autres_soins: false,
    radiographie: false,
    referencement_interne: false,
    complement_information: "",
    Poids: "",
    taille: "",
    SO2P: "",
    ta: "",
    fc: "",
    t: "",
    conduite: "",
    medicament: "",
    reference: "",
    motif: "",
    rendez_vous: "",
  })

  // Charger les données du soin dentaire si en mode édition
  useEffect(() => {
    if (isEditing) {
      loadDentaire()
    } else if (patientId) {
      // Si un ID de patient est fourni, charger les données du patient
      loadPatient()
    }
  }, [isEditing, patientId])

  const loadDentaire = async () => {
    try {
      showLoading("Chargement des données du soin dentaire...")
      const dentaire = await dentaireService.getDentaireById(dentaireId)
      setForm({
        numero_dossier: dentaire.numero_dossier || "",
        patient: dentaire.patient || { id: "", nom: "", prenom: "", date_naissance: "", genre: 1 },
        visite: dentaire.visite || new Date().toISOString().split("T")[0],
        consultation: dentaire.consultation || false,
        Nb_extraction: dentaire.Nb_extraction || "",
        drainage: dentaire.drainage || false,
        refere: dentaire.refere || false,
        soins_obturateurs: dentaire.soins_obturateurs || false,
        autres_soins: dentaire.autres_soins || false,
        radiographie: dentaire.radiographie || false,
        referencement_interne: dentaire.referencement_interne || false,
        complement_information: dentaire.complement_information || "",
        Poids: dentaire.Poids ? dentaire.Poids.toString() : "",
        taille: dentaire.taille ? dentaire.taille.toString() : "",
        SO2P: dentaire.SO2P ? dentaire.SO2P.toString() : "",
        ta: dentaire.ta || "",
        fc: dentaire.fc ? dentaire.fc.toString() : "",
        t: dentaire.t ? dentaire.t.toString() : "",
        conduite: dentaire.conduite || "",
        medicament: dentaire.medicament || "",
        reference: dentaire.reference || "",
        motif: dentaire.motif || "",
        rendez_vous: dentaire.rendez_vous || "",
      })
    } catch (error) {
      toast.showError(`Erreur lors du chargement du soin dentaire: ${error.message}`)
    } finally {
      hideLoading()
    }
  }

  const loadPatient = async () => {
    try {
      showLoading("Chargement des données du patient...")
      const patient = await patientService.getPatientById(patientId)
      setForm((prev) => ({
        ...prev,
        numero_dossier: patient.numero_dossier || "",
        patient: {
          id: patient.id,
          nom: patient.nom || "",
          prenom: patient.prenom || "",
          date_naissance: patient.date_naissance || "",
          genre: patient.genre || 1,
        },
      }))
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

  // Mettre à jour les champs du patient
  const handlePatientChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      patient: {
        ...prev.patient,
        [field]: value,
      },
    }))
  }

  // Soumettre le formulaire
  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (isEditing) {
        await dentaireService.updateDentaire(dentaireId, form)
        toast.showSuccess("Soin dentaire mis à jour avec succès")
      } else {
        await dentaireService.createDentaire(form)
        toast.showSuccess("Soin dentaire créé avec succès")
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
      title: "Informations patient",
      component: (
        <View>
          <TextField
            label="Numéro de dossier"
            value={form.numero_dossier}
            onChangeText={(value) => handleChange("numero_dossier", value)}
            placeholder="Entrez le numéro de dossier"
            required
            disabled={!!patientId} // Désactiver si un patient est sélectionné
          />
          <TextField
            label="Nom"
            value={form.patient.nom}
            onChangeText={(value) => handlePatientChange("nom", value)}
            placeholder="Entrez le nom"
            required
            disabled={!!patientId} // Désactiver si un patient est sélectionné
          />
          <TextField
            label="Prénom"
            value={form.patient.prenom}
            onChangeText={(value) => handlePatientChange("prenom", value)}
            placeholder="Entrez le prénom"
            required
            disabled={!!patientId} // Désactiver si un patient est sélectionné
          />
          <TextField
            label="Date de naissance"
            value={form.patient.date_naissance}
            onChangeText={(value) => handlePatientChange("date_naissance", value)}
            placeholder="JJ/MM/AAAA"
            required
            disabled={!!patientId} // Désactiver si un patient est sélectionné
          />
          <TextField
            label="Date de visite"
            value={form.visite}
            onChangeText={(value) => handleChange("visite", value)}
            placeholder="AAAA-MM-JJ"
            required
          />
          <TextField
            label="Motif"
            value={form.motif}
            onChangeText={(value) => handleChange("motif", value)}
            placeholder="Entrez le motif de la consultation"
          />
        </View>
      ),
    },
    // Les autres étapes restent inchangées
    {
      title: "Signes vitaux",
      component: (
        <View>
          <TextField
            label="Poids (kg)"
            value={form.Poids}
            onChangeText={(value) => handleChange("Poids", value)}
            placeholder="Entrez le poids"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="Taille (cm)"
            value={form.taille}
            onChangeText={(value) => handleChange("taille", value)}
            placeholder="Entrez la taille"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="SpO2 (%)"
            value={form.SO2P}
            onChangeText={(value) => handleChange("SO2P", value)}
            placeholder="Entrez la saturation en oxygène"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="Tension artérielle (mmHg)"
            value={form.ta}
            onChangeText={(value) => handleChange("ta", value)}
            placeholder="Ex: 120/80"
          />
          <TextField
            label="Fréquence cardiaque (bpm)"
            value={form.fc}
            onChangeText={(value) => handleChange("fc", value)}
            placeholder="Entrez la fréquence cardiaque"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="Température (°C)"
            value={form.t}
            onChangeText={(value) => handleChange("t", value)}
            placeholder="Entrez la température"
            inputProps={{ keyboardType: "numeric" }}
          />
        </View>
      ),
    },
    {
      title: "Soins dentaires",
      component: (
        <View>
          <CheckboxField
            label="Consultation"
            checked={form.consultation}
            onValueChange={(value) => handleChange("consultation", value)}
          />
          <TextField
            label="Nombre d'extractions"
            value={form.Nb_extraction}
            onChangeText={(value) => handleChange("Nb_extraction", value)}
            placeholder="Entrez le nombre d'extractions"
            inputProps={{ keyboardType: "numeric" }}
          />
          <CheckboxField
            label="Drainage"
            checked={form.drainage}
            onValueChange={(value) => handleChange("drainage", value)}
          />
          <CheckboxField
            label="Référé"
            checked={form.refere}
            onValueChange={(value) => handleChange("refere", value)}
          />
          <CheckboxField
            label="Soins obturateurs"
            checked={form.soins_obturateurs}
            onValueChange={(value) => handleChange("soins_obturateurs", value)}
          />
          <CheckboxField
            label="Autres soins  value"
            checked={form.autres_soins}
            onValueChange={(value) => handleChange("autres_soins", value)}
          />
         <CheckboxField
            label="Radiographie"
            checked={form.radiographie}
            onValueChange={(value) => handleChange("radiographie", value)}
          />
        </View>
      ),
    },
    {
      title: "Traitement et suivi",
      component: (
        <View>
          <TextField
            label="Conduite à tenir"
            value={form.conduite}
            onChangeText={(value) => handleChange("conduite", value)}
            placeholder="Entrez la conduite à tenir"
            multiline={true}
            inputProps={{ numberOfLines: 4 }}
          />
          <TextField
            label="Médicaments"
            value={form.medicament}
            onChangeText={(value) => handleChange("medicament", value)}
            placeholder="Entrez les médicaments prescrits"
          />
          <TextField
            label="Référence"
            value={form.reference}
            onChangeText={(value) => handleChange("reference", value)}
            placeholder="Entrez la référence si applicable"
          />
          <TextField
            label="Date de rendez-vous"
            value={form.rendez_vous}
            onChangeText={(value) => handleChange("rendez_vous", value)}
            placeholder="AAAA-MM-JJ"
          />
          <CheckboxField
            label="Référencement interne"
            checked={form.referencement_interne}
            onValueChange={(value) => handleChange("referencement_interne", value)}
          />
          <TextField
            label="Complément d'information"
            value={form.complement_information}
            onChangeText={(value) => handleChange("complement_information", value)}
            placeholder="Entrez des informations complémentaires"
            multiline={true}
            inputProps={{ numberOfLines: 4 }}
          />
        </View>
      ),
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Header title={isEditing ? "Modifier un soin dentaire" : "Ajouter un soin dentaire"} />
      <FormStepper steps={steps} onComplete={handleSubmit} onCancel={handleCancel} loading={loading} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
})

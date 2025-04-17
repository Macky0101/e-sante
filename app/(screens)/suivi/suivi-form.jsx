import { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import Header from "../../components/header/Header"
import TextField from "../../components/form/TextField"
import CheckboxField from "../../components/form/CheckboxField"
import SelectField from "../../components/form/SelectField"
import FormStepper from "../../components/stepper/FormStepper"
import { useToast } from "../../components/toast/ToastProvider"
import { useLoading } from "../../components/loading/LoadingProvider"
import suiviService from "../../services/suiviService"
import patientService from "../../services/patientService"

// Options pour la nature du traitement
const natureOptions = [
  { value: "Consultation", label: "Consultation" },
  { value: "Contrôle", label: "Contrôle" },
  { value: "Urgence", label: "Urgence" },
  { value: "Suivi chronique", label: "Suivi chronique" },
]

// Options pour la voie d'administration
const voieOptions = [
  { value: "Orale", label: "Orale" },
  { value: "Intraveineuse", label: "Intraveineuse" },
  { value: "Intramusculaire", label: "Intramusculaire" },
  { value: "Sous-cutanée", label: "Sous-cutanée" },
  { value: "Autre", label: "Autre" },
]

export default function SuiviFormScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const suiviId = params.id
  const patientId = params.patientId
  const isEditing = !!suiviId

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
    date: new Date().toISOString().split("T")[0],
    nature: "",
    dosage: "",
    voie: "",
    "P(kg)": "",
    "TA(mmHg)": "",
    "FC(mn)": "",
    "T(°)": "",
    glycemie: "",
    TDR_Palu: "",
    precision_si_positif: "",
    presence_albumine: "",
    presence_sucre: "",
    referencement_interne: false,
    complement_information: "",
    taille: "",
    poids: "",
    SO2P: "",
    ta_min: "",
    ta_max: "",
    imc: "",
    fc: "",
    temperature: "",
    examen: "",
    resultat: "",
    conduite: "",
    reference: "",
  })

  // Charger les données du suivi médical si en mode édition
  useEffect(() => {
    if (isEditing) {
      loadSuivi()
    } else if (patientId) {
      // Si un ID de patient est fourni, charger les données du patient
      loadPatient()
    }
  }, [isEditing, patientId])

  const loadSuivi = async () => {
    try {
      showLoading("Chargement des données du suivi médical...")
      const suivi = await suiviService.getSuiviById(suiviId)
      setForm({
        numero_dossier: suivi.numero_dossier || "",
        patient: suivi.patient || { id: "", nom: "", prenom: "", date_naissance: "", genre: 1 },
        date: suivi.date || new Date().toISOString().split("T")[0],
        nature: suivi.nature || "",
        dosage: suivi.dosage || "",
        voie: suivi.voie || "",
        "P(kg)": suivi["P(kg)"] || "",
        "TA(mmHg)": suivi["TA(mmHg)"] || "",
        "FC(mn)": suivi["FC(mn)"] || "",
        "T(°)": suivi["T(°)"] || "",
        glycemie: suivi.glycemie || "",
        TDR_Palu: suivi.TDR_Palu || "",
        precision_si_positif: suivi.precision_si_positif || "",
        presence_albumine: suivi.presence_albumine || "",
        presence_sucre: suivi.presence_sucre || "",
        referencement_interne: suivi.referencement_interne || false,
        complement_information: suivi.complement_information || "",
        taille: suivi.taille ? suivi.taille.toString() : "",
        poids: suivi.poids ? suivi.poids.toString() : "",
        SO2P: suivi.SO2P ? suivi.SO2P.toString() : "",
        ta_min: suivi.ta_min ? suivi.ta_min.toString() : "",
        ta_max: suivi.ta_max ? suivi.ta_max.toString() : "",
        imc: suivi.imc ? suivi.imc.toString() : "",
        fc: suivi.fc ? suivi.fc.toString() : "",
        temperature: suivi.temperature ? suivi.temperature.toString() : "",
        examen: suivi.examen || "",
        resultat: suivi.resultat || "",
        conduite: suivi.conduite || "",
        reference: suivi.reference || "",
      })
    } catch (error) {
      toast.showError(`Erreur lors du chargement du suivi médical: ${error.message}`)
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
        await suiviService.updateSuivi(suiviId, form)
        toast.showSuccess("Suivi médical mis à jour avec succès")
      } else {
        await suiviService.createSuivi(form)
        toast.showSuccess("Suivi médical créé avec succès")
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
            label="Date de consultation"
            value={form.date}
            onChangeText={(value) => handleChange("date", value)}
            placeholder="AAAA-MM-JJ"
            required
          />
          <SelectField
            label="Nature de la consultation"
            value={form.nature}
            onValueChange={(value) => handleChange("nature", value)}
            options={natureOptions}
            placeholder="Sélectionnez une nature"
          />
        </View>
      ),
    },
    {
      title: "Signes vitaux",
      component: (
        <View>
          <TextField
            label="Taille (cm)"
            value={form.taille}
            onChangeText={(value) => handleChange("taille", value)}
            placeholder="Entrez la taille"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="Poids (kg)"
            value={form.poids}
            onChangeText={(value) => handleChange("poids", value)}
            placeholder="Entrez le poids"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="IMC"
            value={form.imc}
            onChangeText={(value) => handleChange("imc", value)}
            placeholder="Indice de masse corporelle"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="TA minimale (mmHg)"
            value={form.ta_min}
            onChangeText={(value) => handleChange("ta_min", value)}
            placeholder="Tension artérielle minimale"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="TA maximale (mmHg)"
            value={form.ta_max}
            onChangeText={(value) => handleChange("ta_max", value)}
            placeholder="Tension artérielle maximale"
            inputProps={{ keyboardType: "numeric" }}
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
            value={form.temperature}
            onChangeText={(value) => handleChange("temperature", value)}
            placeholder="Entrez la température"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="SpO2 (%)"
            value={form.SO2P}
            onChangeText={(value) => handleChange("SO2P", value)}
            placeholder="Saturation en oxygène"
            inputProps={{ keyboardType: "numeric" }}
          />
        </View>
      ),
    },
    {
      title: "Examens complémentaires",
      component: (
        <View>
          <TextField
            label="Glycémie (g/L)"
            value={form.glycemie}
            onChangeText={(value) => handleChange("glycemie", value)}
            placeholder="Entrez la glycémie"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="TDR Palu"
            value={form.TDR_Palu}
            onChangeText={(value) => handleChange("TDR_Palu", value)}
            placeholder="Résultat du test"
          />
          {form.TDR_Palu === "positif" && (
            <TextField
              label="Précision si positif"
              value={form.precision_si_positif}
              onChangeText={(value) => handleChange("precision_si_positif", value)}
              placeholder="Précisez"
            />
          )}
          <TextField
            label="Présence d'albumine"
            value={form.presence_albumine}
            onChangeText={(value) => handleChange("presence_albumine", value)}
            placeholder="Résultat du test"
          />
          <TextField
            label="Présence de sucre"
            value={form.presence_sucre}
            onChangeText={(value) => handleChange("presence_sucre", value)}
            placeholder="Résultat du test"
          />
          <TextField
            label="Type d'examen"
            value={form.examen}
            onChangeText={(value) => handleChange("examen", value)}
            placeholder="Précisez l'examen effectué"
          />
          <TextField
            label="Résultat de l'examen"
            value={form.resultat}
            onChangeText={(value) => handleChange("resultat", value)}
            placeholder="Résultat de l'examen"
            multiline={true}
            inputProps={{ numberOfLines: 4 }}
          />
        </View>
      ),
    },
    {
      title: "Traitement et suivi",
      component: (
        <View>
          <TextField
            label="Dosage"
            value={form.dosage}
            onChangeText={(value) => handleChange("dosage", value)}
            placeholder="Précisez le dosage"
          />
          <SelectField
            label="Voie d'administration"
            value={form.voie}
            onValueChange={(value) => handleChange("voie", value)}
            options={voieOptions}
            placeholder="Sélectionnez une voie"
          />
          <TextField
            label="Conduite à tenir"
            value={form.conduite}
            onChangeText={(value) => handleChange("conduite", value)}
            placeholder="Précisez la conduite à tenir"
            multiline={true}
            inputProps={{ numberOfLines: 4 }}
          />
          <TextField
            label="Référence"
            value={form.reference}
            onChangeText={(value) => handleChange("reference", value)}
            placeholder="Détails de la référence"
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
            placeholder="Observations supplémentaires"
            multiline={true}
            inputProps={{ numberOfLines: 4 }}
          />
        </View>
      ),
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Header title={isEditing ? "Modifier un suivi médical" : "Ajouter un suivi médical"} />
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

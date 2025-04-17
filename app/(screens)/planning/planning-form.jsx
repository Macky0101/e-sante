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
import planningService from "../../services/planningService"

// Options pour les méthodes de contraception
const methodeOptions = [
  { value: "pilule", label: "Pilule" },
  { value: "implant", label: "Implant" },
  { value: "diu", label: "DIU" },
  { value: "injectable", label: "Injectable" },
  { value: "preservatif", label: "Préservatif" },
  { value: "autre", label: "Autre" },
]

export default function PlanningFormScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const planningId = params.id
  const isEditing = !!planningId

  const toast = useToast()
  const { showLoading, hideLoading } = useLoading()
  const [loading, setLoading] = useState(false)

  // État du formulaire
  const [form, setForm] = useState({
    numero_dossier: "",
    patient: {
      nom: "",
      prenom: "",
      date_naissance: "",
      genre: 2, // Par défaut femme pour planning familial
    },
    visite: new Date().toISOString().split("T")[0],
    "P(kg)": "",
    "TA(mmHg)": "",
    renouvellement: false,
    si_arret: "",
    methode: "",
    nature_produit: "",
    quantite_fournie: "",
    presence_sucre: "",
    examen_seins: false,
    recherche_ganglions: false,
    examen_uterin_TV: false,
    moustiquaire_impregnee: false,
    referencement_interne: false,
    complement_information: false,
    nombre_enfant_vivant: "",
    allergies: "",
    age_premiere_regle: "",
    taille: "",
    conjonctive: "",
    omi: "",
    inspection: "",
    besoin_analyse: "",
    counseling_pf: "",
    arret: "",
    planningcol: "",
    precision_methode: "",
  })

  // Charger les données de la consultation de planning si en mode édition
  useEffect(() => {
    if (isEditing) {
      loadPlanning()
    }
  }, [isEditing])

  const loadPlanning = async () => {
    try {
      showLoading("Chargement des données de la consultation...")
      const planning = await planningService.getPlanningById(planningId)
      setForm({
        numero_dossier: planning.numero_dossier || "",
        patient: planning.patient || { nom: "", prenom: "", date_naissance: "", genre: 2 },
        visite: planning.visite || new Date().toISOString().split("T")[0],
        "P(kg)": planning["P(kg)"] || "",
        "TA(mmHg)": planning["TA(mmHg)"] || "",
        renouvellement: planning.renouvellement || false,
        si_arret: planning.si_arret || "",
        methode: planning.methode || "",
        nature_produit: planning.nature_produit || "",
        quantite_fournie: planning.quantite_fournie ? planning.quantite_fournie.toString() : "",
        presence_sucre: planning.presence_sucre || "",
        examen_seins: planning.examen_seins || false,
        recherche_ganglions: planning.recherche_ganglions || false,
        examen_uterin_TV: planning.examen_uterin_TV || false,
        moustiquaire_impregnee: planning.moustiquaire_impregnee || false,
        referencement_interne: planning.referencement_interne || false,
        complement_information: planning.complement_information || false,
        nombre_enfant_vivant: planning.nombre_enfant_vivant ? planning.nombre_enfant_vivant.toString() : "",
        allergies: planning.allergies || "",
        age_premiere_regle: planning.age_premiere_regle ? planning.age_premiere_regle.toString() : "",
        taille: planning.taille ? planning.taille.toString() : "",
        conjonctive: planning.conjonctive || "",
        omi: planning.omi || "",
        inspection: planning.inspection || "",
        besoin_analyse: planning.besoin_analyse || "",
        counseling_pf: planning.counseling_pf || "",
        arret: planning.arret || "",
        planningcol: planning.planningcol || "",
        precision_methode: planning.precision_methode || "",
      })
    } catch (error) {
      toast.showError(`Erreur lors du chargement de la consultation: ${error.message}`)
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
        await planningService.updatePlanning(planningId, form)
        toast.showSuccess("Consultation de planning mise à jour avec succès")
      } else {
        await planningService.createPlanning(form)
        toast.showSuccess("Consultation de planning créée avec succès")
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
          />
          <TextField
            label="Nom"
            value={form.patient.nom}
            onChangeText={(value) => handlePatientChange("nom", value)}
            placeholder="Entrez le nom"
            required
          />
          <TextField
            label="Prénom"
            value={form.patient.prenom}
            onChangeText={(value) => handlePatientChange("prenom", value)}
            placeholder="Entrez le prénom"
            required
          />
          <TextField
            label="Date de naissance"
            value={form.patient.date_naissance}
            onChangeText={(value) => handlePatientChange("date_naissance", value)}
            placeholder="JJ/MM/AAAA"
            required
          />
          <TextField
            label="Date de visite"
            value={form.visite}
            onChangeText={(value) => handleChange("visite", value)}
            placeholder="AAAA-MM-JJ"
            required
          />
          <TextField
            label="Nombre d'enfants vivants"
            value={form.nombre_enfant_vivant}
            onChangeText={(value) => handleChange("nombre_enfant_vivant", value)}
            placeholder="Entrez le nombre d'enfants"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="Allergies"
            value={form.allergies}
            onChangeText={(value) => handleChange("allergies", value)}
            placeholder="Entrez les allergies"
          />
          <TextField
            label="Âge de la première règle"
            value={form.age_premiere_regle}
            onChangeText={(value) => handleChange("age_premiere_regle", value)}
            placeholder="Entrez l'âge"
            inputProps={{ keyboardType: "numeric" }}
          />
        </View>
      ),
    },
    {
      title: "Signes vitaux et examen",
      component: (
        <View>
          <TextField
            label="Poids (kg)"
            value={form["P(kg)"]}
            onChangeText={(value) => handleChange("P(kg)", value)}
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
            label="Tension artérielle (mmHg)"
            value={form["TA(mmHg)"]}
            onChangeText={(value) => handleChange("TA(mmHg)", value)}
            placeholder="Ex: 120/80"
          />
          <TextField
            label="Conjonctive"
            value={form.conjonctive}
            onChangeText={(value) => handleChange("conjonctive", value)}
            placeholder="État de la conjonctive"
          />
          <TextField
            label="OMI"
            value={form.omi}
            onChangeText={(value) => handleChange("omi", value)}
            placeholder="Œdème des membres inférieurs"
          />
          <TextField
            label="Inspection"
            value={form.inspection}
            onChangeText={(value) => handleChange("inspection", value)}
            placeholder="Résultats de l'inspection"
            multiline={true}
            inputProps={{ numberOfLines: 4 }}
          />
          <CheckboxField
            label="Examen des seins"
            checked={form.examen_seins}
            onValueChange={(value) => handleChange("examen_seins", value)}
          />
          <CheckboxField
            label="Recherche de ganglions"
            checked={form.recherche_ganglions}
            onValueChange={(value) => handleChange("recherche_ganglions", value)}
          />
          <CheckboxField
            label="Examen utérin (TV)"
            checked={form.examen_uterin_TV}
            onValueChange={(value) => handleChange("examen_uterin_TV", value)}
          />
          <TextField
            label="Col"
            value={form.planningcol}
            onChangeText={(value) => handleChange("planningcol", value)}
            placeholder="État du col"
          />
          <TextField
            label="Présence de sucre"
            value={form.presence_sucre}
            onChangeText={(value) => handleChange("presence_sucre", value)}
            placeholder="Résultat du test"
          />
        </View>
      ),
    },
    {
      title: "Méthode contraceptive",
      component: (
        <View>
          <CheckboxField
            label="Renouvellement"
            checked={form.renouvellement}
            onValueChange={(value) => handleChange("renouvellement", value)}
          />
          <SelectField
            label="Méthode"
            value={form.methode}
            onValueChange={(value) => handleChange("methode", value)}
            options={methodeOptions}
            placeholder="Sélectionnez une méthode"
          />
          <TextField
            label="Précision méthode"
            value={form.precision_methode}
            onChangeText={(value) => handleChange("precision_methode", value)}
            placeholder="Précisez la méthode"
          />
          <TextField
            label="Nature du produit"
            value={form.nature_produit}
            onChangeText={(value) => handleChange("nature_produit", value)}
            placeholder="Entrez la nature du produit"
          />
          <TextField
            label="Quantité fournie"
            value={form.quantite_fournie}
            onChangeText={(value) => handleChange("quantite_fournie", value)}
            placeholder="Entrez la quantité"
            inputProps={{ keyboardType: "numeric" }}
          />
          {form.renouvellement === false && (
            <TextField
              label="Si arrêt, précisez"
              value={form.si_arret}
              onChangeText={(value) => handleChange("si_arret", value)}
              placeholder="Raison de l'arrêt"
            />
          )}
          <TextField
            label="Arrêt"
            value={form.arret}
            onChangeText={(value) => handleChange("arret", value)}
            placeholder="Détails sur l'arrêt"
          />
        </View>
      ),
    },
    {
      title: "Suivi et prévention",
      component: (
        <View>
          <TextField
            label="Counseling PF"
            value={form.counseling_pf}
            onChangeText={(value) => handleChange("counseling_pf", value)}
            placeholder="Détails du counseling"
          />
          <TextField
            label="Besoin d'analyse"
            value={form.besoin_analyse}
            onChangeText={(value) => handleChange("besoin_analyse", value)}
            placeholder="Analyses nécessaires"
          />
          <CheckboxField
            label="Moustiquaire imprégnée"
            checked={form.moustiquaire_impregnee}
            onValueChange={(value) => handleChange("moustiquaire_impregnee", value)}
          />
          <CheckboxField
            label="Référencement interne"
            checked={form.referencement_interne}
            onValueChange={(value) => handleChange("referencement_interne", value)}
          />
          <CheckboxField
            label="Complément d'information"
            checked={form.complement_information}
            onValueChange={(value) => handleChange("complement_information", value)}
          />
        </View>
      ),
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Header title={isEditing ? "Modifier une consultation de planning" : "Ajouter une consultation de planning"} />
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

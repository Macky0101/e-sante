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
import cpnService from "../../services/cpnService"
import patientService from "../../services/patientService"

// Options pour le groupe sanguin
const groupeSanguinOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
]

// Options pour le VAT (Vaccin Anti-Tétanique)
const tetanosOptions = [
  { value: "VAT1", label: "VAT1" },
  { value: "VAT2", label: "VAT2" },
  { value: "VAT3", label: "VAT3" },
  { value: "VAT4", label: "VAT4" },
  { value: "VAT5", label: "VAT5" },
]

// Options pour le TPI (Traitement Préventif Intermittent)
const tpiOptions = [
  { value: "1ère dose", label: "1ère dose" },
  { value: "2ème dose", label: "2ème dose" },
  { value: "3ème dose", label: "3ème dose" },
  { value: "4ème dose", label: "4ème dose" },
]

export default function CpnFormScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const cpnId = params.id
  const patientId = params.patientId
  const isEditing = !!cpnId

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
      genre: 2, // Par défaut femme pour CPN
    },
    date_visite: new Date().toISOString().split("T")[0],
    gest: "",
    parite: "",
    taille: "",
    trimestre1: false,
    trimestre2: false,
    trimestre3: false,
    dernier_mois: false,
    gare: false,
    age: "",
    parite_sup: false,
    cesarienne: false,
    mort_ne: false,
    drepanocytose: false,
    hta_connu: false,
    autre_facteur: "",
    coloration: false,
    date_regle: "",
    semaine: "",
    anemie: false,
    omi: false,
    ictere: false,
    saignement: false,
    vomissement: false,
    foetale: "",
    poids: "",
    imc: "",
    ta_min: "",
    ta_max: "",
    temperature: "",
    hu: "",
    col: "",
    bdc: false,
    ma: false,
    tdr_palu: false,
    precision: "",
    albumine: "",
    sucre: "",
    tdr_vih: "",
    groupe_sanguin: "",
    groupe_rehsus: false,
    test_hemmel: false,
    bw: false,
    serologie: "",
    presence_igm: false,
    presence_icg: false,
    serologie_rubéole: "",
    resultat: false,
    presence_igm1: false,
    presence_igm2: false,
    hbs: false,
    vitamineA: false,
    faf: false,
    tetanos: "",
    tpi: "",
    moustiquaire: false,
    deparasitage: false,
    tpme: false,
    counseling: "",
    reference: "",
    complement_information: "",
    medicament: 0,
  })

  // Charger les données de la consultation prénatale si en mode édition
  useEffect(() => {
    if (isEditing) {
      loadCpn()
    } else if (patientId) {
      // Si un ID de patient est fourni, charger les données du patient
      loadPatient()
    }
  }, [isEditing, patientId])

  const loadCpn = async () => {
    try {
      showLoading("Chargement des données de la consultation prénatale...")
      const cpn = await cpnService.getCpnById(cpnId)
      setForm({
        numero_dossier: cpn.numero_dossier || "",
        patient: cpn.patient || { id: "", nom: "", prenom: "", date_naissance: "", genre: 2 },
        date_visite: cpn.date_visite || new Date().toISOString().split("T")[0],
        gest: cpn.gest ? cpn.gest.toString() : "",
        parite: cpn.parite ? cpn.parite.toString() : "",
        taille: cpn.taille ? cpn.taille.toString() : "",
        trimestre1: cpn.trimestre1 || false,
        trimestre2: cpn.trimestre2 || false,
        trimestre3: cpn.trimestre3 || false,
        dernier_mois: cpn.dernier_mois || false,
        gare: cpn.gare || false,
        age: cpn.age ? cpn.age.toString() : "",
        parite_sup: cpn.parite_sup || false,
        cesarienne: cpn.cesarienne || false,
        mort_ne: cpn.mort_ne || false,
        drepanocytose: cpn.drepanocytose || false,
        hta_connu: cpn.hta_connu || false,
        autre_facteur: cpn.autre_facteur || "",
        coloration: cpn.coloration || false,
        date_regle: cpn.date_regle || "",
        semaine: cpn.semaine ? cpn.semaine.toString() : "",
        anemie: cpn.anemie || false,
        omi: cpn.omi || false,
        ictere: cpn.ictere || false,
        saignement: cpn.saignement || false,
        vomissement: cpn.vomissement || false,
        foetale: cpn.foetale || "",
        poids: cpn.poids ? cpn.poids.toString() : "",
        imc: cpn.imc ? cpn.imc.toString() : "",
        ta_min: cpn.ta_min ? cpn.ta_min.toString() : "",
        ta_max: cpn.ta_max ? cpn.ta_max.toString() : "",
        temperature: cpn.temperature ? cpn.temperature.toString() : "",
        hu: cpn.hu ? cpn.hu.toString() : "",
        col: cpn.col ? cpn.col.toString() : "",
        bdc: cpn.bdc || false,
        ma: cpn.ma || false,
        tdr_palu: cpn.tdr_palu || false,
        precision: cpn.precision || "",
        albumine: cpn.albumine || "",
        sucre: cpn.sucre || "",
        tdr_vih: cpn.tdr_vih || "",
        groupe_sanguin: cpn.groupe_sanguin || "",
        groupe_rehsus: cpn.groupe_rehsus || false,
        test_hemmel: cpn.test_hemmel || false,
        bw: cpn.bw || false,
        serologie: cpn.serologie || "",
        presence_igm: cpn.presence_igm || false,
        presence_icg: cpn.presence_icg || false,
        serologie_rubéole: cpn.serologie_rubéole || "",
        resultat: cpn.resultat || false,
        presence_igm1: cpn.presence_igm1 || false,
        presence_igm2: cpn.presence_igm2 || false,
        hbs: cpn.hbs || false,
        vitamineA: cpn.vitamineA || false,
        faf: cpn.faf || false,
        tetanos: cpn.tetanos || "",
        tpi: cpn.tpi || "",
        moustiquaire: cpn.moustiquaire || false,
        deparasitage: cpn.deparasitage || false,
        tpme: cpn.tpme || false,
        counseling: cpn.counseling || "",
        reference: cpn.reference || "",
        complement_information: cpn.complement_information || "",
        medicament: cpn.medicament || 0,
      })
    } catch (error) {
      toast.showError(`Erreur lors du chargement de la consultation prénatale: ${error.message}`)
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
          genre: patient.genre || 2,
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
        await cpnService.updateCpn(cpnId, form)
        toast.showSuccess("Consultation prénatale mise à jour avec succès")
      } else {
        await cpnService.createCpn(form)
        toast.showSuccess("Consultation prénatale créée avec succès")
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
            value={form.date_visite}
            onChangeText={(value) => handleChange("date_visite", value)}
            placeholder="AAAA-MM-JJ"
            required
          />
          <TextField
            label="Âge"
            value={form.age}
            onChangeText={(value) => handleChange("age", value)}
            placeholder="Entrez l'âge"
            inputProps={{ keyboardType: "numeric" }}
          />
        </View>
      ),
    },
    {
      title: "Antécédents obstétricaux",
      component: (
        <View>
          <TextField
            label="Gestité"
            value={form.gest}
            onChangeText={(value) => handleChange("gest", value)}
            placeholder="Nombre de grossesses"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="Parité"
            value={form.parite}
            onChangeText={(value) => handleChange("parite", value)}
            placeholder="Nombre d'accouchements"
            inputProps={{ keyboardType: "numeric" }}
          />
          <CheckboxField
            label="Parité supérieure à 6"
            checked={form.parite_sup}
            onValueChange={(value) => handleChange("parite_sup", value)}
          />
          <CheckboxField
            label="Antécédent de césarienne"
            checked={form.cesarienne}
            onValueChange={(value) => handleChange("cesarienne", value)}
          />
          <CheckboxField
            label="Antécédent de mort-né"
            checked={form.mort_ne}
            onValueChange={(value) => handleChange("mort_ne", value)}
          />
          <CheckboxField
            label="Drépanocytose"
            checked={form.drepanocytose}
            onValueChange={(value) => handleChange("drepanocytose", value)}
          />
          <CheckboxField
            label="HTA connue"
            checked={form.hta_connu}
            onValueChange={(value) => handleChange("hta_connu", value)}
          />
          <TextField
            label="Autres facteurs de risque"
            value={form.autre_facteur}
            onChangeText={(value) => handleChange("autre_facteur", value)}
            placeholder="Précisez les autres facteurs"
          />
        </View>
      ),
    },
    {
      title: "Grossesse actuelle",
      component: (
        <View>
          <TextField
            label="Date des dernières règles"
            value={form.date_regle}
            onChangeText={(value) => handleChange("date_regle", value)}
            placeholder="AAAA-MM-JJ"
          />
          <TextField
            label="Semaine d'aménorrhée"
            value={form.semaine}
            onChangeText={(value) => handleChange("semaine", value)}
            placeholder="Nombre de semaines"
            inputProps={{ keyboardType: "numeric" }}
          />
          <CheckboxField
            label="Premier trimestre"
            checked={form.trimestre1}
            onValueChange={(value) => handleChange("trimestre1", value)}
          />
          <CheckboxField
            label="Deuxième trimestre"
            checked={form.trimestre2}
            onValueChange={(value) => handleChange("trimestre2", value)}
          />
          <CheckboxField
            label="Troisième trimestre"
            checked={form.trimestre3}
            onValueChange={(value) => handleChange("trimestre3", value)}
          />
          <CheckboxField
            label="Dernier mois"
            checked={form.dernier_mois}
            onValueChange={(value) => handleChange("dernier_mois", value)}
          />
          <CheckboxField
            label="Grossesse à risque élevé"
            checked={form.gare}
            onValueChange={(value) => handleChange("gare", value)}
          />
          <CheckboxField
            label="Anémie"
            checked={form.anemie}
            onValueChange={(value) => handleChange("anemie", value)}
          />
          <CheckboxField
            label="Œdèmes des membres inférieurs"
            checked={form.omi}
            onValueChange={(value) => handleChange("omi", value)}
          />
          <CheckboxField
            label="Ictère"
            checked={form.ictere}
            onValueChange={(value) => handleChange("ictere", value)}
          />
          <CheckboxField
            label="Saignement"
            checked={form.saignement}
            onValueChange={(value) => handleChange("saignement", value)}
          />
          <CheckboxField
            label="Vomissements"
            checked={form.vomissement}
            onValueChange={(value) => handleChange("vomissement", value)}
          />
          <TextField
            label="Mouvements fœtaux"
            value={form.foetale}
            onChangeText={(value) => handleChange("foetale", value)}
            placeholder="Présent/Absent"
          />
        </View>
      ),
    },
    {
      title: "Examen clinique",
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
            label="Température (°C)"
            value={form.temperature}
            onChangeText={(value) => handleChange("temperature", value)}
            placeholder="Entrez la température"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="Hauteur utérine (cm)"
            value={form.hu}
            onChangeText={(value) => handleChange("hu", value)}
            placeholder="Entrez la hauteur utérine"
            inputProps={{ keyboardType: "numeric" }}
          />
          <TextField
            label="Col (cm)"
            value={form.col}
            onChangeText={(value) => handleChange("col", value)}
            placeholder="Dilatation du col"
            inputProps={{ keyboardType: "numeric" }}
          />
          <CheckboxField
            label="Bruits du cœur fœtal"
            checked={form.bdc}
            onValueChange={(value) => handleChange("bdc", value)}
          />
          <CheckboxField
            label="Coloration des muqueuses"
            checked={form.coloration}
            onValueChange={(value) => handleChange("coloration", value)}
          />
        </View>
      ),
    },
    {
      title: "Examens complémentaires",
      component: (
        <View>
          <CheckboxField
            label="TDR Palu"
            checked={form.tdr_palu}
            onValueChange={(value) => handleChange("tdr_palu", value)}
          />
          {form.tdr_palu && (
            <TextField
              label="Précision si positif"
              value={form.precision}
              onChangeText={(value) => handleChange("precision", value)}
              placeholder="Précisez"
            />
          )}
          <TextField
            label="Albumine"
            value={form.albumine}
            onChangeText={(value) => handleChange("albumine", value)}
            placeholder="Résultat"
          />
          <TextField
            label="Sucre"
            value={form.sucre}
            onChangeText={(value) => handleChange("sucre", value)}
            placeholder="Résultat"
          />
          <TextField
            label="TDR VIH"
            value={form.tdr_vih}
            onChangeText={(value) => handleChange("tdr_vih", value)}
            placeholder="Résultat"
          />
          <SelectField
            label="Groupe sanguin"
            value={form.groupe_sanguin}
            onValueChange={(value) => handleChange("groupe_sanguin", value)}
            options={groupeSanguinOptions}
            placeholder="Sélectionnez un groupe"
          />
          <CheckboxField
            label="Rhésus positif"
            checked={form.groupe_rehsus}
            onValueChange={(value) => handleChange("groupe_rehsus", value)}
          />
          <CheckboxField
            label="Test d'Emmel"
            checked={form.test_hemmel}
            onValueChange={(value) => handleChange("test_hemmel", value)}
          />
          <CheckboxField label="BW (Syphilis)" checked={form.bw} onValueChange={(value) => handleChange("bw", value)} />
          <TextField
            label="Sérologie"
            value={form.serologie}
            onChangeText={(value) => handleChange("serologie", value)}
            placeholder="Résultat"
          />
        </View>
      ),
    },
    {
      title: "Prévention et traitement",
      component: (
        <View>
          <CheckboxField
            label="Vitamine A"
            checked={form.vitamineA}
            onValueChange={(value) => handleChange("vitamineA", value)}
          />
          <CheckboxField
            label="Fer et acide folique"
            checked={form.faf}
            onValueChange={(value) => handleChange("faf", value)}
          />
          <SelectField
            label="Vaccin anti-tétanique"
            value={form.tetanos}
            onValueChange={(value) => handleChange("tetanos", value)}
            options={tetanosOptions}
            placeholder="Sélectionnez une dose"
          />
          <SelectField
            label="TPI (Traitement Préventif Intermittent)"
            value={form.tpi}
            onValueChange={(value) => handleChange("tpi", value)}
            options={tpiOptions}
            placeholder="Sélectionnez une dose"
          />
          <CheckboxField
            label="Moustiquaire imprégnée"
            checked={form.moustiquaire}
            onValueChange={(value) => handleChange("moustiquaire", value)}
          />
          <CheckboxField
            label="Déparasitage"
            checked={form.deparasitage}
            onValueChange={(value) => handleChange("deparasitage", value)}
          />
          <CheckboxField
            label="TPME (Transmission Parent-Enfant)"
            checked={form.tpme}
            onValueChange={(value) => handleChange("tpme", value)}
          />
          <TextField
            label="Counseling"
            value={form.counseling}
            onChangeText={(value) => handleChange("counseling", value)}
            placeholder="Détails du counseling"
          />
          <TextField
            label="Référence"
            value={form.reference}
            onChangeText={(value) => handleChange("reference", value)}
            placeholder="Détails de la référence"
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
      <Header title={isEditing ? "Modifier une consultation prénatale" : "Ajouter une consultation prénatale"} />
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

import { useState, useEffect } from "react"
import { View, StyleSheet,Text,TextInput } from "react-native"
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
import { CheckBox } from "react-native-web"
import { Dropdown, MultiSelect } from "react-native-element-dropdown"
 

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
const analysesOptions = [
  { label: 'Glycémie', value: 'glycemie' },
  { label: 'Hémoglobine', value: 'hemoglobine' },
  { label: 'Bilan urinaire', value: 'bilan_urinaire' },
  { label: 'CRP', value: 'crp' },
  { label: 'Échographie', value: 'echo' },
  { label: 'Autre', value: 'autre' },
];
const medicamentsOptions = [
  { label: 'Paracétamol', value: 'paracetamol' },
  { label: 'Amoxicilline', value: 'amoxicilline' },
  { label: 'Fer', value: 'fer' },
  { label: 'Vitamine B9', value: 'vit_b9' },
  { label: 'Ibuprofène', value: 'ibuprofene' },
  { label: 'Autre', value: 'autre' },
];

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

const data = [
  { label: 'Anémie', value: 'anemie' },
  { label: 'Hypertension', value: 'hta' },
  { label: 'Diabète', value: 'diabete' },
  { label: 'Pré-éclampsie', value: 'pre_eclampsie' },
];
const acteOptions = [
  { label: 'Pansement', value: 'pansement' },
  { label: 'Suture', value: 'suture' },
  { label: 'Incision', value: 'incision' },
  { label: 'Infiltration', value: 'infiltration' },
  { label: 'Immobilisation', value: 'immobilisation' },
  { label: 'Ponction', value: 'ponction' },
  { label: 'Drainage', value: 'drainage' },
  { label: 'Autre', value: 'autre' },
];
const causeOptions = [
  { label: 'Préciser', value: 'preciser' },
  { label: 'Diagnostic', value: 'diagnostic' },
  { label: 'Néo-natal', value: 'neo-natal' },
  { label: 'Autre', value: 'autre' },
];
export default function ConsultationsFormScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const ConsultationsId = params.id
  const patientId = params.patientId
  const isEditing = !!ConsultationsId

  const toast = useToast()
  const { showLoading, hideLoading } = useLoading()
  const [loading, setLoading] = useState(false);
  const [diagnostics, setDiagnostics] = useState([]);
  

  // État du formulaire
  const [form, setForm] = useState({
    numero_dossier: "",
    patient: {
      id: "",
      nom: "",
      prenom: "",
      date_naissance: "",
      genre: 2, // Par défaut femme pour Consultations
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
      title: "Participations aux programmes",
      component: (
        <View style={{ gap: 16 }}>
          {/* Groupe 1 */}
          <View style={{ padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}>
            
      
            <CheckboxField
              label="PTME"
              checked={form.parite_sup}
              onValueChange={(value) => handleChange("parite_sup", value)}
            />
            <CheckboxField
              label="URENAM"
              checked={form.cesarienne}
              onValueChange={(value) => handleChange("cesarienne", value)}
            />
            <CheckboxField
              label="URENAS"
              checked={form.mort_ne}
              onValueChange={(value) => handleChange("mort_ne", value)}
            />
          </View>
      
          {/* Groupe 2 */}
          <View style={{ padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}>
           
      
            <CheckboxField
              label="Tuberculose"
              checked={form.drepanocytose}
              onValueChange={(value) => handleChange("drepanocytose", value)}
            />
            <CheckboxField
              label="VIH"
              checked={form.hta_connu}
              onValueChange={(value) => handleChange("hta_connu", value)}
            />
            <CheckboxField
              label="Hépatite"
              checked={form.diabete_connu}
              onValueChange={(value) => handleChange("diabete_connu", value)}
            />
            <CheckboxField
              label="URENI"
              checked={form.autre_pathologie}
              onValueChange={(value) => handleChange("autre_pathologie", value)}
            />
          </View>
        </View>
      ),
      
    },
    {
      title: "Antécédent",
      component: (
        <View>
          <TextField
          label="Médicaux / Allergies"
          value={form.allergies}
          onChangeText={(value) => handleChange("allergies", value)}
          multiline={true}
          numberOfLines={4}
          inputProps={{
            placeholder: "Décrire les antécédents médicaux, allergies, traitements en cours...",
            textAlignVertical: "top",
          }}
        />

        <TextField
          label="Chirurgicaux / Trauma"
          value={form.chirurgie_trauma}
          onChangeText={(value) => handleChange("chirurgie_trauma", value)}
          multiline={true}
          numberOfLines={4}
          inputProps={{
            placeholder: "Opérations, traumatismes, fractures, etc.",
            textAlignVertical: "top",
            scrollEnabled: false,
          }}
        />
          <TextField
          label="Gyn/Obst"
          value={form.motif_consultation}
          onChangeText={(value) => handleChange("motif_consultation", value)}
          multiline={true}
          numberOfLines={5}
          inputProps={{
        
            textAlignVertical: "top",
            scrollEnabled: false,
          }}
        />
    
          
          <TextField
            label="Mode de vie"
            value={form.mode_vie}
            onChangeText={(value) => handleChange("mode_vie", value)}
            multiline={true}
            numberOfLines={4}
            inputProps={{
              placeholder: "Habitudes alimentaires, activité physique, consommation (alcool, tabac...), etc.",
              textAlignVertical: "top",
              scrollEnabled: false,
            }}
          />

        </View>
      ),
    },
    {
      title: "Consultation",
      component: (
        <View>
          <TextField
            label="Date consultation"
            value={form.taille}
            onChangeText={(value) => handleChange("taille", value)}
            placeholder="Entrez la taille"
       
          />
            <CheckboxField
              label="Femme enceinte"
              checked={form.parite_sup}
              onValueChange={(value) => handleChange("parite_sup", value)}
            />
          <TextField
          label="Motif de la consultation et examen clinique"
          value={form.motif}
          onChangeText={(value) => handleChange("allergies", value)}
          multiline={true}
          numberOfLines={4}
          inputProps={{
            placeholder: "Décrire les motifs...",
            textAlignVertical: "top",
          }}
        />
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
              <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <TextField
                  label="TA minimale (mmHg)"
                  value={form.ta_min}
                  onChangeText={(value) => handleChange("ta_min", value)}
                  placeholder="Min"
                  inputProps={{ keyboardType: "numeric" }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <TextField
                  label="TA maximale (mmHg)"
                  value={form.ta_max}
                  onChangeText={(value) => handleChange("ta_max", value)}
                  placeholder="Max"
                  inputProps={{ keyboardType: "numeric" }}
                />
              </View>
          </View>
          <TextField
            label="IMC"
            value={form.imc}
            onChangeText={(value) => handleChange("imc", value)}
            placeholder="Indice de masse corporelle"
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
            label="% SpO2"
            value={form.hu}
            onChangeText={(value) => handleChange("hu", value)}
            placeholder="Entrez la valeur"
            inputProps={{ keyboardType: "numeric" }}
          />
         <TextField
            label="Décisions"
            value={form.decisions}
            onChangeText={(value) => handleChange("decisions", value)}
            multiline={true}
            numberOfLines={4}
            inputProps={{
              placeholder: "Indiquez les décisions médicales prises, orientations, recommandations...",
              textAlignVertical: "top",
              scrollEnabled: false,
            }}
          />

          <TextField
            label="Prescriptions"
            value={form.prescriptions}
            onChangeText={(value) => handleChange("prescriptions", value)}
            multiline={true}
            numberOfLines={4}
            inputProps={{
              placeholder: "Traitements prescrits, posologie, durée, etc.",
              textAlignVertical: "top",
              scrollEnabled: false,
            }}
          />
 
 <MultiSelect
  style={{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16, // ✅ Espace entre les deux champs
  }}
  data={data}
  labelField="label"
  valueField="value"
  placeholder="Sélectionner les diagnostics"
  value={diagnostics}
  onChange={(item) => {
    setDiagnostics(item);
    handleChange('diagnostics', item);
  }}
  selectedStyle={{ backgroundColor: '#eee' }}
/>

<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
  <View style={{ flex: 1 }}>
    <CheckboxField
      label="Déjà venu pour ce motif ?"
      checked={form.coloration}
      onValueChange={(value) => handleChange("coloration", value)}
    />
  </View>

  <View style={{ flex: 1 }}>
    <CheckboxField
      label="Sévérité"
      checked={form.severite}
      onValueChange={(value) => handleChange("severite", value)}
    />
  </View>
</View>
<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
  <View style={{ flex: 1 }}>
    <CheckboxField
      label="C"
      checked={form.coloration}
      onValueChange={(value) => handleChange("coloration", value)}
    />
  </View>

  <View style={{ flex: 1 }}>
    <CheckboxField
      label="Ordo"
      checked={form.severite}
      onValueChange={(value) => handleChange("severite", value)}
    />
    
  </View>
</View>
<Dropdown
  style={{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 10,
    marginBottom:10
  }}
  data={acteOptions}
  labelField="label"
  valueField="value"
  placeholder="Acte à préciser"
  value={form.acte}
  onChange={(item) => handleChange("acte", item.value)}
/>
<CheckboxField
      label="CM/Hospitalisation"
      checked={form.coloration}
      onValueChange={(value) => handleChange("coloration", value)}
    />
<View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', gap: 4 }}>
  <View style={{ flex: 1 }}>
    <CheckboxField
      label="Référé"
      checked={form.refere}
      onValueChange={(value) => handleChange("refere", value)}
    />
  </View>
  <View style={{ flex: 1 }}>
    <CheckboxField
      label="Evacué"
      checked={form.evacué}
      onValueChange={(value) => handleChange("evacué", value)}
    />
  </View>
  <View style={{ flex: 1 }}>
    <CheckboxField
      label="DCD"
      checked={form.decede}
      onValueChange={(value) => handleChange("decede", value)}
    />
  </View>
</View>

{/* Affiche le champ cause si DCD est coché */}
{form.decede && (
  <View style={{ marginTop: 12 }}>
    <Text style={{ marginBottom: 6, fontWeight: "500" }}>Cause du décès</Text>
    <Dropdown
      style={{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 12,
      }}
      data={causeOptions}
      labelField="label"
      valueField="value"
      placeholder="Sélectionner la cause"
      value={form.cause_deces}
      onChange={(item) => handleChange("cause_deces", item.value)}
    />
  </View>
)}

{/* Affiche un champ de saisie si "autre" est sélectionné */}
{form.decede && form.cause_deces === "autre" && (
  <TextInput
    style={{
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginTop: 12,
    }}
    placeholder="Préciser la cause"
    value={form.autre_cause}
    onChangeText={(value) => handleChange("autre_cause", value)}
  />
)}

        </View>
      ),
    },
    {
      title: "Analyses ",
      component: (
        <View style={{ gap: 12 }}>
          <MultiSelect
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              padding: 10,
            }}
            data={analysesOptions}
            labelField="label"
            valueField="value"
            placeholder="Sélectionner les analyses"
            value={form.analyses}
            onChange={(item) => {
              setForm({ ...form, analyses: item });
              handleChange("analyses", item);
            }}
            selectedStyle={{ backgroundColor: '#eee' }}
          />
    
          {/* Champ de saisie si "autre" est sélectionné */}
          {form.analyses?.includes("autre") && (
            <TextInput
              placeholder="Préciser les autres analyses"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 12,
              }}
              value={form.autre_analyse}
              onChangeText={(value) => handleChange("autre_analyse", value)}
            />
          )}
           <MultiSelect
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
        }}
        data={medicamentsOptions}
        labelField="label"
        valueField="value"
        placeholder="Sélectionner les médicaments"
        value={form.medicaments}
        onChange={(item) => {
          setForm({ ...form, medicaments: item });
          handleChange("medicaments", item);
        }}
        selectedStyle={{ backgroundColor: '#eee' }}
      />

      {/* Champ de texte si "Autre" est sélectionné */}
      {form.medicaments?.includes("autre") && (
        <TextInput
          placeholder="Préciser les autres médicaments"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 12,
          }}
          value={form.autre_medicament}
          onChangeText={(value) => handleChange("autre_medicament", value)}
        />
      )}
            <CheckboxField
        label="Transfusion"
        checked={form.transfusion}
        onValueChange={(value) => handleChange("transfusion", value)}
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

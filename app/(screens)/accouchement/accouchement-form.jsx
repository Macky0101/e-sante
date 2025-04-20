import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import CheckboxField from "../../components/form/CheckboxField";
import TextField from "../../components/form/TextField";
import Header from "../../components/header/Header";
import Button from "../../components/buttons/Button";

export default function AccouchementForm() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;

  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    heure: { hour: 0, minute: 0 },
    nombreEnfantVivant: 1,
    intervalGrossesses: "",
    precedenteNaissanceVivante: "",
    avortement: false,
    methodeAvortement: "",
    lieuAccouchement: "centre",
    naissancesMultiples: false,
    naissancePrematuree: false,
    accouchementNecessiteVentouses: false,
    forcep: false,
    cesarienne: false,
    perfusionOcytocique: false,
    gestionActive: false,
    hemorragiePPI: false,
    vitamineA: false,
    deparasitage: false,
    ferAcideFolique: false,
    enfantNe: "",
    frequence: "",
    dureeContraction: "",
    colDilatation: "5",
    rupturePouche: false,
    liquideAmniotique: "clair",
    natureDosage: "",
    priseDecision: "garder",
    commentaire: "",
    naissanceMultiple: 1,
    motifRefecence: ""
  });

  // Options pour les menus déroulants
  const frequenceOptions = [
    { label: "≤ 2 contractions/10min", value: "≤2" },
    { label: "Entre 2 et 5 contractions/10min", value: "2-5" },
    { label: "> 5 contractions/10min", value: ">5" }
  ];

  const liquideAmniotiqueOptions = [
    { label: "Clair", value: "clair" },
    { label: "Sanguinolant", value: "sanguinolant" },
    { label: "Méconial", value: "méconial" }
  ];
  const dureeOptions = [
    { label: "Inférieur à 20s", value: "<20" },
    { label: "Entre 20 et 60s", value: "20-60" },
    { label: "Supérieur à 60s", value: ">60" }
  ];

  const dilatationOptions = [
    { label: "5 cm", value: "5" },
    { label: "6 cm", value: "6" },
    { label: "7 cm", value: "7" },
    { label: "8 cm", value: "8" },
    { label: "9 cm", value: "9" },
    { label: "10 cm", value: "10" }
  ];

  const liquideOptions = [
    { label: "Clair", value: "clair" },
    { label: "Sanguinolant", value: "sanguinolant" },
    { label: "Méconial", value: "méconial" }
  ];

  const ruptureOptions = [
    { label: "< 12 heures", value: "<12" },
    { label: "> 12 heures", value: ">12" }
  ];

  const decisionOptions = [
    { label: "Garder", value: "garder" },
    { label: "Référer", value: "reférer" },
    { label: "Evacuer", value: "evacuer" }
  ];

  const lieuOptions = [
    { label: "Centre", value: "centre" },
    { label: "En cours de route", value: "route" },
    { label: "Domicile", value: "domicile" }
  ];

  const motifOptions = [
    { label: "Interne", value: "interne" },
    { label: "Externe", value: "externe" }
  ];

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Logique de soumission
    console.log(form);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Formulaire d'Accouchement" 
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Section Informations de base */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de base</Text>
          
          <TextField
            label="Numéro de dossier"
            value={form.numeroDossier}
            onChangeText={(value) => handleChange("numeroDossier", value)}
          />

          <TextField
            label="Date"
            value={form.date}
            onChangeText={(value) => handleChange("date", value)}
            inputProps={{ keyboardType: "numeric" }}
          />

          <View style={styles.row}>
            <View style={styles.inputHalf}>
              <TextField
                label="Heure (h)"
                value={form.heure.hour.toString()}
                onChangeText={(value) => handleChange("heure", {...form.heure, hour: parseInt(value) || 0})}
                inputProps={{ keyboardType: "numeric" }}
              />
            </View>
            <View style={styles.inputHalf}>
              <TextField
                label="Minute (m)"
                value={form.heure.minute.toString()}
                onChangeText={(value) => handleChange("heure", {...form.heure, minute: parseInt(value) || 0})}
                inputProps={{ keyboardType: "numeric" }}
              />
            </View>
          </View>
        </View>

        {/* Section Antécédents obstétricaux */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Antécédents obstétricaux</Text>
          
          <TextField
            label="Intervalle entre grossesses"
            value={form.intervalGrossesses}
            onChangeText={(value) => handleChange("intervalGrossesses", value)}
          />

          <TextField
            label="Dernière naissance vivante"
            value={form.precedenteNaissanceVivante}
            onChangeText={(value) => handleChange("precedenteNaissanceVivante", value)}
          />

          <CheckboxField
            label="Antécédent d'avortement"
            checked={form.avortement}
            onValueChange={(value) => handleChange("avortement", value)}
          />

          {form.avortement && (
            <TextField
              label="Méthode d'avortement"
              value={form.methodeAvortement}
              onChangeText={(value) => handleChange("methodeAvortement", value)}
            />
          )}
        </View>

        {/* Section Accouchement actuel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accouchement actuel</Text>
          
          <Dropdown
            style={styles.dropdown}
            data={lieuOptions}
            labelField="label"
            valueField="value"
            placeholder="Lieu d'accouchement"
            value={form.lieuAccouchement}
            onChange={(item) => handleChange("lieuAccouchement", item.value)}
          />

          <CheckboxField
            label="Naissance prématurée"
            checked={form.naissancePrematuree}
            onValueChange={(value) => handleChange("naissancePrematuree", value)}
          />

          <CheckboxField
            label="Accouchement nécessitant ventouses"
            checked={form.accouchementNecessiteVentouses}
            onValueChange={(value) => handleChange("accouchementNecessiteVentouses", value)}
          />

          <CheckboxField
            label="Forceps"
            checked={form.forcep}
            onValueChange={(value) => handleChange("forcep", value)}
          />

          <CheckboxField
            label="Césarienne"
            checked={form.cesarienne}
            onValueChange={(value) => handleChange("cesarienne", value)}
          />
        </View>

        {/* Section Contractions utérines */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contractions utérines</Text>
          
          <Dropdown
            style={styles.dropdown}
            data={frequenceOptions}
            labelField="label"
            valueField="value"
            placeholder="Fréquence en 10mn"
            value={form.frequence}
            onChange={(item) => handleChange("frequence", item.value)}
          />

          <Dropdown
            style={styles.dropdown}
            data={dureeOptions}
            labelField="label"
            valueField="value"
            placeholder="Durée de la contraction"
            value={form.dureeContraction}
            onChange={(item) => handleChange("dureeContraction", item.value)}
          />

          <Dropdown
            style={styles.dropdown}
            data={dilatationOptions}
            labelField="label"
            valueField="value"
            placeholder="Dilatation du col"
            value={form.colDilatation}
            onChange={(item) => handleChange("colDilatation", item.value)}
          />
        </View>

        {/* Section Rupture des membranes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rupture des membranes</Text>
          
          <CheckboxField
            label="Rupture de la poche des eaux"
            checked={form.rupturePouche}
            onValueChange={(value) => handleChange("rupturePouche", value)}
          />

          {form.rupturePouche && (
            <>
              <Dropdown
                style={styles.dropdown}
                data={ruptureOptions}
                labelField="label"
                valueField="value"
                placeholder="Depuis combien de temps ?"
                value={form.dureeRupture}
                onChange={(item) => handleChange("dureeRupture", item.value)}
              />

              <Dropdown
                style={styles.dropdown}
                data={liquideOptions}
                labelField="label"
                valueField="value"
                placeholder="Coloration du liquide amniotique"
                value={form.liquideAmniotique}
                onChange={(item) => handleChange("liquideAmniotique", item.value)}
              />
            </>
          )}
        </View>

        {/* Section Traitement et décision */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Traitement et décision</Text>
          
          <TextField
            label="Nature et dosage du traitement"
            value={form.natureDosage}
            onChangeText={(value) => handleChange("natureDosage", value)}
            multiline
          />

          <Dropdown
            style={styles.dropdown}
            data={decisionOptions}
            labelField="label"
            valueField="value"
            placeholder="Prise de décision"
            value={form.priseDecision}
            onChange={(item) => handleChange("priseDecision", item.value)}
          />

          <TextField
            label="Commentaire"
            value={form.commentaire}
            onChangeText={(value) => handleChange("commentaire", value)}
            multiline
          />
      </View>

        {/* Section Naissances multiples */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Naissances multiples</Text>
          
          <CheckboxField
            label="Naissances multiples"
            checked={form.naissancesMultiples}
            onValueChange={(value) => handleChange("naissancesMultiples", value)}
          />

          {form.naissancesMultiples && (
            <TextField
              label="Nombre d'enfants (2-10)"
              value={form.naissanceMultiple.toString()}
              onChangeText={(value) => {
                const num = Math.min(10, Math.max(2, parseInt(value) || 2));
                handleChange("naissanceMultiple", num);
              }}
              inputProps={{ keyboardType: "numeric" }}
            />
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nouveau-né</Text>
          
          <TextField
            label="Nombre d'enfants vivants"
            value={form.nombreEnfantVivant.toString()}
            onChangeText={(value) => handleChange("nombreEnfantVivant", parseInt(value) || 0)}
            keyboardType="numeric"
          />
        </View>
        {/* Section Traitements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Traitements</Text>
          
          <CheckboxField
            label="Perfusion d'ocytocique"
            checked={form.perfusionOcytocique}
            onValueChange={(value) => handleChange("perfusionOcytocique", value)}
          />

          <CheckboxField
            label="Gestion active"
            checked={form.gestionActive}
            onValueChange={(value) => handleChange("gestionActive", value)}
          />

          <CheckboxField
            label="Hémorragie PPI"
            checked={form.hemorragiePPI}
            onValueChange={(value) => handleChange("hemorragiePPI", value)}
          />

          <CheckboxField
            label="Vitamine A"
            checked={form.vitamineA}
            onValueChange={(value) => handleChange("vitamineA", value)}
          />

          <CheckboxField
            label="Déparasitage"
            checked={form.deparasitage}
            onValueChange={(value) => handleChange("deparasitage", value)}
          />

          <CheckboxField
            label="Fer + Acide Folique"
            checked={form.ferAcideFolique}
            onValueChange={(value) => handleChange("ferAcideFolique", value)}
          />
        </View>

        {/* Section Liquide amniotique */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Liquide amniotique</Text>
          
          <Dropdown
            style={styles.dropdown}
            data={liquideAmniotiqueOptions}
            labelField="label"
            valueField="value"
            placeholder="Coloration du liquide"
            value={form.liquideAmniotique}
            onChange={(item) => handleChange("liquideAmniotique", item.value)}
          />
        </View>
        {/* Section Référencement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Référencement</Text>
          
          <Dropdown
            style={styles.dropdown}
            data={motifOptions}
            labelField="label"
            valueField="value"
            placeholder="Motif de référence"
            value={form.motifRefecence}
            onChange={(item) => handleChange("motifRefecence", item.value)}
          />
        </View>

        {/* Bouton de soumission */}
        <View style={styles.buttonContainer}>
          <Button
            title="Enregistrer"
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2b7a78",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  inputHalf: {
    width: "48%",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 16,
  },
  submitButton: {
    backgroundColor: "#2b7a78",
  },
});
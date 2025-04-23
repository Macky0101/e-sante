import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import TextField from "../../components/form/TextField";
import Header from "../../components/header/Header";
import Button from "../../components/buttons/Button";

export default function VaccinationForm() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams();

  const [form, setForm] = useState({
    vaccin: "",
    dose: "",
    date: "",
    age: "",
    observation: "",
  });

  const vaccins = [
    { label: "BCG + Polio 0", value: "bcg_polio0" },
    { label: "Penta1 + Rota1 + PCV13 + VPO1", value: "penta1_combo" },
    { label: "Penta2 + Rota2 + PCV13 + VPO2", value: "penta2_combo" },
    { label: "Penta3 + Rota3 + PCV13 + VPO3", value: "penta3_combo" },
    { label: "VAR1", value: "var1" },
    { label: "VAR2", value: "var2" },
    { label: "VAA", value: "vaa" },
    { label: "MILD", value: "mild" },
    { label: "MenAfriVac", value: "menafrivac" },
    { label: "HPV1", value: "hpv1" },
    { label: "HPV2", value: "hpv2" },
    { label: "ALBENDAZOLE", value: "albendazole" },
    { label: "Td1", value: "td1" },
    { label: "Td2", value: "td2" },
    { label: "Td-R1", value: "tdr1" },
    { label: "Td-R2", value: "tdr2" },
    { label: "Td-R3", value: "tdr3" },
  ];

  const doses = [
    { label: "1ère dose", value: "1" },
    { label: "2ème dose", value: "2" },
    { label: "3ème dose", value: "3" },
    { label: "Rappel", value: "rappel" },
  ];

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Vaccination enregistrée :", form);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Formulaire de vaccination"
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vaccin</Text>
          <Dropdown
            style={styles.dropdown}
            data={vaccins}
            labelField="label"
            valueField="value"
            placeholder="Sélectionner un vaccin"
            value={form.vaccin}
            onChange={(item) => handleChange("vaccin", item.value)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dose</Text>
          <Dropdown
            style={styles.dropdown}
            data={doses}
            labelField="label"
            valueField="value"
            placeholder="Sélectionner la dose"
            value={form.dose}
            onChange={(item) => handleChange("dose", item.value)}
          />
        </View>

        <View style={styles.section}>
          <TextField
            label="Âge de l’enfant / moment d'administration"
            value={form.age}
            onChangeText={(value) => handleChange("age", value)}
          />
        </View>

        <View style={styles.section}>
          <TextField
            label="Date de vaccination"
            value={form.date}
            onChangeText={(value) => handleChange("date", value)}
            inputProps={{ placeholder: "JJ/MM/AAAA" }}
          />
        </View>

        <View style={styles.section}>
          <TextField
            label="Observation"
            value={form.observation}
            onChangeText={(value) => handleChange("observation", value)}
            multiline
            numberOfLines={3}
            inputProps={{
              placeholder: "Remarques ou effets secondaires...",
              textAlignVertical: "top",
            }}
          />
        </View>

        <Button title="Enregistrer" onPress={handleSubmit} style={styles.submitButton} />
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
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: "#2b7a78",
  },
});

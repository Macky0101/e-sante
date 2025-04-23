import { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import CheckboxField from "../../components/form/CheckboxField";
import TextField from "../../components/form/TextField";
import Header from "../../components/header/Header";
import Button from "../../components/buttons/Button";

export default function AvortementForm() {
  const router = useRouter();
  const { patientId } = useLocalSearchParams();
  const [form, setForm] = useState({
    modeSurvenu: "",
    saa: false,
    modeEvacuation: "",
    traitementMedicamenteux: "",
  });

  const modesSurvenu = [
    { label: "Spontané", value: "spontane" },
    { label: "Provoqué", value: "provoque" },
    { label: "Molaire", value: "molaire" },
  ];

  const modesEvacuation = [
    { label: "AMIU", value: "amiu" },
    { label: "Curetage", value: "curetage" },
    { label: "Curage digital", value: "curage_digital" },
    { label: "Médicaments", value: "medicaments" },
  ];

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log(form);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Formulaire d'avortement"
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Section Mode de survenu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode de survenu</Text>
          
          <Dropdown
            style={styles.dropdown}
            data={modesSurvenu}
            labelField="label"
            valueField="value"
            placeholder="Sélectionner le mode"
            value={form.modeSurvenu}
            onChange={(item) => handleChange("modeSurvenu", item.value)}
          />
        </View>

        {/* Section Soins après avortement */}
        <View style={styles.section}>
          <CheckboxField
            label="Soins après avortement (SAA)"
            checked={form.saa}
            onValueChange={(value) => handleChange("saa", value)}
          />

          {form.saa && (
            <>
              <Dropdown
                style={[styles.dropdown, { marginTop: 16 }]}
                data={modesEvacuation}
                labelField="label"
                valueField="value"
                placeholder="Mode d'évacuation"
                value={form.modeEvacuation}
                onChange={(item) => handleChange("modeEvacuation", item.value)}
              />
            </>
          )}
        </View>

        {/* Section Traitement médicamenteux */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Traitement médicamenteux</Text>
          
          <TextField
            label="Prescription"
            value={form.traitementMedicamenteux}
            onChangeText={(value) => handleChange("traitementMedicamenteux", value)}
            multiline
            numberOfLines={4}
            inputProps={{
              placeholder: "Entrez le traitement prescrit...",
              textAlignVertical: "top",
            }}
          />
        </View>

        <Button
          title="Enregistrer"
          onPress={handleSubmit}
          style={styles.submitButton}
        />
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
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fr";

import Header from "../../components/header/Header";
import Button from "../../components/buttons/Button";
import LoadingIndicator from "../../components/loading/LoadingIndicator";
import { useToast } from "../../components/toast/ToastProvider";

moment.locale('fr');

export default function ConsultationDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;
  const { showToast } = useToast();

  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulation de données - À remplacer par votre appel API
  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        setLoading(true);
        // Exemple de données basées sur votre formulaire
        const mockData = {
          id,
          date: "2023-11-15T09:30:00",
          patient: "Jean Dupont",
          medecin: "Dr. Martin",
          programmes: ["PTME", "URENAM"],
          antecedents: {
            medicaux: "Allergie à la pénicilline",
            chirurgicaux: "Appendicectomie en 2010",
            gyneco: "Gravide 3, Para 2",
            mode_vie: "Non fumeur, alcool occasionnel"
          },
          consultation: {
            motif: "Douleurs abdominales",
            taille: 175,
            poids: 72,
            ta_min: 12,
            ta_max: 8,
            temperature: 37.2,
            spo2: 98,
            imc: 23.5,
            decisions: "Surveillance sous traitement",
            prescriptions: "Paracétamol 1g x 3/j pendant 5 jours",
            diagnostics: ["Infection urinaire", "Douleurs fonctionnelles"],
            acte: "ECBU"
          },
          analyses: ["NFS", "ECBU"],
          medicaments: ["Paracétamol", "Antispasmodique"]
        };
        
        setConsultation(mockData);
      } catch (error) {
        showToast("Erreur de chargement: " + error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultation();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Détails consultation" />
        <LoadingIndicator />
      </SafeAreaView>
    );
  }

  if (!consultation) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Détails consultation" />
        <View style={styles.notFound}>
          <Text>Consultation non trouvée</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Détails consultation" 
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Section Informations générales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations générales</Text>
          <InfoRow label="Date" value={moment(consultation.date).format('LL [à] LT')} />
          <InfoRow label="Médecin" value={consultation.medecin} />
          
          {consultation.programmes.length > 0 && (
            <InfoRow 
              label="Programmes" 
              value={consultation.programmes.join(", ")} 
            />
          )}
        </View>

        {/* Section Antécédents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Antécédents</Text>
          <InfoRow label="Médicaux/Allergies" value={consultation.antecedents.medicaux} />
          <InfoRow label="Chirurgicaux/Trauma" value={consultation.antecedents.chirurgicaux} />
          <InfoRow label="Gynéco/Obstétrique" value={consultation.antecedents.gyneco} />
          <InfoRow label="Mode de vie" value={consultation.antecedents.mode_vie} />
        </View>

        {/* Section Consultation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consultation</Text>
          <InfoRow label="Motif" value={consultation.consultation.motif} />
          
          <View style={styles.rowGroup}>
            <View style={styles.row}>
              <InfoRow label="Taille (cm)" value={consultation.consultation.taille} />
              <InfoRow label="Poids (kg)" value={consultation.consultation.poids} />
            </View>
            <View style={styles.row}>
              <InfoRow label="TA (mmHg)" value={`${consultation.consultation.ta_max}/${consultation.consultation.ta_min}`} />
              <InfoRow label="Température (°C)" value={consultation.consultation.temperature} />
            </View>
            <View style={styles.row}>
              <InfoRow label="SpO2 (%)" value={consultation.consultation.spo2} />
              <InfoRow label="IMC" value={consultation.consultation.imc} />
            </View>
          </View>
          
          <InfoRow label="Diagnostics" value={consultation.consultation.diagnostics.join(", ")} />
          <InfoRow label="Acte réalisé" value={consultation.consultation.acte} />
          <InfoRow label="Décisions" value={consultation.consultation.decisions} />
          <InfoRow label="Prescriptions" value={consultation.consultation.prescriptions} />
        </View>

        {/* Section Analyses/Médicaments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Examens complémentaires</Text>
          <InfoRow label="Analyses demandées" value={consultation.analyses.join(", ")} />
          <InfoRow label="Médicaments prescrits" value={consultation.medicaments.join(", ")} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Modifier" 
          onPress={() => router.push(`/consultations/${id}/edit`)}
          style={styles.button}
          icon="create-outline"
        />
      </View>
    </SafeAreaView>
  );
}

// Composant réutilisable pour afficher une ligne d'information
const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || "Non renseigné"}</Text>
  </View>
);

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
    paddingBottom: 100,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2b7a78",
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1.5,
    textAlign: "right",
  },
  rowGroup: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
  },
  button: {
    width: "100%",
  },
});
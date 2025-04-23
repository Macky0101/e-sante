import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import "moment/locale/fr";

import Header from "../../components/header/Header";
import Button from "../../components/buttons/Button";
import LoadingIndicator from "../../components/loading/LoadingIndicator";
import { useToast } from "../../components/toast/ToastProvider";

moment.locale('fr');

export default function AvortementDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { showToast } = useToast();

  const [avortement, setAvortement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvortement = async () => {
      try {
        setLoading(true);
        // À remplacer par un appel API
        const mockData = {
          id,
          date: "2024-12-12T09:00:00",
          medecin: "Dr. Ndiaye",
          modeSurvenu: "spontane",
          saa: true,
          modeEvacuation: "AMIU",
          traitementMedicamenteux: "Misoprostol 800μg",
          statut: "Terminé",
        };
        setAvortement(mockData);
      } catch (error) {
        showToast("Erreur de chargement : " + error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchAvortement();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Détail avortement" />
        <LoadingIndicator />
      </SafeAreaView>
    );
  }

  if (!avortement) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Détail avortement" />
        <View style={styles.notFound}>
          <Text>Avortement non trouvé</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getModeSurvenuLabel = (value) => {
    switch (value) {
      case "spontane":
        return "Spontané";
      case "provoque":
        return "Provoqué";
      case "molaire":
        return "Molaire";
      default:
        return value;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Détail avortement" 
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Section Informations générales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations générales</Text>
          <InfoRow label="Date" value={moment(avortement.date).format('LL [à] LT')} />
          <InfoRow label="Médecin" value={avortement.medecin} />
          <InfoRow label="Statut" value={avortement.statut} />
        </View>

        {/* Section Données cliniques */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Données cliniques</Text>
          <InfoRow label="Mode de survenue" value={getModeSurvenuLabel(avortement.modeSurvenu)} />
          <InfoRow label="Soins après avortement (SAA)" value={avortement.saa ? "Oui" : "Non"} />
          {avortement.saa && (
            <InfoRow label="Mode d'évacuation" value={avortement.modeEvacuation} />
          )}
          {avortement.traitementMedicamenteux && (
            <InfoRow label="Traitement médicamenteux" value={avortement.traitementMedicamenteux} />
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Modifier" 
          onPress={() => router.push(`/avortements/${id}/edit`)}
          style={styles.button}
          icon="create-outline"
        />
      </View>
    </SafeAreaView>
  );
}

// Composant réutilisable pour une ligne d’info
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

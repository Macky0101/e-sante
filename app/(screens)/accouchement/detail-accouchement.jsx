import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fr";

import Header from "../../components/header/Header";
import Button from "../../components/buttons/Button";
import LoadingIndicator from "../../components/loading/LoadingIndicator";
import { useToast } from "../../components/toast/ToastProvider";

moment.locale('fr');

export default function DetailAccouchement() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { showToast } = useToast();

  const [accouchement, setAccouchement] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulation de données - À remplacer par votre appel API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Exemple de données basées sur votre modèle
        const mockData = {
          id,
          date: "2023-11-15T09:30:00",
          numeroDossier: "AC-2023-1125",
          patient: {
            nom: "Diallo",
            prenom: "Aïssatou",
            age: 28
          },
          heure: { hour: 9, minute: 30 },
          nombreEnfantVivant: 1,
          intervalGrossesses: "2 ans",
          precedenteNaissanceVivante: "2021-08-15",
          avortement: false,
          lieuAccouchement: "centre",
          naissancesMultiples: false,
          naissancePrematuree: false,
          accouchementNecessiteVentouses: false,
          forcep: false,
          cesarienne: false,
          perfusionOcytocique: true,
          gestionActive: true,
          hemorragiePPI: false,
          vitamineA: true,
          deparasitage: true,
          ferAcideFolique: true,
          frequence: "3 contractions/10min",
          dureeContraction: "45 secondes",
          colDilatation: "8 cm",
          rupturePouche: true,
          dureeRupture: "6 heures",
          liquideAmniotique: "clair",
          natureDosage: "Ocytocine 5UI",
          priseDecision: "garder",
          commentaire: "Accouchement normal sans complications",
          complications: "Aucune",
          poidsEnfant: "3.2 kg",
          apgar: "9/10"
        };
        
        setAccouchement(mockData);
      } catch (error) {
        showToast("Erreur de chargement: " + error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Détails accouchement" />
        <LoadingIndicator />
      </SafeAreaView>
    );
  }

  if (!accouchement) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Détails accouchement" />
        <View style={styles.notFound}>
          <Text>Accouchement non trouvé</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Détails accouchement"
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Section Informations de base */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations générales</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>
              {moment(accouchement.date).format('LL')} à {accouchement.heure.hour}h{accouchement.heure.minute.toString().padStart(2, '0')}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>N° dossier:</Text>
            <Text style={styles.value}>{accouchement.numeroDossier}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Patiente:</Text>
            <Text style={styles.value}>{accouchement.patient.prenom} {accouchement.patient.nom} ({accouchement.patient.age} ans)</Text>
          </View>
        </View>

        {/* Section Détails accouchement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails de l'accouchement</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Lieu:</Text>
            <Text style={styles.value}>
              {accouchement.lieuAccouchement === 'centre' ? 'Centre de santé' : 
               accouchement.lieuAccouchement === 'route' ? 'En cours de route' : 'Domicile'}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Mode:</Text>
            <Text style={styles.value}>
              {accouchement.cesarienne ? 'Césarienne' : 'Voie basse'}
              {accouchement.forcep && ' avec forceps'}
              {accouchement.accouchementNecessiteVentouses && ' avec ventouse'}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Enfants vivants:</Text>
            <Text style={styles.value}>{accouchement.nombreEnfantVivant}</Text>
          </View>
          
          {accouchement.poidsEnfant && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Poids enfant:</Text>
              <Text style={styles.value}>{accouchement.poidsEnfant} kg</Text>
            </View>
          )}
          
          {accouchement.apgar && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Score Apgar:</Text>
              <Text style={styles.value}>{accouchement.apgar}</Text>
            </View>
          )}
        </View>

        {/* Section Dynamique utérine */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dynamique utérine</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Fréquence contractions:</Text>
            <Text style={styles.value}>{accouchement.frequence}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Durée contractions:</Text>
            <Text style={styles.value}>{accouchement.dureeContraction}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Dilatation du col:</Text>
            <Text style={styles.value}>{accouchement.colDilatation}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Rupture poche eaux:</Text>
            <Text style={styles.value}>
              {accouchement.rupturePouche ? `Oui (${accouchement.dureeRupture})` : 'Non'}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Liquide amniotique:</Text>
            <Text style={styles.value}>
              {accouchement.liquideAmniotique === 'clair' ? 'Clair' :
               accouchement.liquideAmniotique === 'sanguinolant' ? 'Sanguinolant' : 'Méconial'}
            </Text>
          </View>
        </View>

        {/* Section Traitements et suites */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Traitements et suites</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Perfusion ocytocique:</Text>
            <Text style={styles.value}>
              {accouchement.perfusionOcytocique ? 'Oui' : 'Non'}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Gestion active:</Text>
            <Text style={styles.value}>
              {accouchement.gestionActive ? 'Oui' : 'Non'}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Vitamine A:</Text>
            <Text style={styles.value}>
              {accouchement.vitamineA ? 'Oui' : 'Non'}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Déparasitage:</Text>
            <Text style={styles.value}>
              {accouchement.deparasitage ? 'Oui' : 'Non'}
            </Text>
          </View>
          
          {accouchement.natureDosage && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Traitement:</Text>
              <Text style={styles.value}>{accouchement.natureDosage}</Text>
            </View>
          )}
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Décision:</Text>
            <Text style={styles.value}>
              {accouchement.priseDecision === 'garder' ? 'Garder en observation' :
               accouchement.priseDecision === 'reférer' ? 'Référer' : 'Evacuer'}
            </Text>
          </View>
          
          {accouchement.complications && (
            <View style={[styles.infoRow, { alignItems: 'flex-start' }]}>
              <Text style={styles.label}>Complications:</Text>
              <Text style={[styles.value, { color: '#FF6B6B' }]}>
                <Ionicons name="warning" size={16} color="#FF6B6B" /> {accouchement.complications}
              </Text>
            </View>
          )}
          
          {accouchement.commentaire && (
            <View style={[styles.infoRow, { alignItems: 'flex-start' }]}>
              <Text style={styles.label}>Commentaire:</Text>
              <Text style={styles.value}>{accouchement.commentaire}</Text>
            </View>
          )}
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
});
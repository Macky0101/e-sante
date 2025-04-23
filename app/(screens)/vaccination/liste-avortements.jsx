import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import moment from "moment"
import "moment/locale/fr"

import Header from "../../components/header/Header"
import Button from "../../components/buttons/Button"
import LoadingIndicator from "../../components/loading/LoadingIndicator"
import { useToast } from "../../components/toast/ToastProvider"
import cpnService from "../../services/cpnService"

moment.locale('fr');

export default function PatientAvortementsList() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const patientId = params.id
  const toast = useToast()

  const [Avortements, setAvortements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAvortements()
  }, [patientId])

  const loadAvortements = async () => {
    try {
      setLoading(true)
      // Simulation de données - remplacer par un appel API réel
      const mockData = [
        {
          id: '1',
          date: '2024-12-12T09:00:00',
          modeSurvenu: 'spontane',
          saa: true,
          modeEvacuation: 'amiu',
          traitementMedicamenteux: 'Misoprostol 800μg',
          medecin: 'Dr. Ndiaye',
          statut: 'Terminé',
        },
        {
          id: '2',
          date: '2024-11-03T15:45:00',
          modeSurvenu: 'provoque',
          saa: false,
          modeEvacuation: '',
          traitementMedicamenteux: '',
          medecin: 'Dr. Konaté',
          statut: 'En cours',
        },
      ]
      
      setAvortements(mockData)
    } catch (error) {
      toast.showError(`Erreur lors du chargement des Avortements: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handlePressConsultation = (consultationId) => {
    router.push({
      pathname: "/(screens)/avortement/detail-avortement",
      params: { id: consultationId }
    });
  };

  const handleConsultationPress = (consultationId) => {
    router.push({
      pathname: "/(screens)/avortement/detail-avortement",
      params: { id: consultationId }
    });
  }

  const handleAddConsultation = () => {
    router.push("/(screens)/avortement/avortement-form")
  }

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'terminé': return '#4CAF50'
      case 'en cours': return '#FFC107'
      case 'annulé': return '#F44336'
      default: return '#9E9E9E'
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Liste des Avortements" />
        <LoadingIndicator />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Liste des Avortements"
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
      {Avortements.map((item) => (
  <TouchableOpacity
    key={item.id}
    style={styles.card}
    onPress={() => handleConsultationPress(item.id)}
  >
    <View style={styles.cardHeader}>
      <Text style={styles.cardDate}>
        {moment(item.date).format('LL [à] LT')}
      </Text>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.statut) }]}>
        <Text style={styles.statusText}>{item.statut}</Text>
      </View>
    </View>

    <View style={styles.cardBody}>
      <Text style={styles.cardMotif}>
        Mode de survenue : {item.modeSurvenu === "spontane" ? "Spontané" : item.modeSurvenu === "provoque" ? "Provoqué" : "Molaire"}
      </Text>

      {item.saa && (
        <Text style={styles.cardDiagnostic}>
          <Text style={styles.label}>Mode d’évacuation : </Text>
          {item.modeEvacuation}
        </Text>
      )}

      {item.traitementMedicamenteux ? (
        <Text style={styles.cardDiagnostic}>
          <Text style={styles.label}>Traitement : </Text>
          {item.traitementMedicamenteux}
        </Text>
      ) : null}
    </View>

    <View style={styles.cardFooter}>
      <Text style={styles.cardMedecin}>
        <Ionicons name="person" size={14} color="#555" /> {item.medecin}
      </Text>
    </View>
  </TouchableOpacity>
))}

      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="Ajouter un avortement"
          icon="add"
          onPress={handleAddConsultation}
          style={styles.addButton}
        />
      </View>
    </SafeAreaView>
  )
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
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  cardBody: {
    marginBottom: 8,
  },
  cardMotif: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  cardDiagnostic: {
    fontSize: 14,
    color: '#555',
  },
  label: {
    fontWeight: '500',
    color: '#333',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardMedecin: {
    fontSize: 14,
    color: '#555',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  addButton: {
    width: '100%',
  },
})
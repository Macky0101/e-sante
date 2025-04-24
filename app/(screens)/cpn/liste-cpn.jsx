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

moment.locale('fr');

export default function PatientConsultationsList() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const patientId = params.id
  const toast = useToast()

  const [consultations, setConsultations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadConsultations()
  }, [patientId])

  const loadConsultations = async () => {
    try {
      setLoading(true)
      // Simulation de données - remplacer par un appel API réel
      const mockData = [
        {
          id: '1',
          date: '2023-05-15T10:30:00',
          motif: 'Fièvre et toux persistante',
          diagnostic: 'Infection respiratoire',
          medecin: 'Dr. Dupont',
          statut: 'Terminé'
        },
        {
          id: '2',
          date: '2023-04-28T14:15:00',
          motif: 'Contrôle post-opératoire',
          diagnostic: 'Suivi chirurgie',
          medecin: 'Dr. Martin',
          statut: 'Terminé'
        },
      ]
      setConsultations(mockData)
    } catch (error) {
      toast.showError(`Erreur lors du chargement des consultations: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handlePressConsultation = (consultationId) => {
    router.push({
      pathname: "/(screens)/consultation/detail-consultation",
      params: { id: consultationId }
    });
  };

  const handleConsultationPress = (consultationId) => {
    router.push({
      pathname: "/(screens)/consultation/detail-consultation",
      params: { id: consultationId }
    });
  }

  const handleAddConsultation = () => {
    router.push(`/patients/${patientId}/new-consultation`)
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
        <Header title="Liste des consultations" />
        <LoadingIndicator />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Liste des consultations"
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {consultations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>Aucune consultation trouvée</Text>
          </View>
        ) : (
          consultations.map((consultation) => (
            <TouchableOpacity
              key={consultation.id}
              style={styles.card}
              onPress={() => handleConsultationPress(consultation.id)}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardDate}>
                  {moment(consultation.date).format('LL [à] LT')}
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(consultation.statut) }]}>
                  <Text style={styles.statusText}>{consultation.statut}</Text>
                </View>
              </View>
              
              <View style={styles.cardBody}>
                <Text style={styles.cardMotif}>{consultation.motif}</Text>
                <Text style={styles.cardDiagnostic}>
                  <Text style={styles.label}>Diagnostic: </Text>
                  {consultation.diagnostic}
                </Text>
              </View>
              
              <View style={styles.cardFooter}>
                <Text style={styles.cardMedecin}>
                  <Ionicons name="person" size={14} color="#555" /> {consultation.medecin}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="Nouvelle consultation"
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
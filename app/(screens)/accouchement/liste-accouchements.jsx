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
import accouchementService from "../../services/accouchementService"

moment.locale('fr');

export default function ListeAccouchements() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const patientId = params.id
  const toast = useToast()

  const [accouchements, setAccouchements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAccouchements()
  }, [patientId])

  const loadAccouchements = async () => {
    try {
      setLoading(true)
      // Remplacez par votre appel API réel
      const mockData = [
        {
          id: '1',
          date: '2023-05-15T10:30:00',
          nombreEnfantVivant: 1,
          lieuAccouchement: 'Centre',
          methode: 'Naturel',
          complications: 'Aucune'
        },
        {
          id: '2',
          date: '2023-04-28T14:15:00',
          nombreEnfantVivant: 2,
          lieuAccouchement: 'Hôpital',
          methode: 'Césarienne',
          complications: 'Hémorragie légère'
        }
      ]
      setAccouchements(mockData)
    } catch (error) {
      toast.showError(`Erreur lors du chargement: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleAddAccouchement = () => {
    router.push({
      pathname: "/(screens)/accouchement/accouchement-form",
      params: { patientId }
    })
  }

  const handleAccouchementPress = (accouchementId) => {
    router.push({
      pathname: "/(screens)/accouchement/detail-accouchement",
      params: { id: accouchementId }
    })
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Accouchements" />
        <LoadingIndicator />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Historique des accouchements"
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {accouchements.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>Aucun accouchement enregistré</Text>
          </View>
        ) : (
          accouchements.map((accouchement) => (
            <TouchableOpacity
              key={accouchement.id}
              style={styles.card}
              onPress={() => handleAccouchementPress(accouchement.id)}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.date}>
                  {moment(accouchement.date).format('LL [à] LT')}
                </Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{accouchement.methode}</Text>
                </View>
              </View>
              
              <View style={styles.cardBody}>
                <Text style={styles.infoText}>
                  <Text style={styles.label}>Lieu: </Text>
                  {accouchement.lieuAccouchement}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.label}>Enfants: </Text>
                  {accouchement.nombreEnfantVivant}
                </Text>
              </View>
              
              {accouchement.complications && (
                <View style={styles.cardFooter}>
                  <Text style={styles.complicationText}>
                    <Ionicons name="warning" size={14} color="#FF6B6B" /> 
                    {accouchement.complications}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <Button
        title="Nouvel accouchement"
        icon="add"
        onPress={handleAddAccouchement}
        style={styles.addButton}
      />
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
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#1976D2',
    fontSize: 12,
    fontWeight: '500',
  },
  cardBody: {
    marginVertical: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  label: {
    fontWeight: '600',
    color: '#555',
  },
  cardFooter: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  complicationText: {
    fontSize: 13,
    color: '#FF6B6B',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
})
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

import Header from "../../components/header/Header"
import Button from "../../components/buttons/Button"
import LoadingIndicator from "../../components/loading/LoadingIndicator"
import { useToast } from "../../components/toast/ToastProvider"
import patientService from "../../services/patientService"

export default function PatientDetailsScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const patientId = params.id

  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    loadPatient()
  }, [patientId])

  const loadPatient = async () => {
    try {
      setLoading(true)
      const data = await patientService.getPatientById(patientId)
      setPatient(data)
    } catch (error) {
      toast.showError(`Erreur lors du chargement du patient: ${error.message}`)
      router.back()
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    router.push({
      pathname: "/(screens)/patients/patient-form",
      params: { id: patientId },
    })
  }

  const handleDelete = async () => {
    try {
      await patientService.deletePatient(patientId)
      toast.showSuccess("Patient supprimé avec succès")
      router.back()
    } catch (error) {
      if (error.message !== "Suppression annulée") {
        toast.showError(`Erreur: ${error.message}`)
      }
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Détails du patient" />
        <LoadingIndicator />
      </SafeAreaView>
    )
  }

  if (!patient) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Détails du patient" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Patient non trouvé</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Détails du patient" />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Informations personnelles</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nom</Text>
            <Text style={styles.infoValue}>{patient.nom}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Prénom</Text>
            <Text style={styles.infoValue}>{patient.prenom}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date de naissance</Text>
            <Text style={styles.infoValue}>{patient.date_naissance}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Genre</Text>
            <Text style={styles.infoValue}>{patient.genre === 1 ? "Homme" : "Femme"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Profession</Text>
            <Text style={styles.infoValue}>{patient.profession || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Statut matrimonial</Text>
            <Text style={styles.infoValue}>
              {patient.statut_matrimonial
                ? patient.statut_matrimonial.charAt(0).toUpperCase() + patient.statut_matrimonial.slice(1)
                : "-"}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Coordonnées</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Téléphone principal</Text>
            <Text style={styles.infoValue}>{patient.telephone1 || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Téléphone secondaire</Text>
            <Text style={styles.infoValue}>{patient.telephone_2 || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{patient.email || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Adresse</Text>
            <Text style={styles.infoValue}>{patient.adresse || "-"}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Informations médicales</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Numéro de dossier</Text>
            <Text style={styles.infoValue}>{patient.numero_dossier}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hors haire</Text>
            <View style={styles.iconContainer}>
              {patient.hors_haire ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Alerte</Text>
            <View style={styles.iconContainer}>
              {patient.alerte ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Button title="Modifier" variant="outline" onPress={handleEdit} style={styles.button} />
          <Button title="Supprimer" variant="danger" onPress={handleDelete} style={styles.button} />
        </View>
      </ScrollView>
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
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  cardHeader: {
    backgroundColor: "#2b7a78",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 2,
    textAlign: "right",
  },
  iconContainer: {
    flex: 2,
    alignItems: "flex-end",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
  },
})

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

import Header from "../../components/header/Header"
import Button from "../../components/buttons/Button"
import LoadingIndicator from "../../components/loading/LoadingIndicator"
import { useToast } from "../../components/toast/ToastProvider"
import suiviService from "../../services/suiviService"

export default function SuiviDetailsScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const suiviId = params.id

  const [suivi, setSuivi] = useState(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    loadSuivi()
  }, [suiviId])

  const loadSuivi = async () => {
    try {
      setLoading(true)
      const data = await suiviService.getSuiviById(suiviId)
      setSuivi(data)
    } catch (error) {
      toast.showError(`Erreur lors du chargement du suivi médical: ${error.message}`)
      router.back()
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    router.push({
      pathname: "/(screens)/suivi/suivi-form",
      params: { id: suiviId },
    })
  }

  const handleDelete = async () => {
    try {
      await suiviService.deleteSuivi(suiviId)
      toast.showSuccess("Suivi médical supprimé avec succès")
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
        <Header title="Détails du suivi médical" />
        <LoadingIndicator />
      </SafeAreaView>
    )
  }

  if (!suivi) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Détails du suivi médical" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Suivi médical non trouvé</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Détails du suivi médical" />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Informations patient</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nom</Text>
            <Text style={styles.infoValue}>{suivi.patient.nom}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Prénom</Text>
            <Text style={styles.infoValue}>{suivi.patient.prenom}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date de naissance</Text>
            <Text style={styles.infoValue}>{suivi.patient.date_naissance}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Genre</Text>
            <Text style={styles.infoValue}>{suivi.patient.genre === 1 ? "Homme" : "Femme"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Numéro de dossier</Text>
            <Text style={styles.infoValue}>{suivi.numero_dossier}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date de consultation</Text>
            <Text style={styles.infoValue}>{suivi.date}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nature de la consultation</Text>
            <Text style={styles.infoValue}>{suivi.nature || "-"}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Signes vitaux</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Taille</Text>
            <Text style={styles.infoValue}>{suivi.taille ? `${suivi.taille} cm` : "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Poids</Text>
            <Text style={styles.infoValue}>{suivi.poids ? `${suivi.poids} kg` : "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>IMC</Text>
            <Text style={styles.infoValue}>{suivi.imc || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tension artérielle</Text>
            <Text style={styles.infoValue}>
              {suivi.ta_max && suivi.ta_min ? `${suivi.ta_max}/${suivi.ta_min}` : suivi["TA(mmHg)"] || "-"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fréquence cardiaque</Text>
            <Text style={styles.infoValue}>{suivi.fc ? `${suivi.fc} bpm` : suivi["FC(mn)"] || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Température</Text>
            <Text style={styles.infoValue}>{suivi.temperature ? `${suivi.temperature}°C` : suivi["T(°)"] || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>SpO2</Text>
            <Text style={styles.infoValue}>{suivi.SO2P ? `${suivi.SO2P}%` : "-"}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Examens complémentaires</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Glycémie</Text>
            <Text style={styles.infoValue}>{suivi.glycemie ? `${suivi.glycemie} g/L` : "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>TDR Palu</Text>
            <Text style={styles.infoValue}>{suivi.TDR_Palu || "-"}</Text>
          </View>

          {suivi.TDR_Palu === "positif" && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Précision si positif</Text>
              <Text style={styles.infoValue}>{suivi.precision_si_positif || "-"}</Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Présence d'albumine</Text>
            <Text style={styles.infoValue}>{suivi.presence_albumine || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Présence de sucre</Text>
            <Text style={styles.infoValue}>{suivi.presence_sucre || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Type d'examen</Text>
            <Text style={styles.infoValue}>{suivi.examen || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Résultat de l'examen</Text>
            <Text style={styles.infoValue}>{suivi.resultat || "-"}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Traitement et suivi</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Dosage</Text>
            <Text style={styles.infoValue}>{suivi.dosage || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Voie d'administration</Text>
            <Text style={styles.infoValue}>{suivi.voie || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Conduite à tenir</Text>
            <Text style={styles.infoValue}>{suivi.conduite || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Référence</Text>
            <Text style={styles.infoValue}>{suivi.reference || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Référencement interne</Text>
            <View style={styles.iconContainer}>
              {suivi.referencement_interne ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Complément d'information</Text>
            <Text style={styles.infoValue}>{suivi.complement_information || "-"}</Text>
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

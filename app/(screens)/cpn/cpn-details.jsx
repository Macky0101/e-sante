import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

import Header from "../../components/header/Header"
import Button from "../../components/buttons/Button"
import LoadingIndicator from "../../components/loading/LoadingIndicator"
import { useToast } from "../../components/toast/ToastProvider"
import cpnService from "../../services/cpnService"

export default function CpnDetailsScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const cpnId = params.id

  const [cpn, setCpn] = useState(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    loadCpn()
  }, [cpnId])

  const loadCpn = async () => {
    try {
      setLoading(true)
      const data = await cpnService.getCpnById(cpnId)
      setCpn(data)
    } catch (error) {
      toast.showError(`Erreur lors du chargement de la consultation prénatale: ${error.message}`)
      router.back()
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    router.push({
      pathname: "/(screens)/cpn/cpn-form",
      params: { id: cpnId },
    })
  }

  const handleDelete = async () => {
    try {
      await cpnService.deleteCpn(cpnId)
      toast.showSuccess("Consultation prénatale supprimée avec succès")
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
        <Header title="Détails de la consultation prénatale" />
        <LoadingIndicator />
      </SafeAreaView>
    )
  }

  if (!cpn) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Détails de la consultation prénatale" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Consultation prénatale non trouvée</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Détails de la consultation prénatale" />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Informations patient</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nom</Text>
            <Text style={styles.infoValue}>{cpn.patient.nom}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Prénom</Text>
            <Text style={styles.infoValue}>{cpn.patient.prenom}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date de naissance</Text>
            <Text style={styles.infoValue}>{cpn.patient.date_naissance}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Numéro de dossier</Text>
            <Text style={styles.infoValue}>{cpn.numero_dossier}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date de visite</Text>
            <Text style={styles.infoValue}>{cpn.date_visite}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Âge</Text>
            <Text style={styles.infoValue}>{cpn.age || "-"}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Antécédents obstétricaux</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gestité</Text>
            <Text style={styles.infoValue}>{cpn.gest || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Parité</Text>
            <Text style={styles.infoValue}>{cpn.parite || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Parité supérieure à 6</Text>
            <View style={styles.iconContainer}>
              {cpn.parite_sup ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Antécédent de césarienne</Text>
            <View style={styles.iconContainer}>
              {cpn.cesarienne ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Antécédent de mort-né</Text>
            <View style={styles.iconContainer}>
              {cpn.mort_ne ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Drépanocytose</Text>
            <View style={styles.iconContainer}>
              {cpn.drepanocytose ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>HTA connue</Text>
            <View style={styles.iconContainer}>
              {cpn.hta_connu ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Autres facteurs de risque</Text>
            <Text style={styles.infoValue}>{cpn.autre_facteur || "-"}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Grossesse actuelle</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date des dernières règles</Text>
            <Text style={styles.infoValue}>{cpn.date_regle || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Semaine d'aménorrhée</Text>
            <Text style={styles.infoValue}>{cpn.semaine || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Premier trimestre</Text>
            <View style={styles.iconContainer}>
              {cpn.trimestre1 ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Deuxième trimestre</Text>
            <View style={styles.iconContainer}>
              {cpn.trimestre2 ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Troisième trimestre</Text>
            <View style={styles.iconContainer}>
              {cpn.trimestre3 ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Dernier mois</Text>
            <View style={styles.iconContainer}>
              {cpn.dernier_mois ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Grossesse à risque élevé</Text>
            <View style={styles.iconContainer}>
              {cpn.gare ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Anémie</Text>
            <View style={styles.iconContainer}>
              {cpn.anemie ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Œdèmes des membres inférieurs</Text>
            <View style={styles.iconContainer}>
              {cpn.omi ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ictère</Text>
            <View style={styles.iconContainer}>
              {cpn.ictere ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Saignement</Text>
            <View style={styles.iconContainer}>
              {cpn.saignement ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Vomissements</Text>
            <View style={styles.iconContainer}>
              {cpn.vomissement ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Mouvements fœtaux</Text>
            <Text style={styles.infoValue}>{cpn.foetale || "-"}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Examen clinique</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Taille</Text>
            <Text style={styles.infoValue}>{cpn.taille ? `${cpn.taille} cm` : "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Poids</Text>
            <Text style={styles.infoValue}>{cpn.poids ? `${cpn.poids} kg` : "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>IMC</Text>
            <Text style={styles.infoValue}>{cpn.imc || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tension artérielle</Text>
            <Text style={styles.infoValue}>{cpn.ta_max && cpn.ta_min ? `${cpn.ta_max}/${cpn.ta_min}` : "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Température</Text>
            <Text style={styles.infoValue}>{cpn.temperature ? `${cpn.temperature}°C` : "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hauteur utérine</Text>
            <Text style={styles.infoValue}>{cpn.hu ? `${cpn.hu} cm` : "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Col</Text>
            <Text style={styles.infoValue}>{cpn.col ? `${cpn.col} cm` : "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Bruits du cœur fœtal</Text>
            <View style={styles.iconContainer}>
              {cpn.bdc ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Coloration des muqueuses</Text>
            <View style={styles.iconContainer}>
              {cpn.coloration ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Examens complémentaires</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>TDR Palu</Text>
            <View style={styles.iconContainer}>
              {cpn.tdr_palu ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          {cpn.tdr_palu && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Précision si positif</Text>
              <Text style={styles.infoValue}>{cpn.precision || "-"}</Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Albumine</Text>
            <Text style={styles.infoValue}>{cpn.albumine || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sucre</Text>
            <Text style={styles.infoValue}>{cpn.sucre || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>TDR VIH</Text>
            <Text style={styles.infoValue}>{cpn.tdr_vih || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Groupe sanguin</Text>
            <Text style={styles.infoValue}>{cpn.groupe_sanguin || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Rhésus positif</Text>
            <View style={styles.iconContainer}>
              {cpn.groupe_rehsus ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Prévention et traitement</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Vitamine A</Text>
            <View style={styles.iconContainer}>
              {cpn.vitamineA ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fer et acide folique</Text>
            <View style={styles.iconContainer}>
              {cpn.faf ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Vaccin anti-tétanique</Text>
            <Text style={styles.infoValue}>{cpn.tetanos || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>TPI</Text>
            <Text style={styles.infoValue}>{cpn.tpi || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Moustiquaire imprégnée</Text>
            <View style={styles.iconContainer}>
              {cpn.moustiquaire ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Déparasitage</Text>
            <View style={styles.iconContainer}>
              {cpn.deparasitage ? (
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
              ) : (
                <Ionicons name="close-circle" size={20} color="#f44336" />
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Counseling</Text>
            <Text style={styles.infoValue}>{cpn.counseling || "-"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Complément d'information</Text>
            <Text style={styles.infoValue}>{cpn.complement_information || "-"}</Text>
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

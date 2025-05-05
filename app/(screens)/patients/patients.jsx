import { useState, useEffect } from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

import Header from "../../components/header/Header"
import { useToast } from "../../components/toast/ToastProvider"
import PatientList from "./components/PatientList"
import { syncAll, getSyncSettings, startBackgroundSync } from "../../services/syncService"

import { getAllDossiers } from "../../database/helpers/helperDossier"

export default function PatientsScreen() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    loadPatients()

    // Vérifier les paramètres de synchronisation
    checkSyncSettings()

    return () => {
      // Nettoyer les ressources si nécessaire
    }
  }, [])

  const checkSyncSettings = async () => {
    try {
      const settings = await getSyncSettings()

      // Synchroniser au démarrage si activé
      if (settings && settings.syncOnStartup) {
        console.log("Synchronisation au démarrage activée")
        handleSync(true) // Synchronisation silencieuse
      }

      // Configurer la synchronisation automatique
      if (settings && settings.autoSync) {
        // Utiliser la nouvelle fonction startBackgroundSync
        startBackgroundSync(handleSync)
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des paramètres de synchronisation:", error)
    }
  }

  const loadPatients = async (searchQuery = "") => {
    try {
      setLoading(true)
      const data = await getAllDossiers({ search: searchQuery, activeOnly: true })
      console.log("Patients data:", data.length)
      if (data.length === 0) {
        toast.showInfo("Aucun patient trouvé.")
      }
      setPatients(data)
    } catch (error) {
      toast.showError(`Erreur lors du chargement des patients: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handlePatientPress = (patient) => {
    router.push({
      pathname: "/(screens)/patients/patient-details",
      params: { id: patient.id },
    })
  }

  const handleAddPatient = () => {
    router.push("/(screens)/patients/patient-form")
  }

  const handleSearch = (query) => {
    loadPatients(query)
  }

  const handleSync = async (silent = false) => {
    if (syncing) return

    try {
      setSyncing(true)
      if (!silent) {
        toast.showInfo("Synchronisation en cours...")
      }

      // Utiliser forceSync=true pour ignorer la vérification de connectivité
      const result = await syncAll(silent, true)

      if (result.success) {
        if (!silent) {
          toast.showSuccess("Synchronisation réussie!")
        }
        // Recharger la liste après synchronisation
        loadPatients()
      } else {
        if (!silent) {
          toast.showError(`Échec de la synchronisation: ${result.error}`)
        } else {
          console.error(`Échec de la synchronisation silencieuse: ${result.error}`)
        }
      }
    } catch (error) {
      if (!silent) {
        toast.showError(`Erreur: ${error.message}`)
      } else {
        console.error(`Erreur lors de la synchronisation silencieuse: ${error.message}`)
      }
    } finally {
      setSyncing(false)
    }
  }

  const handleOpenSyncManager = () => {
    router.push("/(screens)/settings/sync-screen")
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Liste des patients"
        rightComponent={
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.syncButton} onPress={handleSync} disabled={syncing}>
              {syncing ? (
                <Ionicons name="sync" size={24} color="#fff" style={styles.spinningIcon} />
              ) : (
                <Ionicons name="sync" size={24} color="#fff" />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsButton} onPress={handleOpenSyncManager}>
              <Ionicons name="settings-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        }
      />
      <PatientList
        patients={patients}
        loading={loading}
        onPatientPress={handlePatientPress}
        onAddPress={handleAddPatient}
        onSearch={handleSearch}
        onRefresh={loadPatients}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  syncButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#2b7a78",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#2b7a78",
    justifyContent: "center",
    alignItems: "center",
  },
  spinningIcon: {
    transform: [{ rotate: "45deg" }],
  },
})

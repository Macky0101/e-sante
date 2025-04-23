import { useState, useEffect } from "react"
import { StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import Header from "../../components/header/Header"
import { useToast } from "../../components/toast/ToastProvider"
import patientService from "../../services/patientService"
import PatientListShared from "../../components/shared/PatientListShared"

export default function VaccinationsScreen() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async (searchQuery = "") => {
    try {
      setLoading(true)
      // Utiliser le service patient avec le paramètre specialty
      const data = await patientService.getPatients({
        search: searchQuery,
        specialty: "vaccinations",
      })
      setPatients(data)
    } catch (error) {
      toast.showError(`Erreur lors du chargement des patients: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handlePatientPress = (patient, action) => {
    if (action === "details") {
      // Naviguer vers les détails du patient
      router.push({
        pathname: "/(screens)/vaccination/liste-vaccinations",
        params: { id: patient.id },
      })
    } 
    if (action === "patient-details") {
        router.push({
          pathname: "/(screens)/vaccination/detail-vaccination",
          params: { id: patient.id },
        })
      }
      else if (action === "form") {
      // Naviguer vers le formulaire vaccinations avec l'ID du patient
      router.push({
        pathname: "/(screens)/vaccination/vaccination-form",
        params: { patientId: patient.id },
      })
    }
  }

  const handleAddPatient = () => {
    // Naviguer vers le formulaire d'ajout de patient
    router.push("/(screens)/vaccination/vaccination-form")
  }

  const handleSearch = (query) => {  
    loadPatients(query)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="vaccinations " />
      <PatientListShared
        patients={patients}
        loading={loading}
        onPatientPress={handlePatientPress}
        onAddPress={handleAddPatient}
        onSearch={handleSearch}
        specialtyType="vaccination"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
})

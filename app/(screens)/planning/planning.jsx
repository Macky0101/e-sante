import { useState, useEffect } from "react"
import { StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import Header from "../../components/header/Header"
import { useToast } from "../../components/toast/ToastProvider"
import patientService from "../../services/patientService"
import PatientListShared from "../../components/shared/PatientListShared"

export default function PlanningScreen() {
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
        specialty: "planning",
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
      router.push({
        pathname: "/(screens)/planning/planning-details",
        params: { id: patient.id },
      })
    }
    if (action === "patient-details") {
      router.push({
        pathname: "/(screens)/patients/patient-details",
        params: { id: patient.id },
      })
    } else if (action === "form") {
      // planning avec l'ID du patient
      router.push({
        pathname: "/(screens)/planning/planning-form",
        params: { patientId: patient.id },
      })
    }
  }

  const handleAddPatient = () => {
    router.push("/(screens)/patients/patient-form")
  }

  const handleSearch = (query) => {
    loadPatients(query)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Planning familial" />
      <PatientListShared
        patients={patients}
        loading={loading}
        onPatientPress={handlePatientPress}
        onAddPress={handleAddPatient}
        onSearch={handleSearch}
        specialtyType="Planning familial"
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

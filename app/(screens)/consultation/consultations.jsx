"use client"

import { useState, useEffect } from "react"
import { StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import Header from "../../components/header/Header"
import { useToast } from "../../components/toast/ToastProvider"
import patientService from "../../services/patientService"
import PatientList from "../patients/components/PatientList"

export default function ConsultationsScreen() {
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
      const data = await patientService.getPatients({ search: searchQuery })
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

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Liste des patients" />
      <PatientList
        patients={patients}
        loading={loading}
        onPatientPress={handlePatientPress}
        onAddPress={handleAddPatient}
        onSearch={handleSearch}
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

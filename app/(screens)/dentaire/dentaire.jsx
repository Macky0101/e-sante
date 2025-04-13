"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

// Données des rendez-vous
const appointments = [
  {
    id: "1",
    date: "15 Juin 2024",
    time: "10:00",
    doctor: "Dr. Diallo",
    specialty: "Médecine générale",
    patient: "Ahmed Diallo",
    status: "Confirmé",
    notes: "Consultation de routine",
  },
  {
    id: "2",
    date: "17 Juin 2024",
    time: "14:30",
    doctor: "Dr. Touré",
    specialty: "Gynécologie",
    patient: "Fatima Camara",
    status: "Confirmé",
    notes: "Suivi de grossesse",
  },
  {
    id: "3",
    date: "20 Juin 2024",
    time: "09:15",
    doctor: "Dr. Camara",
    specialty: "Cardiologie",
    patient: "Ibrahim Sangaré",
    status: "En attente",
    notes: "Contrôle tension artérielle",
  },
  {
    id: "4",
    date: "22 Juin 2024",
    time: "11:30",
    doctor: "Dr. Bah",
    specialty: "Dermatologie",
    patient: "Aminata Touré",
    status: "Confirmé",
    notes: "Consultation allergie cutanée",
  },
  {
    id: "5",
    date: "25 Juin 2024",
    time: "16:00",
    doctor: "Dr. Konaté",
    specialty: "Orthopédie",
    patient: "Sekou Konaté",
    status: "En attente",
    notes: "Douleurs articulaires",
  },
]

// Composant pour un rendez-vous
const AppointmentCard = ({ appointment, onPress }) => {
  return (
    <TouchableOpacity style={styles.appointmentCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.appointmentHeader}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.appointmentDate}>{appointment.date}</Text>
          <Text style={styles.appointmentTime}>{appointment.time}</Text>
        </View>
        <View
          style={[
            styles.statusTag,
            {
              backgroundColor: appointment.status === "Confirmé" ? "#e6f7e6" : "#fff8e6",
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: appointment.status === "Confirmé" ? "#4caf50" : "#ff9800",
              },
            ]}
          >
            {appointment.status}
          </Text>
        </View>
      </View>
      <View style={styles.appointmentDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="person" size={16} color="#666" />
          <Text style={styles.detailText}>{appointment.doctor}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="medical" size={16} color="#666" />
          <Text style={styles.detailText}>{appointment.specialty}</Text>
        </View>
      </View>
      <Text style={styles.appointmentNotes}>{appointment.notes}</Text>
    </TouchableOpacity>
  )
}

export default function AppointmentsScreen() {
  const router = useRouter()
  const [filter, setFilter] = useState("all") // "all", "confirmed", "pending"

  const handleGoBack = () => {
    router.back()
  }

  const handleAppointmentPress = (appointment) => {
    console.log(`Appointment details: ${appointment.id}`)
    // router.push(`/appointments/${appointment.id}`);
  }

  const handleNewAppointment = () => {
    console.log("Creating new appointment")
    // router.push("/appointments/new");
  }

  // Filtrer les rendez-vous
  const filteredAppointments =
    filter === "all"
      ? appointments
      : filter === "confirmed"
        ? appointments.filter((app) => app.status === "Confirmé")
        : appointments.filter((app) => app.status === "En attente")

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* En-tête */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color="#2b7a78" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Rendez-vous</Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleNewAppointment}>
            <Ionicons name="add" size={24} color="#2b7a78" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filtres */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => setFilter("all")}
        >
          <Text style={[styles.filterText, filter === "all" && styles.activeFilterText]}>Tous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "confirmed" && styles.activeFilter]}
          onPress={() => setFilter("confirmed")}
        >
          <Text style={[styles.filterText, filter === "confirmed" && styles.activeFilterText]}>Confirmés</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "pending" && styles.activeFilter]}
          onPress={() => setFilter("pending")}
        >
          <Text style={[styles.filterText, filter === "pending" && styles.activeFilterText]}>En attente</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des rendez-vous */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onPress={() => handleAppointmentPress(appointment)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    padding: 4,
  },
  filterContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  activeFilter: {
    backgroundColor: "#e0f2f1",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
  },
  activeFilterText: {
    color: "#2b7a78",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  dateTimeContainer: {
    flexDirection: "column",
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  appointmentTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    justifyContent: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  appointmentDetails: {
    flexDirection: "row",
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 4,
  },
  appointmentNotes: {
    fontSize: 14,
    color: "#2b7a78",
    fontStyle: "italic",
  },
})


import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons"

const getPatient = (id) => {
  return {
    id,
    name: "Fatima Camara",
    age: 32,
    gender: "Féminin",
    birthDate: "15/04/1992",
    phone: "+223 76 54 32 10",
    email: "fatima.camara@email.com",
    address: "123 Rue Principale, Bamako",
    bloodType: "A+",
    condition: "Grossesse",
    allergies: ["Pénicilline", "Arachides"],
    lastVisit: "03/05/2024",
    nextAppointment: "17/06/2024",
    avatar: "https://picsum.photos/200?random=2",
    history: [
      {
        date: "03/05/2024",
        doctor: "Dr. Diallo",
        notes: "Contrôle de grossesse de routine. Tout semble normal.",
        prescription: ["Acide folique", "Fer"],
      },
      {
        date: "05/04/2024",
        doctor: "Dr. Touré",
        notes: "Premier contrôle de grossesse. Estimation de 8 semaines.",
        prescription: ["Vitamines prénatales"],
      },
      {
        date: "10/01/2024",
        doctor: "Dr. Camara",
        notes: "Consultation pour toux persistante. Diagnostic: bronchite légère.",
        prescription: ["Sirop antitussif", "Paracétamol"],
      },
    ],
    appointments: [
      {
        date: "17/06/2024",
        time: "10:00",
        doctor: "Dr. Diallo",
        type: "Contrôle grossesse",
        status: "Confirmé",
      },
      {
        date: "15/07/2024",
        time: "11:30",
        doctor: "Dr. Diallo",
        type: "Échographie",
        status: "Planifié",
      },
    ],
    documents: [
      {
        name: "Résultats analyse sanguine",
        date: "03/05/2024",
      },
      {
        name: "Échographie T1",
        date: "05/04/2024",
      },
    ],
  }
}

// Composant pour les onglets
const TabButton = ({ title, active, onPress }) => {
  return (
    <TouchableOpacity style={[styles.tabButton, active && styles.activeTabButton]} onPress={onPress}>
      <Text style={[styles.tabButtonText, active && styles.activeTabButtonText]}>{title}</Text>
    </TouchableOpacity>
  )
}

// Composant pour les informations de contact
const InfoItem = ({ icon, label, value }) => {
  return (
    <View style={styles.infoItem}>
      {icon}
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  )
}

// Composant pour les visites médicales
const VisitItem = ({ visit }) => {
  return (
    <View style={styles.visitItem}>
      <View style={styles.visitHeader}>
        <Text style={styles.visitDate}>{visit.date}</Text>
        <Text style={styles.visitDoctor}>{visit.doctor}</Text>
      </View>
      <Text style={styles.visitNotes}>{visit.notes}</Text>
      <View style={styles.prescriptionContainer}>
        <Text style={styles.prescriptionLabel}>Prescription:</Text>
        <View style={styles.prescriptionTags}>
          {visit.prescription.map((med, index) => (
            <View key={index} style={styles.prescriptionTag}>
              <Text style={styles.prescriptionTagText}>{med}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

// Composant pour les rendez-vous
const AppointmentItem = ({ appointment }) => {
  return (
    <View style={styles.appointmentItem}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.appointmentDate}>{appointment.date}</Text>
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
        <View style={styles.appointmentDetail}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.appointmentDetailText}>{appointment.time}</Text>
        </View>
        <View style={styles.appointmentDetail}>
          <Ionicons name="person-outline" size={16} color="#666" />
          <Text style={styles.appointmentDetailText}>{appointment.doctor}</Text>
        </View>
      </View>
      <Text style={styles.appointmentType}>{appointment.type}</Text>
    </View>
  )
}

// Composant pour les documents
const DocumentItem = ({ document }) => {
  return (
    <View style={styles.documentItem}>
      <View style={styles.documentIcon}>
        <Ionicons name="document-text-outline" size={24} color="#666" />
      </View>
      <View style={styles.documentInfo}>
        <Text style={styles.documentName}>{document.name}</Text>
        <Text style={styles.documentDate}>Ajouté le {document.date}</Text>
      </View>
      <TouchableOpacity style={styles.documentButton}>
        <Text style={styles.documentButtonText}>Voir</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function PatientDetailScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { id } = route.params
  const patient = getPatient(id)
  const [activeTab, setActiveTab] = useState("history")

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* En-tête */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2b7a78" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerSubtitle}>Fiche patient</Text>
            <Text style={styles.headerTitle}>{patient.name}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Modifier</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Informations du patient */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: patient.avatar }} style={styles.profileAvatar} />
            <Text style={styles.profileName}>{patient.name}</Text>
            <Text style={styles.profileSubInfo}>
              {patient.age} ans • {patient.gender}
            </Text>
          </View>

          <View style={styles.infoSection}>
            <InfoItem
              icon={<Ionicons name="calendar-outline" size={20} color="#666" />}
              label="Date de naissance"
              value={patient.birthDate}
            />
            <InfoItem
              icon={<Ionicons name="call-outline" size={20} color="#666" />}
              label="Téléphone"
              value={patient.phone}
            />
            <InfoItem
              icon={<FontAwesome5 name="tint" size={18} color="#666" />}
              label="Groupe sanguin"
              value={patient.bloodType}
            />
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="allergy" size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Allergies</Text>
                <View style={styles.allergyTags}>
                  {patient.allergies.map((allergy, index) => (
                    <View key={index} style={styles.allergyTag}>
                      <Text style={styles.allergyTagText}>{allergy}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Onglets */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabsHeader}>
            <TabButton title="Historique" active={activeTab === "history"} onPress={() => setActiveTab("history")} />
            <TabButton
              title="Rendez-vous"
              active={activeTab === "appointments"}
              onPress={() => setActiveTab("appointments")}
            />
            <TabButton title="Documents" active={activeTab === "documents"} onPress={() => setActiveTab("documents")} />
          </View>

          {/* Contenu des onglets */}
          <View style={styles.tabContent}>
            {activeTab === "history" && (
              <View style={styles.historyTab}>
                <Text style={styles.tabTitle}>Historique médical</Text>
                {patient.history.map((visit, index) => (
                  <VisitItem key={index} visit={visit} />
                ))}
              </View>
            )}

            {activeTab === "appointments" && (
              <View style={styles.appointmentsTab}>
                <View style={styles.tabTitleContainer}>
                  <Text style={styles.tabTitle}>Rendez-vous</Text>
                  <TouchableOpacity style={styles.newAppointmentButton}>
                    <Text style={styles.newAppointmentButtonText}>Nouveau RDV</Text>
                  </TouchableOpacity>
                </View>
                {patient.appointments.map((appointment, index) => (
                  <AppointmentItem key={index} appointment={appointment} />
                ))}
              </View>
            )}

            {activeTab === "documents" && (
              <View style={styles.documentsTab}>
                <View style={styles.tabTitleContainer}>
                  <Text style={styles.tabTitle}>Documents</Text>
                  <TouchableOpacity style={styles.addDocumentButton}>
                    <Text style={styles.addDocumentButtonText}>Ajouter</Text>
                  </TouchableOpacity>
                </View>
                {patient.documents.map((document, index) => (
                  <DocumentItem key={index} document={document} />
                ))}
              </View>
            )}
          </View>
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
    marginLeft: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  editButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2b7a78",
  },
  editButtonText: {
    color: "#2b7a78",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileSubInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  infoSection: {
    marginTop: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginTop: 2,
  },
  allergyTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  allergyTag: {
    backgroundColor: "#ffebee",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  allergyTagText: {
    color: "#e53935",
    fontSize: 12,
    fontWeight: "500",
  },
  tabsContainer: {
    margin: 16,
    marginTop: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tabsHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#2b7a78",
  },
  tabButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeTabButtonText: {
    color: "#2b7a78",
    fontWeight: "bold",
  },
  tabContent: {
    padding: 16,
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  tabTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  newAppointmentButton: {
    backgroundColor: "#2b7a78",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  newAppointmentButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  addDocumentButton: {
    backgroundColor: "#2b7a78",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addDocumentButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  historyTab: {},
  visitItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 16,
    marginBottom: 16,
  },
  visitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  visitDate: {
    fontWeight: "600",
    color: "#333",
  },
  visitDoctor: {
    color: "#2b7a78",
    fontWeight: "500",
  },
  visitNotes: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    lineHeight: 20,
  },
  prescriptionContainer: {
    marginTop: 4,
  },
  prescriptionLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  prescriptionTags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  prescriptionTag: {
    backgroundColor: "#e0f2f1",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  prescriptionTagText: {
    color: "#2b7a78",
    fontSize: 12,
    fontWeight: "500",
  },
  appointmentsTab: {},
  appointmentItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  appointmentDate: {
    fontWeight: "600",
    color: "#333",
  },
  statusTag: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  appointmentDetails: {
    flexDirection: "row",
    marginBottom: 8,
  },
  appointmentDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  appointmentDetailText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 4,
  },
  appointmentType: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2b7a78",
  },
  documentsTab: {},
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0f2f1",
    justifyContent: "center",
    alignItems: "center",
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  documentName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  documentDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  documentButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  documentButtonText: {
    color: "#2b7a78",
    fontWeight: "600",
  },
})


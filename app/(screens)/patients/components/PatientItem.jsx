import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

/**
 * Composant pour afficher un patient dans la liste
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.patient - Les données du patient
 * @param {Function} props.onPress - Fonction appelée lors du clic sur le patient
 */
const PatientItem = ({ patient, onPress }) => {
  return (
    <TouchableOpacity style={styles.patientItem} onPress={onPress}>
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>
          {patient.nom} {patient.prenom}
        </Text>
        <Text style={styles.patientDetails}>
          {patient.genre === 1 ? "Homme" : "Femme"} • {patient.date_naissance}
        </Text>
        <Text style={styles.patientDetails}>Dossier: {patient.numero_dossier}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  patientItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 14,
    color: "#666",
  },
})

export default PatientItem

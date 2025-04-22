import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fr";

moment.locale('fr');

/**
 * Composant pour afficher un patient dans la liste
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.patient - Les données du patient
 * @param {Function} props.onPress - Fonction appelée lors du clic sur le patient
 */
const PatientItem = ({ patient, onPress }) => {
  // Calcul de l'âge à partir de la date de naissance
  const calculateAge = (birthDate) => {
    return moment().diff(moment(birthDate), 'years');
  };

  // Formatage de la date de naissance
  const formattedBirthDate = moment(patient.date_naissance).format('LL');

  return (
    <TouchableOpacity 
      style={styles.patientItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Ionicons 
          name={patient.genre === 1 ? "male" : "female"} 
          size={24} 
          color={patient.genre === 1 ? "#4A90E2" : "#E91E63"} 
        />
      </View>

      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>
          {patient.nom.toUpperCase()} {patient.prenom}
        </Text>
        
        <View style={styles.detailsRow}>
          <Ionicons name="calendar" size={14} color="#666" />
          <Text style={styles.patientDetails}>
            {calculateAge(patient.date_naissance)} ans • {formattedBirthDate}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <Ionicons name="document-text" size={14} color="#666" />
          <Text style={styles.patientDetails}>
            Dossier: {patient.numero_dossier}
          </Text>
        </View>

        {patient.derniere_consultation && (
          <View style={styles.lastConsultation}>
            <Text style={styles.consultationText}>
              Dernière visite: {moment(patient.derniere_consultation).format('LL')}
            </Text>
          </View>
        )}
      </View>

      <Ionicons 
        name="chevron-forward" 
        size={20} 
        color="#999" 
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

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
    borderLeftWidth: 4,
    borderLeftColor: "#2b7a78",
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2b7a78",
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  patientDetails: {
    fontSize: 13,
    color: "#666",
    marginLeft: 6,
  },
  lastConsultation: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  consultationText: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
  chevron: {
    marginLeft: 8,
  },
});

export default PatientItem;
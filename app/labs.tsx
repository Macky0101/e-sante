import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"

export default function labs() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2b7a78" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Laboratoires</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Mes analyses de laboratoire</Text>

        <View style={styles.labCard}>
          <View style={styles.labCardHeader}>
            <Text style={styles.labName}>Analyse sanguine</Text>
            <Text style={styles.labDate}>15 Mai 2024</Text>
          </View>
          <View style={styles.labCardContent}>
            <Text style={styles.labDetail}>Glycémie: 0.95 g/L</Text>
            <Text style={styles.labDetail}>Cholestérol: 1.8 g/L</Text>
            <Text style={styles.labDetail}>Triglycérides: 1.2 g/L</Text>
          </View>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Voir les détails</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.labCard}>
          <View style={styles.labCardHeader}>
            <Text style={styles.labName}>Analyse d'urine</Text>
            <Text style={styles.labDate}>10 Avril 2024</Text>
          </View>
          <View style={styles.labCardContent}>
            <Text style={styles.labDetail}>pH: 6.5</Text>
            <Text style={styles.labDetail}>Protéines: Négatif</Text>
            <Text style={styles.labDetail}>Glucose: Négatif</Text>
          </View>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Voir les détails</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    color: "#333",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  labCard: {
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
  labCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  labName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  labDate: {
    fontSize: 14,
    color: "#666",
  },
  labCardContent: {
    marginBottom: 16,
  },
  labDetail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  viewButton: {
    backgroundColor: "#e6f2f1",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#2b7a78",
    fontWeight: "600",
  },
})


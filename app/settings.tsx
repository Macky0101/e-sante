import { useRouter } from "expo-router"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

export default function SettingsScreen() {
const router = useRouter()
    
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity  onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2b7a78" />
        </TouchableOpacity>
      <Text style={styles.text}>Paramètres</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },

})


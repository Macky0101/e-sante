import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

/**
 * Composant de case à cocher réutilisable
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.label - Le libellé du champ
 * @param {boolean} props.checked - Si la case est cochée
 * @param {Function} props.onValueChange - Fonction appelée lors du changement d'état
 * @param {boolean} props.required - Si le champ est obligatoire
 * @param {string} props.error - Message d'erreur à afficher
 * @param {Object} props.style - Styles supplémentaires
 */
const CheckboxField = ({ label, checked, onValueChange, required = false, error = "", style = {} }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.checkboxContainer} onPress={() => onValueChange(!checked)} activeOpacity={0.7}>
        <View style={[styles.checkbox, checked ? styles.checkboxChecked : {}, error ? styles.checkboxError : {}]}>
          {checked && <Ionicons name="checkmark" size={16} color="#fff" />}
        </View>
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#2b7a78",
    borderColor: "#2b7a78",
  },
  checkboxError: {
    borderColor: "#e53935",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  required: {
    color: "#e53935",
  },
  errorText: {
    color: "#e53935",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 32,
  },
})

export default CheckboxField

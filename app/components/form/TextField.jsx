import { View, Text, TextInput, StyleSheet } from "react-native"

/**
 * Composant de champ de texte réutilisable
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.label - Le libellé du champ
 * @param {string} props.value - La valeur du champ
 * @param {Function} props.onChangeText - Fonction appelée lors de la modification du texte
 * @param {string} props.placeholder - Texte d'indication
 * @param {boolean} props.required - Si le champ est obligatoire
 * @param {string} props.error - Message d'erreur à afficher
 * @param {Object} props.style - Styles supplémentaires
 * @param {Object} props.inputProps - Propriétés supplémentaires pour le TextInput
 */
const TextField = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  required = false,
  error = "",
  style = {},
  inputProps = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <TextInput
        style={[styles.input, error ? styles.inputError : {}]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        {...inputProps}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    color: "#333",
  },
  required: {
    color: "#e53935",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  inputError: {
    borderColor: "#e53935",
  },
  errorText: {
    color: "#e53935",
    fontSize: 12,
    marginTop: 4,
  },
})

export default TextField

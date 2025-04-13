import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

/**
 * Composant de bouton radio réutilisable
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.label - Le libellé du groupe de boutons radio
 * @param {string|number} props.value - La valeur sélectionnée
 * @param {Function} props.onValueChange - Fonction appelée lors de la sélection
 * @param {Array} props.options - Liste des options disponibles
 * @param {boolean} props.required - Si le champ est obligatoire
 * @param {string} props.error - Message d'erreur à afficher
 * @param {Object} props.style - Styles supplémentaires
 */
const RadioField = ({ label, value, onValueChange, options = [], required = false, error = "", style = {} }) => {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.groupLabel}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.radioOption}
            onPress={() => onValueChange(option.value)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.radioButton,
                error ? styles.radioButtonError : {},
                value === option.value ? styles.radioButtonSelected : {},
              ]}
            >
              {value === option.value && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.radioLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  groupLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    color: "#333",
  },
  required: {
    color: "#e53935",
  },
  optionsContainer: {
    marginTop: 4,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#2b7a78",
  },
  radioButtonError: {
    borderColor: "#e53935",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2b7a78",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    color: "#e53935",
    fontSize: 12,
    marginTop: 4,
  },
})

export default RadioField

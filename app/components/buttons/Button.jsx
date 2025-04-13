import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native"

/**
 * Composant de bouton réutilisable
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.title - Le texte du bouton
 * @param {Function} props.onPress - Fonction appelée lors du clic
 * @param {string} props.variant - Variante du bouton (primary, secondary, danger)
 * @param {boolean} props.loading - Si le bouton est en état de chargement
 * @param {boolean} props.disabled - Si le bouton est désactivé
 * @param {Object} props.style - Styles supplémentaires
 * @param {Object} props.textStyle - Styles supplémentaires pour le texte
 */
const Button = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style = {},
  textStyle = {},
}) => {
  // Déterminer les styles en fonction de la variante
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.buttonSecondary
      case "danger":
        return styles.buttonDanger
      case "outline":
        return styles.buttonOutline
      default:
        return styles.buttonPrimary
    }
  }

  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.textSecondary
      case "danger":
        return styles.textDanger
      case "outline":
        return styles.textOutline
      default:
        return styles.textPrimary
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), (disabled || loading) && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === "outline" ? "#2b7a78" : "#fff"} />
      ) : (
        <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 120,
  },
  buttonPrimary: {
    backgroundColor: "#2b7a78",
  },
  buttonSecondary: {
    backgroundColor: "#def2f1",
  },
  buttonDanger: {
    backgroundColor: "#e53935",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#2b7a78",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  textPrimary: {
    color: "#fff",
  },
  textSecondary: {
    color: "#2b7a78",
  },
  textDanger: {
    color: "#fff",
  },
  textOutline: {
    color: "#2b7a78",
  },
})

export default Button

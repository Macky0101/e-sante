import { View, ActivityIndicator, StyleSheet, Text } from "react-native"

/**
 * Composant d'indicateur de chargement
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.visible - Si l'indicateur est visible
 * @param {string} props.text - Texte à afficher
 * @param {string} props.size - Taille de l'indicateur (small, large)
 * @param {string} props.color - Couleur de l'indicateur
 * @param {boolean} props.overlay - Si l'indicateur doit être affiché en superposition
 */
const LoadingIndicator = ({
  visible = true,
  text = "Chargement...",
  size = "large",
  color = "#2b7a78",
  overlay = false,
}) => {
  if (!visible) return null

  return (
    <View style={[styles.container, overlay ? styles.overlay : null]}>
      <View style={styles.loader}>
        <ActivityIndicator size={size} color={color} />
        {text ? <Text style={styles.text}>{text}</Text> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 1000,
  },
  loader: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
})

export default LoadingIndicator

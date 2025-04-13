import { View, StyleSheet } from "react-native"
import Button from "./Button"

/**
 * Composant de groupe de boutons (Enregistrer et Annuler)
 * @param {Object} props - Les propriétés du composant
 * @param {Function} props.onSave - Fonction appelée lors du clic sur Enregistrer
 * @param {Function} props.onCancel - Fonction appelée lors du clic sur Annuler
 * @param {boolean} props.loading - Si le bouton Enregistrer est en état de chargement
 * @param {boolean} props.disabled - Si le bouton Enregistrer est désactivé
 * @param {string} props.saveText - Texte du bouton Enregistrer
 * @param {string} props.cancelText - Texte du bouton Annuler
 * @param {Object} props.style - Styles supplémentaires
 */
const ButtonGroup = ({
  onSave,
  onCancel,
  loading = false,
  disabled = false,
  saveText = "Enregistrer",
  cancelText = "Annuler",
  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <Button title={cancelText} onPress={onCancel} variant="outline" disabled={loading} style={styles.cancelButton} />
      <Button title={saveText} onPress={onSave} loading={loading} disabled={disabled} style={styles.saveButton} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
  },
})

export default ButtonGroup

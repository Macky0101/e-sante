import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import DatePicker from "react-native-date-picker"
import { Ionicons } from "@expo/vector-icons"

/**
 * Composant de sélection de date réutilisable
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.label - Le libellé du champ
 * @param {Date} props.value - La valeur du champ (objet Date)
 * @param {Function} props.onValueChange - Fonction appelée lors de la sélection d'une date
 * @param {string} props.placeholder - Texte d'indication
 * @param {boolean} props.required - Si le champ est obligatoire
 * @param {string} props.error - Message d'erreur à afficher
 * @param {Object} props.style - Styles supplémentaires
 * @param {string} props.mode - Mode du sélecteur (date, time, datetime)
 * @param {string} props.format - Format d'affichage de la date (DD/MM/YYYY par défaut)
 */
const DateField = ({
  label,
  value,
  onValueChange,
  placeholder = "Sélectionner une date",
  required = false,
  error = "",
  style = {},
  mode = "date",
  format = "DD/MM/YYYY",
}) => {
  const [open, setOpen] = useState(false)

  // Convertir la valeur en objet Date si c'est une chaîne
  const dateValue = value ? (typeof value === "string" ? new Date(value) : value) : null

  // Formater la date pour l'affichage
  const formatDate = (date) => {
    if (!date) return ""

    if (mode === "date" || mode === "datetime") {
      const day = String(date.getDate()).padStart(2, "0")
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const year = date.getFullYear()

      if (mode === "date") {
        return `${day}/${month}/${year}`
      } else {
        const hours = String(date.getHours()).padStart(2, "0")
        const minutes = String(date.getMinutes()).padStart(2, "0")
        return `${day}/${month}/${year} ${hours}:${minutes}`
      }
    } else if (mode === "time") {
      const hours = String(date.getHours()).padStart(2, "0")
      const minutes = String(date.getMinutes()).padStart(2, "0")
      return `${hours}:${minutes}`
    }

    return ""
  }

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.selectButton, error ? styles.selectButtonError : {}]}
        onPress={() => setOpen(true)}
      >
        <Text style={[styles.selectText, !dateValue && styles.placeholderText]}>
          {dateValue ? formatDate(dateValue) : placeholder}
        </Text>
        <Ionicons name="calendar" size={20} color="#666" />
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <DatePicker
        modal
        open={open}
        date={dateValue || new Date()}
        mode={mode}
        onConfirm={(date) => {
          setOpen(false)
          onValueChange(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        title={label || "Sélectionner une date"}
        confirmText="Confirmer"
        cancelText="Annuler"
        androidVariant="nativeAndroid"
      />
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
  selectButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectButtonError: {
    borderColor: "#e53935",
  },
  selectText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    color: "#999",
  },
  errorText: {
    color: "#e53935",
    fontSize: 12,
    marginTop: 4,
  },
})

export default DateField

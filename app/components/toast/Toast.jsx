"use client"

import { useEffect, useRef } from "react"
import { Animated, Text, StyleSheet, View, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

/**
 * Composant Toast pour afficher des messages
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} props.visible - Si le toast est visible
 * @param {string} props.message - Le message à afficher
 * @param {string} props.type - Le type de toast (success, error, info, warning)
 * @param {Function} props.onDismiss - Fonction appelée lors de la fermeture
 * @param {number} props.duration - Durée d'affichage en ms
 */
const Toast = ({ visible, message, type = "info", onDismiss, duration = 3000 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (visible) {
      // Réinitialiser le timeout si le toast est déjà visible
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Animation d'entrée
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()

      // Définir le timeout pour fermer automatiquement
      timeoutRef.current = setTimeout(() => {
        dismiss()
      }, duration)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [visible, message, type])

  const dismiss = () => {
    // Animation de sortie
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onDismiss) {
        onDismiss()
      }
    })
  }

  if (!visible) return null

  // Déterminer l'icône et la couleur en fonction du type
  const getIconAndColor = () => {
    switch (type) {
      case "success":
        return { icon: "checkmark-circle", color: "#4caf50", bgColor: "#e8f5e9" }
      case "error":
        return { icon: "close-circle", color: "#f44336", bgColor: "#ffebee" }
      case "warning":
        return { icon: "warning", color: "#ff9800", bgColor: "#fff3e0" }
      default:
        return { icon: "information-circle", color: "#2196f3", bgColor: "#e3f2fd" }
    }
  }

  const { icon, color, bgColor } = getIconAndColor()

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor, opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Ionicons name={icon} size={24} color={color} style={styles.icon} />
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity onPress={dismiss} style={styles.closeButton}>
        <Ionicons name="close" size={20} color="#666" />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  message: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
})

export default Toast

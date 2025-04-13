"use client"

import { createContext, useContext, useState, useCallback } from "react"
import Toast from "./Toast"

// Créer le contexte
const ToastContext = createContext()

/**
 * Hook personnalisé pour utiliser le toast
 */
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast doit être utilisé à l'intérieur d'un ToastProvider")
  }
  return context
}

/**
 * Provider pour le système de toast
 */
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info",
    duration: 3000,
  })

  // Fonction pour afficher un toast
  const showToast = useCallback(({ message, type = "info", duration = 3000 }) => {
    setToast({
      visible: true,
      message,
      type,
      duration,
    })
  }, [])

  // Fonctions utilitaires pour différents types de toast
  const showSuccess = useCallback(
    (message, duration) => {
      showToast({ message, type: "success", duration })
    },
    [showToast],
  )

  const showError = useCallback(
    (message, duration) => {
      showToast({ message, type: "error", duration })
    },
    [showToast],
  )

  const showInfo = useCallback(
    (message, duration) => {
      showToast({ message, type: "info", duration })
    },
    [showToast],
  )

  const showWarning = useCallback(
    (message, duration) => {
      showToast({ message, type: "warning", duration })
    },
    [showToast],
  )

  // Fonction pour masquer le toast
  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  // Valeur du contexte
  const value = {
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    hideToast,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        duration={toast.duration}
        onDismiss={hideToast}
      />
    </ToastContext.Provider>
  )
}

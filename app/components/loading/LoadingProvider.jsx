"use client"

import { createContext, useContext, useState, useCallback } from "react"
import LoadingIndicator from "./LoadingIndicator"

// Créer le contexte
const LoadingContext = createContext()

/**
 * Hook personnalisé pour utiliser le loading
 */
export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading doit être utilisé à l'intérieur d'un LoadingProvider")
  }
  return context
}

/**
 * Provider pour le système de loading
 */
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState({
    visible: false,
    text: "Chargement...",
  })

  // Fonction pour afficher le loading
  const showLoading = useCallback((text = "Chargement...") => {
    setLoading({
      visible: true,
      text,
    })
  }, [])

  // Fonction pour masquer le loading
  const hideLoading = useCallback(() => {
    setLoading((prev) => ({ ...prev, visible: false }))
  }, [])

  // Valeur du contexte
  const value = {
    showLoading,
    hideLoading,
    isLoading: loading.visible,
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <LoadingIndicator visible={loading.visible} text={loading.text} overlay={true} />
    </LoadingContext.Provider>
  )
}

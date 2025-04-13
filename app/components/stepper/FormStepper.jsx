import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions } from "react-native"
import Button from "../buttons/Button"

/**
 * Composant pour diviser un formulaire en étapes
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.steps - Liste des étapes (objets avec title et component)
 * @param {Function} props.onComplete - Fonction appelée à la fin du formulaire
 * @param {Function} props.onCancel - Fonction appelée lors de l'annulation
 * @param {boolean} props.loading - Si le formulaire est en chargement
 */
const FormStepper = ({ steps = [], onComplete, onCancel, loading = false }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(false)
  const scrollX = useRef(new Animated.Value(0)).current
  const scrollViewRef = useRef(null)
  const { width } = Dimensions.get("window")

  // Vérifier si on est à la première étape
  const isFirstStep = currentStep === 0
  // Vérifier si on est à la dernière étape
  const isLastStep = currentStep === steps.length - 1

  // Fonction pour aller à l'étape suivante
  const handleNext = () => {
    if (isLastStep) {
      setCompleted(true)
      if (onComplete) {
        onComplete()
      }
    } else {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      scrollViewRef.current?.scrollTo({ x: nextStep * width, animated: true })
    }
  }

  // Fonction pour revenir à l'étape précédente
  const handleBack = () => {
    if (isFirstStep) {
      if (onCancel) {
        onCancel()
      }
    } else {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      scrollViewRef.current?.scrollTo({ x: prevStep * width, animated: true })
    }
  }

  // Gérer le défilement
  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })

  // Mettre à jour l'étape actuelle lors du défilement
  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      const step = Math.round(value / width)
      if (step !== currentStep) {
        setCurrentStep(step)
      }
    })

    return () => {
      scrollX.removeListener(listener)
    }
  }, [currentStep, scrollX, width])

  return (
    <View style={styles.container}>
      {/* Indicateur d'étapes */}
      <View style={styles.stepsIndicator}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepIndicatorContainer}>
            <View style={[styles.stepIndicator, index <= currentStep ? styles.activeStepIndicator : {}]}>
              <Text style={[styles.stepNumber, index <= currentStep ? styles.activeStepNumber : {}]}>{index + 1}</Text>
            </View>
            {index < steps.length - 1 && (
              <View style={[styles.stepConnector, index < currentStep ? styles.activeStepConnector : {}]} />
            )}
          </View>
        ))}
      </View>

      {/* Titre de l'étape actuelle */}
      <Text style={styles.stepTitle}>{steps[currentStep]?.title || ""}</Text>

      {/* Contenu des étapes */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.stepsContainer}
      >
        {steps.map((step, index) => (
          <View key={index} style={[styles.stepContent, { width }]}>
            {step.component}
          </View>
        ))}
      </ScrollView>

      {/* Boutons de navigation */}
      <View style={styles.buttonsContainer}>
        <Button
          title={isFirstStep ? "Annuler" : "Retour"}
          variant="outline"
          onPress={handleBack}
          style={styles.button}
          disabled={loading}
        />
        <Button
          title={isLastStep ? "Enregistrer" : "Suivant"}
          onPress={handleNext}
          style={styles.button}
          loading={isLastStep && loading}
          disabled={loading && !isLastStep}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  stepsIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  activeStepIndicator: {
    backgroundColor: "#2b7a78",
    borderColor: "#2b7a78",
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  activeStepNumber: {
    color: "#fff",
  },
  stepConnector: {
    width: 40,
    height: 2,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 5,
  },
  activeStepConnector: {
    backgroundColor: "#2b7a78",
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  stepsContainer: {
    flex: 1,
  },
  stepContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
})

export default FormStepper

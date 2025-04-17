// import { useState, useEffect } from "react"
// import { View, Text, StyleSheet, ScrollView } from "react-native"
// import { useRouter, useLocalSearchParams } from "expo-router"
// import { SafeAreaView } from "react-native-safe-area-context"
// import { Ionicons } from "@expo/vector-icons"

// import Header from "../../components/header/Header"
// import Button from "../../components/buttons/Button"
// import LoadingIndicator from "../../components/loading/LoadingIndicator"
// import { useToast } from "../../components/toast/ToastProvider"
// import planningService from "../../services/planningService"

// export default function PlanningDetailsScreen() {
//   const router = useRouter()
//   const params = useLocalSearchParams()
//   const planningId = params.id

//   const [planning, setPlanning] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const toast = useToast()

//   useEffect(() => {
//     loadPlanning()
//   }, [planningId])

//   const loadPlanning = async () => {
//     try {
//       setLoading(true)
//       const data = await planningService.getPlanningById(planningId)
//       setPlanning(data)
//     } catch (error) {
//       toast.showError(`Erreur lors du chargement de la consultation: ${error.message}`)
//       router.back()
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleEdit = () => {
//     router.push({
//       pathname: "/(screens)/planning/planning-form",
//       params: { id: planningId },
//     })
//   }

//   const handleDelete = async () => {
//     try {
//       await planningService.deletePlanning(planningId)
//       toast.showSuccess("Consultation de planning supprimée avec succès")
//       router.back()
//     } catch (error) {
//       if (error.message !== "Suppression annulée") {
//         toast.showError(`Erreur: ${error.message}`)
//       }
//     }
//   }

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Header title="Détails de la consultation" />
//         <LoadingIndicator />
//       </SafeAreaView>
//     )
//   }

//   if (!planning) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Header title="Détails de la consultation" />
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>Consultation non trouvée</Text>
//         </View>
//       </SafeAreaView>
//     )
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Détails de la consultation" />

//       <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Text style={styles.cardTitle}>Informations patient</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Nom</Text>
//             <Text style={styles.infoValue}>{planning.patient.nom}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Prénom</Text>
//             <Text style={styles.infoValue}>{planning.patient.prenom}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Date de naissance</Text>
//             <Text style={styles.infoValue}>{planning.patient.date_naissance}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Genre</Text>
//             <Text style={styles.infoValue}>{planning.patient.genre === 1 ? "Homme" : "Femme"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Numéro de dossier</Text>
//             <Text style={styles.infoValue}>{planning.numero_dossier}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Date de visite</Text>
//             <Text style={styles.infoValue}>{planning.visite}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Nombre d'enfants vivants</Text>
//             <Text style={styles.infoValue}>{planning.nombre_enfant_vivant || "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Allergies</Text>
//             <Text style={styles.infoValue}>{planning.allergies || "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Âge première règle</Text>
//             <Text style={styles.infoValue}>{planning.age_premiere_regle || "-"}</Text>
//           </View>
//         </View>

//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Text style={styles.cardTitle}>Signes vitaux et examen</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Poids</Text>
//             <Text style={styles.infoValue}>{planning["P(kg)"] ? `${planning["P(kg)"]} kg` : "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Taille</Text>
//             <Text style={styles.infoValue}>{planning.taille ? `${planning.taille} cm` : "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Tension artérielle</Text>
//             <Text style={styles.infoValue}>{planning["TA(mmHg)"] || "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Conjonctive</Text>
//             <Text style={styles.infoValue}>{planning.conjonctive || "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>OMI</Text>
//             <Text style={styles.infoValue}>{planning.omi || "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Inspection</Text>
//             <Text style={styles.infoValue}>{planning.inspection || "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Examen des seins</Text>
//             <View style={styles.iconContainer}>
//               {planning.examen_seins ? (
//                 <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
//               ) : (
//                 <Ionicons name="close-circle" size={20} color="#f44336" />
//               )}
//             </View>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Recherche de ganglions</Text>
//             <View style={styles.iconContainer}>
//               {planning.recherche_ganglions ? (
//                 <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
//               ) : (
//                 <Ionicons name="close-circle" size={20} color="#f44336" />
//               )}
//             </View>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Examen utérin (TV)</Text>
//             <View style={styles.iconContainer}>
//               {planning.examen_uterin_TV ? (
//                 <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
//               ) : (
//                 <Ionicons name="close-circle" size={20} color="#f44336" />
//               )}
//             </View>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Col</Text>
//             <Text style={styles.infoValue}>{planning.planningcol || "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Présence de sucre</Text>
//             <Text style={styles.infoValue}>{planning.presence_sucre || "-"}</Text>
//           </View>
//         </View>

//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Text style={styles.cardTitle}>Méthode contraceptive</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Renouvellement</Text>
//             <View style={styles.iconContainer}>
//               {planning.renouvellement ? (
//                 <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
//               ) : (
//                 <Ionicons name="close-circle" size={20} color="#f44336" />
//               )}
//             </View>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Méthode</Text>
//             <Text style={styles.infoValue}>{planning.methode || "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Précision méthode</Text>
//             <Text style={styles.infoValue}>{planning.precision_methode || "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Nature du produit</Text>
//             <Text style={styles.infoValue}>{planning.nature_produit || "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Quantité fournie</Text>
//             <Text style={styles.infoValue}>{planning.quantite_fournie || "-"}</Text>
//           </View>

//           {!planning.renouvellement && (
//             <View style={styles.infoRow}>
//               <Text style={styles.infoLabel}>Si arrêt, précisez</Text>
//               <Text style={styles.infoValue}>{planning.si_arret || "-"}</Text>
//             </View>
//           )}

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Arrêt</Text>
//             <Text style={styles.infoValue}>{planning.arret || "-"}</Text>
//           </View>
//         </View>

//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Text style={styles.cardTitle}>Suivi et prévention</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Counseling PF</Text>
//             <Text style={styles.infoValue}>{planning.counseling_pf || "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Besoin d'analyse</Text>
//             <Text style={styles.infoValue}>{planning.besoin_analyse || "-"}</Text>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Moustiquaire imprégnée</Text>
//             <View style={styles.iconContainer}>
//               {planning.moustiquaire_impregnee ? (
//                 <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
//               ) : (
//                 <Ionicons name="close-circle" size={20} color="#f44336" />
//               )}
//             </View>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Référencement interne</Text>
//             <View style={styles.iconContainer}>
//               {planning.referencement_interne ? (
//                 <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
//               ) : (
//                 <Ionicons name="close-circle" size={20} color="#f44336" />
//               )}
//             </View>
//           </View>

//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Complément d'information</Text>
//             <View style={styles.iconContainer}>
//               {planning.complement_information ? (
//                 <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
//               ) : (
//                 <Ionicons name="close-circle" size={20} color="#f44336" />
//               )}
//             </View>
//           </View>
//         </View>

//         <View style={styles.buttonsContainer}>
//           <Button title="Modifier" variant="outline" onPress={handleEdit} style={styles.button} />
//           <Button title="Supprimer" variant="danger" onPress={handleDelete} style={styles.button} />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   content: {
//     padding: 16,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//     overflow: "hidden",
//   },
//   cardHeader: {
//     backgroundColor: "#2b7a78",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//   },
//   infoLabel: {
//     fontSize: 14,
//     color: "#666",
//     flex: 1,
//   },
//   infoValue: {
//     fontSize: 14,
//     color: "#333",
//     fontWeight: "500",
//     flex: 2,
//     textAlign: "right",
//   },
//   iconContainer: {
//     flex: 2,
//     alignItems: "flex-end",
//   },
//   buttonsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 8,
//     marginBottom: 24,
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: 8,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     fontSize: 16,
//     color: "#666",
//   },
// })

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from "react-native"
import { useRouter } from "expo-router"
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { SafeAreaView } from 'react-native-safe-area-context';

// Données des spécialités médicales
const specialties = [
  {
    id: "0",
    name: "Patient",
    icon: "account-circle",
    iconType: "materialcommunity",
    color: "#4CAF50",
    description: "Gestion des patients",
  },
  {
    id: "1",
    name: "Médecine générale",
    icon: "medical-bag",
    iconType: "materialcommunity",
    color: "#4CAF50",
    description: "Consultations et soins médicaux généraux",
  },
  {
    id: "2",
    name: "Dentiste",
    icon: "tooth",
    iconType: "materialcommunity",
    color: "#2196F3",
    description: "Soins dentaires et hygiène bucco-dentaire",
  },
  {
    id: "3",
    name: "Gynécologie",
    icon: "baby",
    iconType: "fontawesome",
    color: "#E91E63",
    description: "Suivi de grossesse et accouchement",
  },
  {
    id: "4",
    name: "Dermatologie",
    icon: "allergy",
    iconType: "materialcommunity",
    color: "#FF9800",
    description: "Traitement des affections cutanées",
  },
  {
    id: "5",
    name: "Cardiologie",
    icon: "heart-pulse",
    iconType: "materialcommunity",
    color: "#F44336",
    description: "Suivi et traitement des maladies cardiaques",
  },
  {
    id: "6",
    name: "Ophtalmologie",
    icon: "eye",
    iconType: "ionicons",
    color: "#9C27B0",
    description: "Soins des yeux et correction de la vision",
  },
  {
    id: "7",
    name: "Endocrinologie",
    icon: "flask",
    iconType: "fontawesome",
    color: "#00BCD4",
    description: "Traitement des troubles hormonaux",
  },
  {
    id: "8",
    name: "Pédiatrie",
    icon: "baby-carriage",
    iconType: "fontawesome",
    color: "#8BC34A",
    description: "Soins médicaux pour enfants",
  },
  {
    id: "9",
    name: "Neurologie",
    icon: "brain",
    iconType: "fontawesome",
    color: "#607D8B",
    description: "Traitement des troubles du système nerveux",
  },
  {
    id: "10",
    name: "Orthopédie",
    icon: "bone",
    iconType: "fontawesome",
    color: "#795548",
    description: "Traitement des problèmes musculo-squelettiques",
  },
  {
    id: "11",
    name: "Psychiatrie",
    icon: "brain",
    iconType: "materialcommunity",
    color: "#673AB7",
    description: "Soins de santé mentale",
  },
  {
    id: "12",
    name: "ORL",
    icon: "ear-hearing",
    iconType: "materialcommunity",
    color: "#FF5722",
    description: "Oto-rhino-laryngologie",
  },
]

// Composant pour afficher une icône selon son type
const DynamicIcon = ({ name, type, size, color }) => {
  if (type === "ionicons") {
    return <Ionicons name={name} size={size} color={color} />
  } else if (type === "fontawesome") {
    return <FontAwesome5 name={name} size={size} color={color} />
  } else if (type === "materialcommunity") {
    return <MaterialCommunityIcons name={name} size={size} color={color} />
  }
  return null
}

// Composant pour une carte de spécialité
const SpecialtyCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.specialtyCard} onPress={() => onPress(item)} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <DynamicIcon name={item.icon} type={item.iconType} size={24} color="#FFF" />
      </View>
      <Text style={styles.specialtyName}>{item.name}</Text>
      <Text style={styles.specialtyDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  )
}


export default function HomePage() {
  const router = useRouter()
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState("")

  // Filtrer les spécialités en fonction de la recherche
  const filteredSpecialties = searchQuery
    ? specialties.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : specialties

  const handleSpecialtyPress = (specialty) => {
    console.log(`Navigating to ${specialty.name}`)

    // Si vous naviguez vers la liste des patients
    if (specialty.id === "0") {
        router.push("/(screens)/patients/patients");
    }
    // Pour les autres spécialités, vous pouvez passer l'ID comme paramètre
    else {
      // router.push(`/specialties/${specialty.id}`) 
    }
  }


  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

    {/* En-tête */}
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={28} color="#2b7a78" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.greeting}>Bonjour,</Text>
          <Text style={styles.userName}>Mankan Camara</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={40} color="#2b7a78" />
        </TouchableOpacity>
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une spécialité..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
    
      {/* Section des spécialités médicales */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Spécialités médicales</Text>
        </View>

        <View style={styles.specialtiesGrid}>
          {filteredSpecialties.map((specialty) => (
            <SpecialtyCard key={specialty.id} item={specialty} onPress={handleSpecialtyPress} />
          ))}
        </View>
      </View>

      {/* Section des articles de santé */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Articles de santé</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.articlesContainer}>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.articleCard}>
              <Image source={{ uri: `https://picsum.photos/300/200?random=${item}` }} style={styles.articleImage} />
              <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>
                  {item === 1
                    ? "Comment rester en bonne santé"
                    : item === 2
                      ? "Nutrition et bien-être"
                      : "Exercices quotidiens"}
                </Text>
                <Text style={styles.articleDate}>
                  {item === 1 ? "10 Juin 2024" : item === 2 ? "5 Juin 2024" : "1 Juin 2024"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  menuButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  greeting: {
    fontSize: 16,
    color: "#666",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    color: "#2b7a78",
    fontWeight: "600",
  },
  specialtiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  specialtyCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  specialtyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  specialtyDescription: {
    fontSize: 12,
    color: "#666",
  },
  articlesContainer: {
    marginLeft: -8,
    paddingLeft: 8,
  },
  articleCard: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  articleImage: {
    width: "100%",
    height: 140,
  },
  articleContent: {
    padding: 12,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  articleDate: {
    fontSize: 12,
    color: "#666",
  },
})


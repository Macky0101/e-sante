import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation, DrawerActions } from "@react-navigation/native"

/**
 * Composant d'en-tête pour les pages
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.title - Titre de la page
 * @param {Function} props.onBackPress - Fonction appelée lors du clic sur le bouton retour
 * @param {boolean} props.showBack - Si le bouton retour doit être affiché
 * @param {boolean} props.showMenu - Si le bouton menu doit être affiché
 * @param {Object} props.rightComponent - Composant à afficher à droite
 * @param {Object} props.style - Styles supplémentaires
 */
const Header = ({ title, onBackPress, showBack = true, showMenu = true, rightComponent, style = {} }) => {
  const navigation = useNavigation()

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
    <View style={[styles.header, style]}>
      <View style={styles.headerTop}>
        {showBack && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color="#2b7a78" />
          </TouchableOpacity>
        )}
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        {rightComponent
          ? rightComponent
          : showMenu && (
              <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
                <Ionicons name="menu" size={24} color="#2b7a78" />
              </TouchableOpacity>
            )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f8f9fa",
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  menuButton: {
    padding: 8,
  },
})

export default Header

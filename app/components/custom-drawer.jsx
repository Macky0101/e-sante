import React, { useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, Platform } from "react-native"
import { DrawerContentScrollView } from "@react-navigation/drawer"
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"

const { width } = Dimensions.get("window")

const CustomDrawerContent = (props) => {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("home")

  // Animation pour les items du drawer
  const translateX = new Animated.Value(-50)
  const opacity = new Animated.Value(0)

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start()
  }, [opacity, translateX])

  const handleItemPress = (route) => {
    setActiveSection(route)
    router.push(`/${route}`)
  }

  const renderDrawerItem = (icon, label, route, iconType = "ionicons", badge = null) => {
    const isActive = activeSection === route

    return (
      <Animated.View style={[styles.itemContainer, { transform: [{ translateX }], opacity }]}>
        <TouchableOpacity
          style={[styles.drawerItem, isActive && styles.activeItem]}
          onPress={() => handleItemPress(route)}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            {iconType === "ionicons" && <Ionicons name={icon} size={22} color={isActive ? "#2b7a78" : "#555"} />}
            {iconType === "material" && (
              <MaterialCommunityIcons name={icon} size={22} color={isActive ? "#2b7a78" : "#555"} />
            )}
            {iconType === "fontawesome" && <FontAwesome5 name={icon} size={22} color={isActive ? "#2b7a78" : "#555"} />}
          </View>

          <Text style={[styles.drawerLabel, isActive && styles.activeLabel]}>{label}</Text>

          {badge && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}

          {isActive && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Header avec gradient */}
      <LinearGradient colors={["#2b7a78", "#3aafa9"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
        <View style={styles.userInfoSection}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png" }} style={styles.logo} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>HealthCare</Text>
            <Text style={styles.userEmail}>Votre santé, notre priorité</Text>
          </View>
        </View>
      </LinearGradient>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section principale */}
        <View style={styles.drawerSection}>
          <Text style={styles.sectionTitle}>PRINCIPAL</Text>
          {renderDrawerItem("home-outline", "Accueil", "index")}
          {renderDrawerItem("calendar-outline", "Rendez-vous", "patients")}
          {/* {renderDrawerItem("chatbubbles-outline", "Messages", "messages", "ionicons", "3")} */}
          {renderDrawerItem("medical-bag", "Consultations", "dentaire", "material")}
        </View>

        <View style={styles.separator} />

        {/* Section profil */}
        <View style={styles.drawerSection}>
          <Text style={styles.sectionTitle}>PROFIL</Text>
          {/* {renderDrawerItem("person-outline", "Mon profil", "profile")} */}
          {/* {renderDrawerItem("heart-outline", "Mes favoris", "favorites")} */}
          {renderDrawerItem("document-text-outline", "Mes documents", "documents")}
          {renderDrawerItem("medkit-outline", "Mes ordonnances", "prescriptions")}
        </View>

        <View style={styles.separator} />

        {/* Section paramètres */}
        <View style={styles.drawerSection}>
          <Text style={styles.sectionTitle}>PARAMÈTRES</Text>
          {renderDrawerItem("settings-outline", "Paramètres", "settings")}
          {renderDrawerItem("help-circle-outline", "Aide", "help")}
          {renderDrawerItem("shield-checkmark-outline", "Confidentialité", "privacy")}
        </View>
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.bottomDrawerSection}>
        <TouchableOpacity style={styles.signOutButton} onPress={() => router.replace("/login")}>
          <LinearGradient
            colors={["#2b7a78", "#3aafa9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.signOutGradient}
          >
            <Ionicons name="log-out-outline" size={22} color="#fff" />
            <Text style={styles.signOutText}>Se déconnecter</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  userInfoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    padding: 5,
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  userEmail: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
    marginTop: 5,
  },
  drawerContent: {
    paddingTop: 10,
  },
  drawerSection: {
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
    marginLeft: 5,
    marginBottom: 10,
    letterSpacing: 1,
  },
  itemContainer: {
    marginBottom: 5,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    position: "relative",
  },
  activeItem: {
    backgroundColor: "#e6f2f1",
  },
  iconContainer: {
    width: 24,
    alignItems: "center",
  },
  drawerLabel: {
    fontSize: 16,
    marginLeft: 15,
    fontWeight: "500",
    color: "#555",
  },
  activeLabel: {
    color: "#2b7a78",
    fontWeight: "600",
  },
  activeIndicator: {
    position: "absolute",
    left: 0,
    top: 8,
    bottom: 8,
    width: 4,
    backgroundColor: "#2b7a78",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  badgeContainer: {
    backgroundColor: "#ff6b6b",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#e1e1e1",
    marginVertical: 15,
    marginHorizontal: 15,
  },
  bottomDrawerSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
  },
  signOutButton: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  signOutGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  versionText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
})

export default CustomDrawerContent


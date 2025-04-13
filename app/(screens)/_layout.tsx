import { Drawer } from "expo-router/drawer"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import CustomDrawerContent from "../components/custom-drawer"

export default function ScreensLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: "75%",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            overflow: "hidden",
          },
          swipeEdgeWidth: 100,
        }}
      >
        {/* Page d'accueil */}
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "index",
            drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
          }}
        />

        {/* Spécialités médicales */}
        <Drawer.Screen
          name="patients"
          options={{
            drawerLabel: "Patients",
            drawerIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} />,
          }}
        />
        
        <Drawer.Screen
          name="dentaire"
          options={{
            drawerLabel: "Dentaire",
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="tooth-outline" size={22} color={color} />,
          }}
        />
        
        {/* <Drawer.Screen
          name="consultation"
          options={{
            drawerLabel: "Consultations",
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="medical-bag" size={22} color={color} />,
          }}
        />
        
        <Drawer.Screen
          name="analyse"
          options={{
            drawerLabel: "Analyses",
            drawerIcon: ({ color }) => <Ionicons name="flask-outline" size={22} color={color} />,
          }}
        />
        
        <Drawer.Screen
          name="pharmacie"
          options={{
            drawerLabel: "Pharmacie",
            drawerIcon: ({ color }) => <Ionicons name="medkit-outline" size={22} color={color} />,
          }}
        />
        
        <Drawer.Screen
          name="vaccins"
          options={{
            drawerLabel: "Vaccins",
            drawerIcon: ({ color }) => <Ionicons name="fitness-outline" size={22} color={color} />,
          }}
        /> */}

        {/* Autres sections */}
        {/* <Drawer.Screen
          name="appointments"
          options={{
            drawerLabel: "Rendez-vous",
            drawerIcon: ({ color }) => <Ionicons name="calendar-outline" size={22} color={color} />,
          }}
        />
        
        <Drawer.Screen
          name="messages"
          options={{
            drawerLabel: "Messages",
            drawerIcon: ({ color }) => <Ionicons name="chatbubbles-outline" size={22} color={color} />,
          }}
        />
        
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profil",
            drawerIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />,
          }}
        />
        
        <Drawer.Screen
          name="documents"
          options={{
            drawerLabel: "Mes documents",
            drawerIcon: ({ color }) => <Ionicons name="document-text-outline" size={22} color={color} />,
          }}
        /> */}

        {/* Pour les pages à la racine, utilisez le format correct */}
        {/* <Drawer.Screen
          name="../labs"
          options={{
            drawerLabel: "Mes ordonnances",
            drawerIcon: ({ color }) => <Ionicons name="medkit-outline" size={22} color={color} />,
          }}
        /> */}
        
        <Drawer.Screen
          name="../settings"
          options={{
            drawerLabel: "Paramètres",
            drawerIcon: ({ color }) => <Ionicons name="settings-outline" size={22} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}
// import React from "react";
// import { StyleSheet } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRouter } from "expo-router";

// import Header from "../components/header/Header";
// import SyncManager from "../components/sync/SyncManager";

// export default function SyncScreen() {
//   const router = useRouter();

//   const handleClose = () => {
//     router.back();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Synchronisation" />
//       <SyncManager onClose={handleClose} />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//   },
// });
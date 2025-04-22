import { Stack } from "expo-router";

export default function ConsultationsLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="consultations"
        options={{
          title: "Liste des patients"
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Détails du patient"
        }}
      />
    </Stack>
  );
}
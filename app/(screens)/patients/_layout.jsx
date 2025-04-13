import { Stack } from "expo-router";

export default function PatientsLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="patients"
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
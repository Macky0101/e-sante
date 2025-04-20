import { Stack } from "expo-router";

export default function AccouchementsLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="accouchements"
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
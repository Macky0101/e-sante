"use client"

import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import PatientItem from "./PatientItem"
import LoadingIndicator from "../../../components/loading/LoadingIndicator"

/**
 * Composant pour afficher la liste des patients
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.patients - Liste des patients
 * @param {boolean} props.loading - Si la liste est en chargement
 * @param {Function} props.onPatientPress - Fonction appelée lors du clic sur un patient
 * @param {Function} props.onAddPress - Fonction appelée lors du clic sur le bouton d'ajout
 * @param {Function} props.onSearch - Fonction appelée lors de la recherche
 */
const PatientList = ({ patients = [], loading = false, onPatientPress, onAddPress, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (text) => {
    setSearchQuery(text)
    if (onSearch) {
      onSearch(text)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un patient..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => handleSearch("")}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        ) : null}
      </View>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={patients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PatientItem patient={item} onPress={() => onPatientPress && onPatientPress(item)} />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchQuery ? "Aucun patient ne correspond à votre recherche" : "Aucun patient disponible"}
              </Text>
            </View>
          }
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={onAddPress}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 16,
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
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2b7a78",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
})

export default PatientList

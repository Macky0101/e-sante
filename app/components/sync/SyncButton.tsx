import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { syncAllTables, isSyncInProgress } from "../../services/syncService";
import { useToast } from "../toast/ToastProvider";

interface SyncButtonProps {
  onSyncComplete?: (result: any) => void;
  style?: any;
  onPress?: () => void;
  showSyncManager?: boolean;
}

const SyncButton: React.FC<SyncButtonProps> = ({ 
  onSyncComplete, 
  style, 
  onPress,
  showSyncManager = false
}) => {
  const [syncing, setSyncing] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Vérifier si une synchronisation est déjà en cours au chargement
    checkSyncStatus();
  }, []);

  const checkSyncStatus = async () => {
    const syncInProgress = await isSyncInProgress();
    setSyncing(syncInProgress);
  };

  const handleSync = async () => {
    // Si un gestionnaire personnalisé est fourni, l'utiliser
    if (onPress) {
      onPress();
      return;
    }

    if (syncing) return;

    try {
      setSyncing(true);
      toast.showInfo("Synchronisation en cours...");
      
      const result = await syncAllTables();
      
      if (result.success) {
        const stats = Object.values(result.results).reduce(
          (acc: any, tableResult: any) => {
            if (tableResult.pull && tableResult.pull.stats) {
              acc.created += tableResult.pull.stats.created || 0;
              acc.updated += tableResult.pull.stats.updated || 0;
              acc.total += tableResult.pull.stats.total || 0;
            }
            if (tableResult.push && tableResult.push.stats) {
              acc.sent += tableResult.push.stats.sent || 0;
            }
            return acc;
          },
          { created: 0, updated: 0, sent: 0, total: 0 }
        );
        
        toast.showSuccess(
          `Synchronisation réussie!\n` +
          `Reçus: ${stats.created + stats.updated}/${stats.total}\n` +
          `Envoyés: ${stats.sent}`
        );
      } else {
        toast.showError(`Échec de la synchronisation: ${result.error}`);
      }
      
      if (onSyncComplete) {
        onSyncComplete(result);
      }
    } catch (error) {
      toast.showError(`Erreur: ${error.message}`);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handleSync}
      disabled={syncing}
    >
      {syncing ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <View style={styles.content}>
          <Ionicons name={showSyncManager ? "settings" : "sync"} size={18} color="#fff" />
          <Text style={styles.text}>{showSyncManager ? "Gérer" : "Synchroniser"}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2b7a78",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default SyncButton;
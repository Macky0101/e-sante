import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { syncAllTables, syncTable, getSyncStats, isSyncInProgress, startBackgroundSync, stopBackgroundSync } from '../../services/syncService';
import { useToast } from '../toast/ToastProvider';

interface SyncManagerProps {
  onClose?: () => void;
}

const SyncManager: React.FC<SyncManagerProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [syncStats, setSyncStats] = useState<any>({});
  const [refreshing, setRefreshing] = useState(false);
  const [backgroundSyncActive, setBackgroundSyncActive] = useState(false);
  const toast = useToast();

  useEffect(() => {
    loadSyncStats();
    checkSyncStatus();
  }, []);

  const loadSyncStats = async () => {
    const stats = await getSyncStats();
    setSyncStats(stats);
  };

  const checkSyncStatus = async () => {
    const syncInProgress = await isSyncInProgress();
    setLoading(syncInProgress);
  };

  const handleSyncAll = async () => {
    if (loading) return;

    try {
      setLoading(true);
      toast.showInfo("Synchronisation en cours...");
      
      const result = await syncAllTables();
      
      if (result.success) {
        toast.showSuccess("Synchronisation réussie!");
        await loadSyncStats();
      } else {
        toast.showError(`Échec de la synchronisation: ${result.error}`);
      }
    } catch (error) {
      toast.showError(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncTable = async (tableName: string) => {
    if (loading) return;

    try {
      setLoading(true);
      toast.showInfo(`Synchronisation de ${tableName} en cours...`);
      
      const result = await syncTable(tableName);
      
      if (result.success) {
        toast.showSuccess(`Synchronisation de ${tableName} réussie!`);
        await loadSyncStats();
      } else {
        toast.showError(`Échec de la synchronisation de ${tableName}: ${result.error}`);
      }
    } catch (error) {
      toast.showError(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadSyncStats();
    setRefreshing(false);
  };

  const toggleBackgroundSync = () => {
    if (backgroundSyncActive) {
      stopBackgroundSync();
      setBackgroundSyncActive(false);
      toast.showInfo("Synchronisation en arrière-plan désactivée");
    } else {
      startBackgroundSync(30); // Toutes les 30 minutes
      setBackgroundSyncActive(true);
      toast.showSuccess("Synchronisation en arrière-plan activée");
    }
  };

  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'Jamais';
    return new Date(timestamp).toLocaleString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestionnaire de synchronisation</Text>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.syncAllButton]} 
          onPress={handleSyncAll}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="sync" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Tout synchroniser</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.actionButton, 
            backgroundSyncActive ? styles.stopSyncButton : styles.startSyncButton
          ]} 
          onPress={toggleBackgroundSync}
        >
          <Ionicons 
            name={backgroundSyncActive ? "pause-circle" : "play-circle"} 
            size={20} 
            color="#fff" 
          />
          <Text style={styles.actionButtonText}>
            {backgroundSyncActive ? "Arrêter la synchro auto" : "Démarrer la synchro auto"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.statsContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#2b7a78"]}
          />
        }
      >
        <Text style={styles.sectionTitle}>Dernières synchronisations</Text>
        
        {Object.entries(syncStats).map(([tableName, stats]: [string, any]) => (
          <View key={tableName} style={styles.tableItem}>
            <View style={styles.tableInfo}>
              <Text style={styles.tableName}>{tableName}</Text>
              <Text style={styles.lastSyncText}>
                Dernière synchro: {formatDate(stats.lastSync)}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.syncTableButton}
              onPress={() => handleSyncTable(tableName)}
              disabled={loading}
            >
              <Ionicons name="refresh" size={18} color="#2b7a78" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  syncAllButton: {
    backgroundColor: '#2b7a78',
  },
  startSyncButton: {
    backgroundColor: '#4caf50',
  },
  stopSyncButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  statsContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  tableItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tableInfo: {
    flex: 1,
  },
  tableName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  lastSyncText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  syncTableButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
});

export default SyncManager;
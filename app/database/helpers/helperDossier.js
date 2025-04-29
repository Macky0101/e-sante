import { Q } from '@nozbe/watermelondb';
import {database} from '../index'; 

const dossierCollection = database.collections.get('dossiers');

/**
 * Crée un nouveau dossier.
 * @param {Object} data - Données du dossier à créer.
 * @returns {Promise<Object>} - Le dossier créé.
 */
export async function createDossier(data) {
  return await database.write(async () => {
    return await dossierCollection.create(dossier => {
      Object.entries(data).forEach(([key, value]) => {
        dossier[key] = value;
      });
    });
  });
}

/**
 * Récupère tous les dossiers.
 * @returns {Promise<Array>} - Liste des dossiers.
 */
export async function getAllDossiers() {
  return await dossierCollection.query().fetch();
}

/**
 * Récupère un dossier par son ID.
 * @param {string} id - ID du dossier.
 * @returns {Promise<Object>} - Le dossier correspondant.
 */
export async function getDossierById(id) {
  return await dossierCollection.find(id);
}

/**
 * Met à jour un dossier existant.
 * @param {string} id - ID du dossier à mettre à jour.
 * @param {Object} updates - Données à mettre à jour.
 * @returns {Promise<Object>} - Le dossier mis à jour.
 */
export async function updateDossier(id, updates) {
  return await database.write(async () => {
    const dossier = await dossierCollection.find(id);
    return await dossier.update(record => {
      Object.entries(updates).forEach(([key, value]) => {
        record[key] = value;
      });
    });
  });
}

/**
 * Supprime un dossier de manière permanente.
 * @param {string} id - ID du dossier à supprimer.
 * @returns {Promise<void>}
 */
export async function deleteDossier(id) {
  return await database.write(async () => {
    const dossier = await dossierCollection.find(id);
    await dossier.destroyPermanently();
  });
}

/**
 * Supprime tous les dossiers de manière permanente.
 * @returns {Promise<void>}
 */
export async function deleteAllDossiers() {
  return await database.write(async () => {
    const dossiers = await dossierCollection.query().fetch();
    const deletions = dossiers.map(dossier => dossier.prepareDestroyPermanently());
    await database.batch(...deletions);
  });
}

/**
 * Recherche des dossiers par un champ spécifique.
 * @param {string} field - Nom du champ.
 * @param {any} value - Valeur à rechercher.
 * @returns {Promise<Array>} - Liste des dossiers correspondants.
 */
export async function findDossiersByField(field, value) {
  return await dossierCollection.query(Q.where(field, value)).fetch();
}

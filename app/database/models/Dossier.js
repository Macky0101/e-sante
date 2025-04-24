import { Model } from '@nozbe/watermelondb'
import { field, date, readonly, relation , children} from '@nozbe/watermelondb/decorators'

export default class Dossier extends Model {
  static table = 'dossiers'
  
  static associations = {
    accouchements: { type: 'has_many', foreignKey: 'numero_dossier' },
    consultations: { type: 'has_many', foreignKey: 'numero_dossier' },
    cpns:          { type: 'has_many', foreignKey: 'numero_dossier' },
    dentaires:     { type: 'has_many', foreignKey: 'numero_dossier' },
    pmis:          { type: 'has_many', foreignKey: 'numero_dossier' },
    suivis:        { type: 'has_many', foreignKey: 'numero_dossier' },
    vaccins:       { type: 'has_many', foreignKey: 'numero_dossier' },
    pharmacie_patients: { type: 'has_many', foreignKey: 'numero_dossier' },
    produits:      { type: 'has_many', foreignKey: 'medicament_id' },
    recettes:      { type: 'has_many', foreignKey: 'medicament_id' },

  }

  // Champs
  @field('numero_dossier') numeroDossier
  @field('hors_haire') horsHaire
  @field('alerte') alerte
  @field('nom') nom
  @field('prenom') prenom
  @field('ethnie') ethnie
  @field('profession') profession
  @field('date_naissance') dateNaissance
  @field('genre') genre
  @field('prenom_pere') prenomPere
  @field('nom_mere') nomMere
  @field('prenom_mere') prenomMere
  @field('nom_conjoint') nomConjoint
  @field('prenom_conjoint') prenomConjoint
  @field('credit') credit
  @field('nina') nina
  @field('amo') amo
  @field('mutuelle') mutuelle
  @field('autre_pieces') autrePieces
  @field('statut_matrimonial') statutMatrimonial
  @field('date_creation') dateCreation
  @field('quartier') quartier
  @field('telephone1') telephone1
  @field('telephone_2') telephone2
  @field('etat') etat

    // Relations
    @children('accouchements') accouchements
    @children('consultations') consultations
    @children('cpns') cpns
    @children('dentaires') dentaires
    @children('pmis') pmis
    @children('suivis') suivis
    @children('vaccins') vaccins
    @children('pharmacie_patients') pharmacie_patients
    @children('produits') produits
    @children('recettes') recettes
    @children('pharmaciePatients') pharmaciePatients

  // Timestamps
  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
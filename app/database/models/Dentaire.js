import { Model } from '@nozbe/watermelondb'
import { field, relation, date, readonly } from '@nozbe/watermelondb/decorators'

export default class Dentaire extends Model {
  static table = 'dentaires'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' },
    produits: { type: 'belongs_to', key: 'medicament_id' }
  }

  @relation('dossiers', 'numero_dossier') dossier
  @relation('produits', 'medicament_id') produit

  @field('visite') visite
  @field('consultation') consultation
  @field('Nb_extraction') nbExtraction
  @field('drainage') drainage
  @field('refere') refere
  @field('soins_obturateurs') soinsObturateurs
  @field('autres_soins') autresSoins
  @field('radiographie') radiographie
  @field('referencement_interne') referencementInterne
  @field('complement_information') complementInformation
  @field('Poids') poids
  @field('taille') taille
  @field('SO2P') so2p
  @field('ta') ta
  @field('fc') fc
  @field('t') t
  @field('conduite') conduite
  @field('reference') reference
  @field('motif') motif
  @field('rendez_vous') rendezVous

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
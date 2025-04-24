import { Model } from '@nozbe/watermelondb'
import { field, relation, date, readonly } from '@nozbe/watermelondb/decorators'

export default class Recette extends Model {
  static table = 'recettes'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' },
    produits: { type: 'belongs_to', key: 'medicament_id' }
  }

  // Relations
  @relation('dossiers', 'numero_dossier') dossier
  @relation('produits', 'medicament_id') medicament

  // Champs
  @field('consultation_currative') consultationCurrative
  @field('consultation_prenatal') consultationPrenatal
  @field('consultation_post') consultationPost
  @field('accouchement') accouchement
  @field('planning_familial') planningFamilial
  @field('acte_vaccination') acteVaccination
  @field('chirugie') chirugie
  @field('injection') injection
  @field('acte_pansement') actePansement
  @field('acte_radiologie') acteRadiologie
  @field('echographie') echographie
  @field('biologie') biologie
  @field('credit') credit
  @field('autre') autre

  // Timestamps
  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
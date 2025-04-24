import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class Consultation extends Model {
  static table = 'consultations'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' },
    analyses: { type: 'belongs_to', key: 'analyses_id' }
  }

  // Relations
  @relation('dossiers', 'numero_dossier') dossier
  @relation('analyses', 'analyses_id') analyse

  // Champs
  @field('programmes') programmes
  @field('allergies') allergies
  @field('chirigicaux') chirigicaux
  @field('observation') observation
  @field('aide_memoire') aideMemoire
  @field('date_visite') dateVisite
  @field('imc') imc
  @field('taille') taille
  @field('poids') poids
  @field('ta_min') taMin
  @field('ta_max') taMax
  @field('fc') fc
  @field('temperature') temperature
  @field('spo2') spo2
  @field('prescription') prescription
  @field('diagnostic') diagnostic
  @field('premiere_fois') premiereFois
  @field('c') c
  @field('k') k
  @field('transfusion') transfusion
  @field('analyses_rapide') analysesRapide
  @field('observation_cmc') observationCmc
  @field('refere') refere
  @field('evacue') evacue
  @field('csref') csref
  @field('hopital') hopital
  @field('cause') cause
  @field('autre_cause') autreCause
  @field('medicaments') medicaments
}
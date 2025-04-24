import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class SurveillanceMere extends Model {
  static table = 'surveillance_meres'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' }
  }

  @relation('dossiers', 'numero_dossier') dossier
  
  @field('saignement') saignement
  @field('allaitement') allaitement
  @field('temperature') temperature
  @field('ta') ta
  @field('pouls') pouls
  @field('globe_securite') globeSecurite
  @field('resultat_mere') resultatMere
  @field('date') date
  @field('heure') heure
  @field('mort_ne') mortNe
  @field('ne_vivant') neVivant
  @field('date_mort') dateMort
  @field('cause_mort_ne') causeMortNe
  @field('cause_mort_mere') causeMortMere
}
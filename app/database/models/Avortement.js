import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class Avortement extends Model {
  static table = 'avortements'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' }
  }

  @relation('dossiers', 'numero_dossier') dossier
  
  @field('mode_survenu') modeSurvenu
  @field('prescription') prescription
  @field('mode_evacuation') modeEvacuation
}
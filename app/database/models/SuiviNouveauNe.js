import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class SuiviNouveauNe extends Model {
  static table = 'suiveillance_nouveau_nes'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' }
  }

  @relation('dossiers', 'numero_dossier') dossier
  
  @field('temperature') temperature
  @field('respiration') respiration
  @field('coloration_peau') colorationPeau
  @field('mise_sein') miseSein
  @field('poids') poids
  @field('taille') taille
  @field('cranien') cranien
  @field('thoracique') thoracique
  @field('malformation') malformation
  @field('soins_essentiels') soinsEssentiels
}
import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class Quartier extends Model {
  static table = 'quartiers'
  
  static associations = {
    communes: { type: 'belongs_to', key: 'commune_id' }
  }

  @relation('communes', 'commune_id') commune

  @field('libelle') libelle
}
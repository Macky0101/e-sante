import { Model } from '@nozbe/watermelondb'
import { field, relation, children } from '@nozbe/watermelondb/decorators'
export default class Arrondissement extends Model {
  static table = 'arrondissements'
  
  static associations = {
    cercles: { type: 'belongs_to', key: 'cercle_id' },
    communes: { type: 'has_many', foreignKey: 'arrondissement_id' }
  }

  @relation('cercles', 'cercle_id') cercle
  @children('communes') communes

  @field('libelle') libelle
}
import { Model } from '@nozbe/watermelondb'
import { field, relation, children } from '@nozbe/watermelondb/decorators'

export default class Commune extends Model {
  static table = 'communes'
  
  static associations = {
    arrondissements: { type: 'belongs_to', key: 'arrondissement_id' },
    quartiers: { type: 'has_many', foreignKey: 'commune_id' }
  }

  @relation('arrondissements', 'arrondissement_id') arrondissement
  @children('quartiers') quartiers

  @field('libelle') libelle
}
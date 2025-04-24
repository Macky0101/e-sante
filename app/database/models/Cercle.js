import { Model} from '@nozbe/watermelondb'
import { field, relation, children} from '@nozbe/watermelondb/decorators'

export default class Cercle extends Model {
  static table = 'cercles'
  
  static associations = {
    districts: { type: 'belongs_to', key: 'district_id' },
    arrondissements: { type: 'has_many', foreignKey: 'cercle_id' }
  }

  @relation('districts', 'district_id') district
  @children('arrondissements') arrondissements

  @field('libelle') libelle
}
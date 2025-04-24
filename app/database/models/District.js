import { Model} from '@nozbe/watermelondb'
import { field, relation , children } from '@nozbe/watermelondb/decorators'

export default class District extends Model {
  static table = 'districts'
  
  static associations = {
    regions: { type: 'belongs_to', key: 'region_id' },
    cercles: { type: 'has_many', foreignKey: 'district_id' }
  }

  @relation('regions', 'region_id') region
  @children('cercles') cercles

  @field('libelle') libelle
}
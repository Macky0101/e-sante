import { Model } from '@nozbe/watermelondb'
import { field, children } from '@nozbe/watermelondb/decorators'

export default class Region extends Model {
  static table = 'regions'
  
  static associations = {
    districts: { type: 'has_many', foreignKey: 'region_id' }
  }

  @field('libelle') libelle
  
  @children('districts') districts
}
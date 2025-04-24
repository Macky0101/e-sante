import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class ProfilModule extends Model {
  static table = 'profil_modules'
  
  static associations = {
    profils: { type: 'belongs_to', key: 'profil_id' },
    modules: { type: 'belongs_to', key: 'module_id' }
  }

  @relation('profils', 'profil_id') profil
  @relation('modules', 'module_id') module

  @field('access') access
}
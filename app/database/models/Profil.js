import { Model } from '@nozbe/watermelondb'
import { field , children} from '@nozbe/watermelondb/decorators'

export default class Profil extends Model {
  static table = 'profils'
  
  static associations = {
    utilisateurs: { type: 'has_many', foreignKey: 'profil_id' },
    profil_modules: { type: 'has_many', foreignKey: 'profil_id' }
  }

  @field('libelle') libelle
  @children('utilisateurs') utilisateurs
  @children('profil_modules') profilModules
}
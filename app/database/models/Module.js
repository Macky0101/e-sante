import { Model} from '@nozbe/watermelondb'
import { field , children } from '@nozbe/watermelondb/decorators'

export default class Module extends Model {
  static table = 'modules'
  
  static associations = {
    profil_modules: { type: 'has_many', foreignKey: 'module_id' }
  }

  @field('libelle') libelle
  @children('profil_modules') profilModules
}
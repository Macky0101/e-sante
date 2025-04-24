import { Model} from '@nozbe/watermelondb'
import { field, date, readonly , children } from '@nozbe/watermelondb/decorators'

export default class Produit extends Model {
  static table = 'produits'
  
  static associations = {
    cpns: { type: 'has_many', foreignKey: 'medicament_id' },
    recettes: { type: 'has_many', foreignKey: 'medicament_id' }
  }

  @field('resume') resume
  @field('nom_produit') nomProduit
  @field('type_produit') typeProduit
  @field('dosage') dosage
  @field('precaution') precaution
  @field('unite_uv') uniteUv
  @field('national') national

  @children('cpns') cpns
  @children('recettes') recettes

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
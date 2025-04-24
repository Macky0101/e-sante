import { Model } from '@nozbe/watermelondb'
import { field, relation, date, readonly } from '@nozbe/watermelondb/decorators'

export default class PharmaciePatient extends Model {
  static table = 'pharmacie_patients'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' }
  }

  @relation('dossiers', 'numero_dossier') dossier

  @field('date_delivrance') dateDelivrance
  @field('produit') produit
  @field('somme_percue') sommePercue

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
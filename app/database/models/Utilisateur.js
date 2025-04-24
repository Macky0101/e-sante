import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class Utilisateur extends Model {
  static table = 'utilisateurs'
  
  static associations = {
    profils: { type: 'belongs_to', key: 'profil_id' }
  }

  @relation('profils', 'profil_id') profil

  @field('nom') nom
  @field('prenom') prenom
  @field('email') email
}
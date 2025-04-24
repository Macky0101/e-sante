import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export default class Diagnostic extends Model {
  static table = 'diagnostics'
  
  @field('libelle') libelle
  @field('description') description
}
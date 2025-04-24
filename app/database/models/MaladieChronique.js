import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class MaladieChronique extends Model {
  static table = 'maladie_choniques'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' }
  }

  @relation('dossiers', 'numero_dossier') dossier
  
  @field('poids') poids
  @field('taille') taille
  @field('soa2p') soa2p
  @field('ta') ta
  @field('imc') imc
  @field('fc') fc
  @field('temperature') temperature
  @field('resultat') resultat
  @field('consuite_tenir') consuiteTenir
  @field('reference') reference
  @field('complement_information') complementInformation
}
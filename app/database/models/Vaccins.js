import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class Vaccins extends Model {
  static table = 'vaccins'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' }
  }

  @relation('dossiers', 'numero_dossier') dossier
  
  @field('vaccins') vaccins
  @field('date_vaccin') dateVaccin
  @field('referencement_interne') referencementInterne
  @field('complement_information') complementInformation
}
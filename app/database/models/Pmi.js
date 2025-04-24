import { Model } from '@nozbe/watermelondb'
import { field, relation, date, readonly } from '@nozbe/watermelondb/decorators'

export default class Pmi extends Model {
  static table = 'pmis'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' }
  }

  @relation('dossiers', 'numero_dossier') dossier

  @field('programmes') programmes
  @field('date_visite') dateVisite
  @field('taille') taille
  @field('poids') poids
  @field('bande_shakir') bandeShakir
  @field('retard_croissance') retardCroissance
  @field('insuffisance_ponderal') insuffisancePonderal
  @field('emaciation') emaciation
  @field('alimentation_specifique') alimentationSpecifique
  @field('bilateraux_symetrique') bilaterauxSymetrique
  @field('fievre_inexplique') fievreInexplique
  @field('test_apte') testApte
  @field('mas') mas
  @field('mam') mam
  @field('rouge_compilation') rougeCompilation
  @field('suivi_mam') suiviMam
  @field('suivi_mas') suiviMas
  @field('suivi_mas_compilation') suiviMasCompilation
  @field('sortie') sortie

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
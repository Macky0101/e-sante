import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class Accouchements extends Model {
  static table = 'accouchements'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' }
  }

  // Relation
  @relation('dossiers', 'numero_dossier') dossier

  // Champs
  @field('date') date
  @field('heure') heure
  @field('nombre_enfant_vivant') nombreEnfantVivant
  @field('interval_grossesses') intervalGrossesses
  @field('precedente_naissance_vivante') precedenteNaissanceVivante
  @field('avortement') avortement
  @field('methode_avortement') methodeAvortement
  @field('lieu_accouchement') lieuAccouchement
  @field('naissances_multiples') naissancesMultiples
  @field('naissance_prematuree') naissancePrematuree
  @field('accouchement_necessite_ventouses') accouchementNecessiteVentouses
  @field('forcep') forcep
  @field('cesarienne') cesarienne
  @field('perfusion_ocytocique') perfusionOcytocique
  @field('gestion_active') gestionActive
  @field('hemorragie_PPI') hemorragiePPI
  @field('vitamine_a') vitamineA
  @field('deparasitage') deparasitage
  @field('fer_acide_folique') ferAcideFolique
  @field('enfant_ne') enfantNe
  @field('frequence') frequence
  @field('duree_contraction') dureeContraction
  @field('col_dilatation') colDilatation
  @field('rupture_pouche') rupturePouche
  @field('liquide_amniotique') liquideAmniotique
  @field('nature_dosage') natureDosage
  @field('prise_decision') priseDecision
  @field('commentaire') commentaire
  @field('naissance_multiple') naissanceMultiple
  @field('motif_refecence') motifRefecence
}
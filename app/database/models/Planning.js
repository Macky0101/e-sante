import { Model } from '@nozbe/watermelondb'
import { field, relation, date, readonly } from '@nozbe/watermelondb/decorators'

export default class Planning extends Model {
  static table = 'plannings'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' }
  }

  @relation('dossiers', 'numero_dossier') dossier

  @field('visite') visite
  @field('P_kg') pKg
  @field('TA_mmHg') taMmHg
  @field('renouvellement') renouvellement
  @field('si_arret') siArret
  @field('methode') methode
  @field('nature_produit') natureProduit
  @field('quantite_fournie') quantiteFournie
  @field('presence_sucre') presenceSucre
  @field('examen_seins') examenSeins
  @field('recherche_ganglions') rechercheGanglions
  @field('examen_uterin_TV') examenUterinTV
  @field('moustiquaire_impregnee') moustiquaireImpregnee
  @field('referencement_interne') referencementInterne
  @field('complement_information') complementInformation
  @field('nombre_enfant_vivant') nombreEnfantVivant
  @field('allergies') allergies
  @field('age_premiere_regle') agePremiereRegle
  @field('taille') taille
  @field('conjonctive') conjonctive
  @field('omi') omi
  @field('inspection') inspection
  @field('besoin_analyse') besoinAnalyse
  @field('counseling_pf') counselingPf
  @field('arret') arret
  @field('planningcol') planningcol
  @field('precision_methode') precisionMethode

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
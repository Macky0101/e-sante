import { Model } from '@nozbe/watermelondb'
import { field, relation, date, readonly } from '@nozbe/watermelondb/decorators'

export default class Cpn extends Model {
  static table = 'cpns'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' },
    produits: { type: 'belongs_to', key: 'medicament_id' }
  }

  @relation('dossiers', 'numero_dossier') dossier
  @relation('produits', 'medicament_id') produit

  @field('date_visite') dateVisite
  @field('gest') gest
  @field('parite') parite
  @field('taille') taille
  @field('trimestre1') trimestre1
  @field('trimestre2') trimestre2
  @field('trimestre3') trimestre3
  @field('dernier_mois') dernierMois
  @field('gare') gare
  @field('age') age
  @field('parite_sup') pariteSup
  @field('cesarienne') cesarienne
  @field('mort_ne') mortNe
  @field('drepanocytose') drepanocytose
  @field('hta_connu') htaConnu
  @field('autre_facteur') autreFacteur
  @field('coloration') coloration
  @field('date_regle') dateRegle
  @field('semaine') semaine
  @field('anemie') anemie
  @field('omi') omi
  @field('ictere') ictere
  @field('saignement') saignement
  @field('vomissement') vomissement
  @field('foetale') foetale
  @field('poids') poids
  @field('imc') imc
  @field('ta_min') taMin
  @field('ta_max') taMax
  @field('temperature') temperature
  @field('hu') hu
  @field('col') col
  @field('bdc') bdc
  @field('ma') ma
  @field('tdr_palu') tdrPalu
  @field('precision') precision
  @field('albumine') albumine
  @field('sucre') sucre
  @field('tdr_vih') tdrVih
  @field('groupe_sanguin') groupeSanguin
  @field('groupe_rehsus') groupeRehsus
  @field('test_hemmel') testHemmel
  @field('bw') bw
  @field('serologie') serologie
  @field('presence_igm') presenceIgm
  @field('presence_icg') presenceIcg
  @field('serologie_rubeole') serologieRubeole
  @field('resultat') resultat
  @field('presence_igm1') presenceIgm1
  @field('presence_igm2') presenceIgm2
  @field('hbs') hbs
  @field('vitamineA') vitamineA
  @field('faf') faf
  @field('tetanos') tetanos
  @field('tpi') tpi
  @field('moustiquaire') moustiquaire
  @field('deparasitage') deparasitage
  @field('tpme') tpme
  @field('counseling') counseling
  @field('reference') reference
  @field('complement_information') complementInformation

  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
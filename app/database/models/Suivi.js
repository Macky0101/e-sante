import { Model } from '@nozbe/watermelondb'
import { field, relation } from '@nozbe/watermelondb/decorators'

export default class Suivi extends Model {
  static table = 'suivis'
  
  static associations = {
    dossiers: { type: 'belongs_to', key: 'numero_dossier' }
  }

  @relation('dossiers', 'numero_dossier') dossier
  
  // Champs
  @field('date') date
  @field('nature') nature
  @field('dosage') dosage
  @field('voie') voie
  @field('P_kg') pKg
  @field('TA_mmHg') taMmHg
  @field('FC_mn') fcMn
  @field('T_deg') tDeg
  @field('glycemie') glycemie
  @field('TDR_Palu') tdrPalu
  @field('precision_si_positif') precisionSiPositif
  @field('presence_albumine') presenceAlbumine
  @field('presence_sucre') presenceSucre
  @field('referencement_interne') referencementInterne
  @field('complement_information') complementInformation
  @field('taille') taille
  @field('poids') poids
  @field('SO2P') so2p
  @field('ta_min') taMin
  @field('ta_max') taMax
  @field('imc') imc
  @field('fc') fc
  @field('temperature') temperature
  @field('examen') examen
  @field('resultat') resultat
  @field('conduite') conduite
  @field('reference') reference
}
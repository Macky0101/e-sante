import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    // Dossier
    tableSchema({
      name: 'dossiers',
      columns: [
        { name: 'DossierId', type: 'number', isIndexed: true },
        { name: 'numero_dossier', type: 'string', isIndexed: true },
        { name: 'hors_haire', type: 'boolean' },
        { name: 'alerte', type: 'boolean' },
        { name: 'nom', type: 'string' },
        { name: 'prenom', type: 'string' },
        { name: 'ethnie', type: 'string', isOptional: true },
        { name: 'profession', type: 'string', isOptional: true },
        { name: 'date_naissance', type: 'string' },
        { name: 'genre', type: 'number' },
        { name: 'prenom_pere', type: 'string', isOptional: true },
        { name: 'nom_mere', type: 'string', isOptional: true },
        { name: 'prenom_mere', type: 'string', isOptional: true },
        { name: 'nom_conjoint', type: 'string', isOptional: true },
        { name: 'prenom_conjoint', type: 'string', isOptional: true },
        { name: 'credit', type: 'string', isOptional: true },
        { name: 'nina', type: 'string', isOptional: true },
        { name: 'amo', type: 'string', isOptional: true },
        { name: 'mutuelle', type: 'string', isOptional: true },
        { name: 'autre_pieces', type: 'string', isOptional: true },
        { name: 'statut_matrimonial', type: 'string', isOptional: true },
        { name: 'date_creation', type: 'number' },
        { name: 'quartier', type: 'number', isOptional: true },
        { name: 'telephone1', type: 'string', isOptional: true },
        { name: 'telephone_2', type: 'string', isOptional: true },
        { name: 'etat', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
      ]
    }),

    // Accouchements
    tableSchema({
      name: 'accouchements',
      columns: [
        { name: 'AccouchementsId', type: 'number', isIndexed: true },
        { name: 'numero_dossier', type: 'string', isIndexed: true },
        { name: 'date', type: 'string' },
        { name: 'heure', type: 'string' },
        { name: 'nombre_enfant_vivant', type: 'number' },
        { name: 'interval_grossesses', type: 'string', isOptional: true },
        { name: 'precedente_naissance_vivante', type: 'string', isOptional: true },
        { name: 'avortement', type: 'boolean' },
        { name: 'methode_avortement', type: 'string', isOptional: true },
        { name: 'lieu_accouchement', type: 'string', isOptional: true },
        { name: 'naissances_multiples', type: 'boolean' },
        { name: 'naissance_prematuree', type: 'boolean' },
        { name: 'accouchement_necessite_ventouses', type: 'boolean' },
        { name: 'forcep', type: 'boolean' },
        { name: 'cesarienne', type: 'boolean' },
        { name: 'perfusion_ocytocique', type: 'boolean' },
        { name: 'gestion_active', type: 'boolean' },
        { name: 'hemorragie_PPI', type: 'boolean' },
        { name: 'vitamine_a', type: 'boolean' },
        { name: 'deparasitage', type: 'boolean' },
        { name: 'fer_acide_folique', type: 'boolean' },
        { name: 'enfant_ne', type: 'string', isOptional: true },
        { name: 'frequence', type: 'string', isOptional: true },
        { name: 'duree_contraction', type: 'string', isOptional: true },
        { name: 'col_dilatation', type: 'string', isOptional: true },
        { name: 'rupture_pouche', type: 'boolean' },
        { name: 'liquide_amniotique', type: 'string', isOptional: true },
        { name: 'nature_dosage', type: 'string', isOptional: true },
        { name: 'prise_decision', type: 'string', isOptional: true },
        { name: 'commentaire', type: 'string', isOptional: true },
        { name: 'naissance_multiple', type: 'number', isOptional: true },
        { name: 'motif_refecence', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
      ]
    }),

    // dentaires
    tableSchema({
      name: 'dentaires',
      columns: [
        { name: 'visite', type: 'string', isIndexed: true },
        { name: 'consultation', type: 'string' },
        { name: 'Nb_extraction', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
      ]
    }),

    // pharmacie
    tableSchema({
      name: 'pharmacie_patients',
      columns: [
        { name: 'PharmaciePatientId', type: 'number', isIndexed: true },
      ]
    }),

    // Planning
    tableSchema({
      name: 'plannings',
      columns: [
        { name: 'PlanningId', type: 'number', isIndexed: true },
      ]
    }),

    //pmis
    tableSchema({
      name: 'pmis',
      columns: [
        { name: 'PmisId', type: 'number', isIndexed: true },
      ]
    }),

    //suivis
    tableSchema({
      name: 'suivis',
      columns: [
        { name: 'SuiviId', type: 'number', isIndexed: true },
      ]
    }),

    // Vaccins
    tableSchema({
      name: 'vaccins',
      columns: [
        { name: 'VaccinId', type: 'number', isIndexed: true },
      ]
    }),

    // SuiviNouveauNee
    tableSchema({
      name: 'suiveillance_nouveau_nes',
      columns: [
        { name: 'SuiviNouveauNeId', type: 'number', isIndexed: true },
      ]
    }),

    // SurveillanceMere
    tableSchema({
      name: 'surveillance_meres',
      columns: [
        { name: 'SurveillanceMereId', type: 'number', isIndexed: true },
      ]
    }),

    // Diagnostic
    tableSchema({
      name: 'diagnostics',
      columns: [
        { name: 'DiagnosticId', type: 'number', isIndexed: true },
      ]
    }),

    // Avortement
    tableSchema({
      name: 'avortements',
      columns: [
        { name: 'AvortementId', type: 'number', isIndexed: true },
      ]
    }),

    // MaladieChronique
    tableSchema({
      name: 'maladie_choniques',
      columns: [
        { name: 'MaladieChroniqueId', type: 'number', isIndexed: true },
      ]
    }),

    // regions
    tableSchema({
      name: 'regions',
      columns: [
        { name: 'RegionId', type: 'number', isIndexed: true },
      ]
    }),

    //districts
    tableSchema({
      name: 'districts',
      columns: [
        { name: 'DistrictId', type: 'number', isIndexed: true },
      ]
    }),

    // cercles
    tableSchema({
      name: 'cercles',
      columns: [
        { name: 'CercleId', type: 'number', isIndexed: true },
      ]
    }),

    // communes
    tableSchema({
      name: 'communes',
      columns: [
        { name: 'CommuneId', type: 'number', isIndexed: true },
      ]
    }),

    // Quartiers
    tableSchema({
      name: 'quartiers',
      columns: [
        { name: 'QuartierId', type: 'number', isIndexed: true },
      ]
    }),

    // Arrondissement
    tableSchema({
      name: 'arrondissements',
      columns: [
        { name: 'ArrondissementId', type: 'number', isIndexed: true },
      ]
    }),
    // Recettes
    tableSchema({
      name: 'recettes',
      columns: [
        { name: 'RecetteId', type: 'number', isIndexed: true },
      ]
    }),

    // Analyses
    tableSchema({
      name: 'analyses',
      columns: [
        { name: 'AnalysesId', type: 'number', isIndexed: true },
        { name: 'libelle', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
      ]
    }),

    // Consultation
    tableSchema({
      name: 'consultations',
      columns: [
        { name: 'ConsultationsId', type: 'number', isIndexed: true },
        { name: 'numero_dossier', type: 'string', isIndexed: true },
        { name: 'programmes', type: 'string', isOptional: true },
        { name: 'allergies', type: 'string', isOptional: true },
        { name: 'chirigicaux', type: 'string', isOptional: true },
        { name: 'observation', type: 'string', isOptional: true },
        { name: 'aide_memoire', type: 'string', isOptional: true },
        { name: 'date_visite', type: 'number' },
        { name: 'imc', type: 'number', isOptional: true },
        { name: 'taille', type: 'number', isOptional: true },
        { name: 'poids', type: 'number', isOptional: true },
        { name: 'ta_min', type: 'number', isOptional: true },
        { name: 'ta_max', type: 'number', isOptional: true },
        { name: 'fc', type: 'number', isOptional: true },
        { name: 'temperature', type: 'number', isOptional: true },
        { name: 'spo2', type: 'number', isOptional: true },
        { name: 'prescription', type: 'string', isOptional: true },
        { name: 'diagnostic', type: 'string', isOptional: true },
        { name: 'premiere_fois', type: 'boolean' },
        { name: 'c', type: 'boolean' },
        { name: 'k', type: 'string', isOptional: true },
        { name: 'transfusion', type: 'boolean' },
        { name: 'analyses_rapide', type: 'string', isOptional: true },
        { name: 'analyses_id', type: 'number', isOptional: true },
        { name: 'observation_cmc', type: 'boolean' },
        { name: 'refere', type: 'boolean' },
        { name: 'evacue', type: 'boolean' },
        { name: 'csref', type: 'boolean' },
        { name: 'hopital', type: 'boolean' },
        { name: 'cause', type: 'string', isOptional: true },
        { name: 'autre_cause', type: 'string', isOptional: true },
        { name: 'medicaments', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
      ]
    }),

    // Produits
    tableSchema({
      name: 'produits',
      columns: [
        { name: 'ProduitsId', type: 'number', isIndexed: true },
        { name: 'resume', type: 'string', isOptional: true },
        { name: 'nom_produit', type: 'string' },
        { name: 'type_produit', type: 'string', isOptional: true },
        { name: 'dosage', type: 'string', isOptional: true },
        { name: 'precaution', type: 'string', isOptional: true },
        { name: 'unite_uv', type: 'string', isOptional: true },
        { name: 'national', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
      ]
    }),

    // CPN
    tableSchema({
      name: 'cpns',
      columns: [
        { name: 'CpnsId', type: 'number', isIndexed: true },
        { name: 'numero_dossier', type: 'string', isIndexed: true },
        { name: 'date_visite', type: 'string' },
        { name: 'gest', type: 'number', isOptional: true },
        { name: 'parite', type: 'number', isOptional: true },
        { name: 'taille', type: 'number', isOptional: true },
        { name: 'trimestre1', type: 'boolean' },
        { name: 'trimestre2', type: 'boolean' },
        { name: 'trimestre3', type: 'boolean' },
        { name: 'dernier_mois', type: 'boolean' },
        { name: 'gare', type: 'boolean' },
        { name: 'age', type: 'boolean' },
        { name: 'parite_sup', type: 'boolean' },
        { name: 'cesarienne', type: 'boolean' },
        { name: 'mort_ne', type: 'boolean' },
        { name: 'drepanocytose', type: 'boolean' },
        { name: 'hta_connu', type: 'boolean' },
        { name: 'autre_facteur', type: 'string', isOptional: true },
        { name: 'coloration', type: 'boolean' },
        { name: 'date_regle', type: 'string', isOptional: true },
        { name: 'semaine', type: 'number', isOptional: true },
        { name: 'anemie', type: 'boolean' },
        { name: 'omi', type: 'boolean' },
        { name: 'ictere', type: 'boolean' },
        { name: 'saignement', type: 'boolean' },
        { name: 'vomissement', type: 'boolean' },
        { name: 'foetale', type: 'string', isOptional: true },
        { name: 'poids', type: 'number', isOptional: true },
        { name: 'imc', type: 'boolean' },
        { name: 'ta_min', type: 'number', isOptional: true },
        { name: 'ta_max', type: 'number', isOptional: true },
        { name: 'temperature', type: 'number', isOptional: true },
        { name: 'hu', type: 'number', isOptional: true },
        { name: 'col', type: 'number', isOptional: true },
        { name: 'bdc', type: 'boolean' },
        { name: 'ma', type: 'boolean' },
        { name: 'tdr_palu', type: 'boolean' },
        { name: 'precision', type: 'string', isOptional: true },
        { name: 'albumine', type: 'string', isOptional: true },
        { name: 'sucre', type: 'string', isOptional: true },
        { name: 'tdr_vih', type: 'string', isOptional: true },
        { name: 'groupe_sanguin', type: 'string', isOptional: true },
        { name: 'groupe_rehsus', type: 'boolean' },
        { name: 'test_hemmel', type: 'boolean' },
        { name: 'bw', type: 'boolean' },
        { name: 'serologie', type: 'string', isOptional: true },
        { name: 'presence_igm', type: 'boolean' },
        { name: 'presence_icg', type: 'boolean' },
        { name: 'serologie_rubeole', type: 'string', isOptional: true },
        { name: 'resultat', type: 'boolean' },
        { name: 'presence_igm1', type: 'boolean' },
        { name: 'presence_igm2', type: 'boolean' },
        { name: 'hbs', type: 'boolean' },
        { name: 'vitamineA', type: 'boolean' },
        { name: 'faf', type: 'boolean' },
        { name: 'tetanos', type: 'string', isOptional: true },
        { name: 'tpi', type: 'string', isOptional: true },
        { name: 'moustiquaire', type: 'boolean' },
        { name: 'deparasitage', type: 'boolean' },
        { name: 'tpme', type: 'boolean' },
        { name: 'counseling', type: 'string', isOptional: true },
        { name: 'reference', type: 'string', isOptional: true },
        { name: 'complement_information', type: 'string', isOptional: true },
        { name: 'medicament_id', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
      ]
    }),

    // pour les autre table on fais la meme chose 
    // isOptional autorise de ne pas remplir la colonne sa mes null 

  ]
})
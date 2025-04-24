import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import schema from './schemas/schema'
import migrations from './migrations'
import * as Models from './models'
import {Dossier,
        Accouchements,
        Produit,
        Consultation,
        Cpn,
        Dentaire,
        PharmaciePatient,
        Planning,
        Pmi,
        Suivi,
        Vaccins,
        SuiviNouveauNe,
        SurveillanceMere,
        Diagnostic,
        Avortement,
        MaladieChronique,
        Region,
        District,
        Cercle,
        Commune,
        Quartier,
        Arrondissement,
        Module,
        Profil,
        Utilisateur,
        ProfilModule,
        Recette
        } from './models'

const adapter = new SQLiteAdapter({ 
    schema,
    migrations,
    dbName: 'Esante',
 })

export const database = new Database({
  adapter,
  modelClasses: [
    Dossier,
    Accouchements,
    Consultation,
    Produit,
    Cpn,
    Dentaire,
    PharmaciePatient,
    Planning,
    Pmi,
    Recette,
    Suivi,
    Vaccins,
    SuiviNouveauNe,
    SurveillanceMere,
    Diagnostic,
    Avortement,
    MaladieChronique,
    Region,
    District,
    Cercle,
    Commune,
    Quartier,
    Arrondissement,
    Module,
    Profil,
    Utilisateur,
    ProfilModule
  ]
})
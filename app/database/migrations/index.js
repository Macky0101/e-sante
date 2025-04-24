import { schemaMigrations, createTable, addColumns } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    // {
    //   toVersion: 1,
    //   steps: [
    //     // Création de chaque table (dossier, accouchements, ...)
    //     createTable({ name: 'dossier', columns: [ /* mêmes colonnes que schema.js */ ] }),
    //     createTable({ name: 'accouchements', columns: [ /* ... */ ] }),
    //     // ... autres createTable
    //   ],
    // },
  ],
})
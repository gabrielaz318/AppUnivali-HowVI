import * as SQLite from 'expo-sqlite'

// Criando a instancia do banco de dados
const db = SQLite.openDatabase("univali.db")

export default db
import * as SQLite from 'expo-sqlite';

// Buka atau buat database
const db = SQLite.openDatabase('app.db');

// Inisialisasi tabel
db.transaction((tx) => {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT NOT NULL
    );`
  );
});

export const saveToken = (token) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tokens (token) VALUES (?);',
        [token],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const getTokens = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tokens;',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteTokens = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM tokens;',
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

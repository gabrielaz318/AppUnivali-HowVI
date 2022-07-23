import db from "./SQLiteDatabase";

db.transaction((tx) => {

  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  // Remover tabela
  // tx.executeSql("DROP TABLE students;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  // Função para criar tabela
  tx.executeSql(
    "CREATE TABLE students (id INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_class INT DEFAULT NULL, nome TEXT, usuario TEXT UNIQUE, senha TEXT);"
  );
});

// Função SQLite para criar um item
const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "INSERT INTO students (nome, usuario, senha) values (?, ?, ?);",
        [obj.nome, obj.usuario, obj.senha],
        //-----------------------
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

// Função SQLite para listar todos os item
const findAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM students;",
        [],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array);
          else reject("Obj not found"); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

// Função SQLite para procurar um item pelo seu id
const findById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM students WHERE id = ?;",
        [id],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array[0]);
          else reject("Obj not found"); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

// Função SQLite para filtar os registro por um nome de usuário
const verifyUserName = (usuario) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM students WHERE usuario = ?;",
        [usuario],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array[0]);
          else resolve(); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

// Função SQLite função para verificar se um login existe no DB
const findLogin = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM students WHERE usuario = ? AND senha = ?;",
        [obj.usuario, obj.senha],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array[0]);
          else reject("Obj not found"); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

// Função SQLite para atualizar um item
const update = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "UPDATE students SET nome = ?, usuario = ?, senha = ? WHERE id = ?;",
        [obj.nome, obj.usuario, obj.senha, obj.id],
        //-----------------------
        (_, { rows }) => {
            resolve()
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

// Função SQLite para remover um item
const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM students WHERE id = ?;",
        [id],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows._array)
          } else {
            reject([]) // nenhum registro encontrado
          }
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

export default {
    create,
    findAll,
    findById,
    findLogin,
    verifyUserName,
    update,
    remove,
};
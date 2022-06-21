import db from "./SQLiteDatabase";

db.transaction((tx) => {

  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  // tx.executeSql("DROP TABLE messages;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  tx.executeSql(
    "CREATE TABLE teachers (id INTEGER PRIMARY KEY AUTOINCREMENT, fk_id_class INT DEFAULT NULL, nome TEXT, usuario TEXT, senha TEXT, materia TEXT);"
  );
});

const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "INSERT INTO teachers (nome, usuario, senha, materia) values (?, ?, ?, ?);",
        [obj.nome, obj.usuario, obj.senha, obj.materia],
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

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM teachers;",
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

const findById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM teachers WHERE id = ?;",
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

const update = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "UPDATE teachers SET nome = ?, usuario = ?, senha = ?, materia = ? WHERE id = ?;",
        [obj.nome, obj.usuario, obj.senha, obj.materia, obj.id],
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

const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM teachers WHERE id = ?;",
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
    update,
    remove
};
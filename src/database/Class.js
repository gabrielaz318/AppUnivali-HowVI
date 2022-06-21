import db from "./SQLiteDatabase";

db.transaction((tx) => {

  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  // tx.executeSql("DROP TABLE messages;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  tx.executeSql(
    "CREATE TABLE class (id INTEGER PRIMARY KEY AUTOINCREMENT, numero INT);"
  );
});

const create = (obj) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
          "INSERT INTO class (numero) values (?);",
          [obj.numero],
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
            "SELECT * FROM class;",
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
        "SELECT * FROM class WHERE id = ?;",
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
            "UPDATE class SET numero = ? WHERE id = ?;",
            [obj.numero, obj.id],
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
            "DELETE FROM class WHERE id = ?;",
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
  update,
  findById,
  remove
};
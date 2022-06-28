import db from "./SQLiteDatabase";

db.transaction((tx) => {

  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  // Remover tabela
  // tx.executeSql("DROP TABLE class;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  // Função para criar tabela
  tx.executeSql(
    "CREATE TABLE class (id INTEGER PRIMARY KEY AUTOINCREMENT, numero INT);"
  );
});

// Função SQLite criar um item
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
  
// Função SQLite para listar todos os itens
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

// Função SQLite para prcurar um registro com determinado id
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

// Função SQLite para verificar se um item existe, tendo como parametro seu numero (numero da sala)
const verifyClassExist = (numero) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM class WHERE numero = ?;",
        [numero],
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

// Função SQLite para atualizar um item
const update = (obj) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
        //comando SQL modificável
        tx.executeSql(
            "UPDATE class SET numero = ? WHERE id = ?;",
            [obj.numero, obj.id],
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
  remove,
  verifyClassExist
};
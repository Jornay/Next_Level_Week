//Importar a dependencia do SQLite3

const sqlite3 = require("sqlite3").verbose()

//Iniciar o objetivo de banco de dados

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db



//Utilizar o objeto de banco de dados para as nossas operações

db.serialize(function(){
/*    
    //Com comandos SQL: 
    
    //1.Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT        
        );
    `)
            /*
    //2.Inserir dados da tabela
    const query = `
        INSERT INTO places (
            image, 
            name, 
            address, 
            address2, 
            state, 
            city, 
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const values = [
        "https://images.unsplash.com/photo-1542739674-b449a8938b59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
        "PaperSider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos eletrônicos e lâmpadas"
    ]  

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)*/
    
    //3.Consultar dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }

        console.log("Aqui estão os seus registros")
        console.log(rows)
    })
    /*
    //4.Deletar dados da tabela
    db.run(`DELETE FROM places WHERE ID = ?`, [3], function(err){
        if(err){
            return console.log(err)
        }
        console.log("Registro deletado com sucesso")
    })

    //5.Alterar dados da tabela
    db.run(`UPDATE places SET image = "https://images.unsplash.com/photo-1536939459926-301728717817?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" WHERE id = ?`, [1], function(err){
        if(err){
            return console.log(err)
        }
        console.log("Registro alterado com sucesso")
    })*/
})
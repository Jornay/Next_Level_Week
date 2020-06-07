const express = require("express")
const server = express()

//Pegar o banco de dados
const db = require("./database/db.js")

//configurar pasta publica 
server.use(express.static("public"))

//Habilitar o uso da req.body na nossa aplicação

server.use(express.urlencoded({ extended: true}))

//Utilizando template engine
const nunjuncks = require("nunjucks")
nunjuncks.configure("src/views", {
    express: server,
    noCache: true
})


// Configurar caminhos  da minha aplicação

//Página inicial                     // Req é uma requisição 
server.get("/", function (req, res) { //Res: é uma resposta.
    return res.render("index.html", { title: "um titulo" })
})

server.get("/create-point", function (req, res) { //Res: é uma resposta.

    //req.query = Query strings da nossa url
    //console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req , res) =>{
    
    //req.body = Corpo do nosso formulário
            //console.log(req.body)
        //Inserir dados no banco de dados 
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
                req.body.image,
                req.body.name,
                req.body.address,
                req.body.address2,
                req.body.state,
                req.body.city,
                req.body.items 
            ]  

            function afterInsertData(err){
                if(err){
                    return console.log(err)
                }

                console.log("Cadastrado com sucesso")
                console.log(this)

                return res.render("create-point.html", {saved : true})
            }

            db.run(query, values, afterInsertData) 

    
})

server.get("/search", (req, res)=>{
    const search = req.query.search

    if(search == ""){
        //Pesquisa Vazia
        return res.render("search-results.html", { total : 0})
    }
    else{
        //Pegar do banco de dados
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
            if (err) {
                return console.log(err)
            }
            const total = rows.length
    
            console.log("Aqui estão os seus registros")
        
            //Mostrar a página html com os dados do banco de dados.  
            return res.render("search-results.html", { places: rows , total : total})
        })
    }
})

 //Res: é uma resposta.
    //Pegar os dados do banco de dados
    



//Ligar o servidor  ================
server.listen(3000)
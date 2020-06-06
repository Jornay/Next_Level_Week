const express = require("express")
const server = express()

//configurar pasta publica
server.use(express.static("public"))


//Utilizando template engine
const nunjuncks = require("nunjucks")
nunjuncks.configure("src/views", {
    express: server,
    noCache: true
})


// Configurar caminhos  da minha aplicação

    //Página inicial                     // Req é uma requisição 
    server.get("/", function(req, res){ //Res: é uma resposta.
        return res.render("index.html",{title: "um titulo"})
    })

    server.get("/create-point", function(req, res){ //Res: é uma resposta.
        return res.render("create-point.html")
    })

    server.get("/search", function(req, res){ //Res: é uma resposta.
        return res.render("search-results.html")
    })


//Ligar o servidor  ================
server.listen(3000)
const express = require("express")
const dbLibros = require("./db")

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log("el servidor se esta corriendo en el puerto: ",PORT) )

//RUTAS

//OBTENER TODOS LOS LIBROS
app.get("/books", (req,res)=>{
    res.json(dbLibros)
})

//OBTENER LIBROS POR ID
app.get("/books/:id", (req,res)=>{
    const id = parseInt(req.params.id)

    const encontrarID = dbLibros.find((libro)=> libro.id === id)

    res.json(encontrarID)
})

//CREAR LIBRO

app.post("/books", (req,res)=>{
    const {id, title, author, year } = req.body

    const NuevoLibro = dbLibros.push({id, title, author, year })

    res.json({mensaje:"se creo con exito el nuevo libro"})
})
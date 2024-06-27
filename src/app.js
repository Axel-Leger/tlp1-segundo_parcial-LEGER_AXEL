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

    try {
        const encontrarID = dbLibros.find((libro)=> libro.id === id)
        if( !encontrarID){
            res.json({mensaje:"el id del libro que coloco no existe"})
        }else{
            res.json(encontrarID)
        }

    } catch (error) {
        res.json({mensaje:"eror al encontrat el id"})
    }
})

//CREAR LIBRO
app.post("/books", (req,res)=>{
    const {id, title, author, year } = req.body

    try {
        const encontrarID = dbLibros.find((libro)=>libro.id === id)
        if(!encontrarID){
            const NuevoLibro = dbLibros.push({id, title, author, year })
            res.json({mensaje:"se creo con exito el nuevo libro"})
        }else{
            res.json({mensaje:"ya hay otro libro con el mismo id"})
        }
    } catch (error) {
        res.json({mensaje:"error al buscar y crear libro"})
    }
})


//MODIFICAR LIBRO
app.put("/books/:id", (req,res)=>{
    const id = parseInt(req.params.id)
    const {title,author,year} = req.body

    try {
        const encontrarID = dbLibros.find((libro) => libro.id === id)
        if (!encontrarID){
            res.json({mensaje:"no se pudo en contrar el id para modificar"})
        }else{
            encontrarID.title = title
            encontrarID.author = author
            encontrarID.year = year
        
            res.json({mensaje: "se modifico con exito el titulo"})
        }
    } catch (error) {
        res.json({mensaje:"error a en contrar libro para modificar"})
    }
})


//ELIMINAR LIBRO
app.delete("/books/:id", (req,res)=>{
    const id = parseInt(req.params.id)

    try {
        const encontrarID = dbLibros.find((libro)=>libro.id === id)
        if (!encontrarID){
            res.json({mensaje:"no se pudo encontrar el id del libro que desea eliminar"})
        }else{
            const almacenarID = dbLibros.indexOf(encontrarID)
            const eliminarID = dbLibros.splice(almacenarID, 1)

            res.json({mensaje: "se elimino el libro correcatemente"})
        }
    } catch (error) {
        res.json({mensaje:"error al buscar el id del libro que desea eliminar"})
    }
})
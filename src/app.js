const express = require("express")

const app = express()

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log("el servidor se esta corriendo en el puerto: ",PORT) )
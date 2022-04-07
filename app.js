const express = require('express')
const Container = require('./fileManagement')

const app = express()
const database = new Container('productos')

// Home
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// All Products
app.get('/productos', async (req, res) => {
  const allProducts = await database.getAll()
  res.send(allProducts)
})

// Random Product
app.get('/productoRandom', async (req, res) => {
  const allProducts = await database.getAll()
  const randomIndex = Math.floor(Math.random() * allProducts.length)
  const randomProduct = allProducts[randomIndex]
  res.send(randomProduct)
})

// Server configuration
const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${server.address().port}/`)
})
server.on('error', (error) => console.log(`Server error: ${error}`))
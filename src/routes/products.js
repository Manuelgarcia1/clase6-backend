const { Router } = require('express')
const Container = require('../../fileManagement')

const router = new Router()
const database = new Container('products')

//----------* PRODUCTS ROUTES *----------//
// Get All Products
router.get('/', async (req, res) => {
  try {
    const allProducts = await database.getAll()
    res.json(allProducts)
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
})

// Get Product by ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const productFound = await database.getById(id)

    if (!productFound) {
      res.send({ error: 'Producto no encontrado' })
    } else {
      res.json(productFound)
    }
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
})

// Add New Product
router.post('/', async (req, res) => {
  try {
    const allProducts = await database.getAll()
    const noImage =
      'https://cdn1.iconfinder.com/data/icons/carbon-design-system-vol-6/32/no-image-256.png'
    let lastID = 0

    if (allProducts.length) {
      lastID = allProducts[allProducts.length - 1].id
    }

    const newProduct = {
      id: lastID + 1,
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail ? req.body.thumbnail : noImage,
    }

    await database.add(newProduct)
    res.json(newProduct)
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
})

// Edit product by ID
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const productFound = await database.getById(id)

    console.log('%c⧭ req.body', 'color: #ff6c61;', req.body)

    const editedProduct = {
      id: productFound.id,
      title: req.body.title ? req.body.title : productFound.title,
      price: req.body.price ? req.body.price : productFound.price,
      thumbnail: req.body.thumbnail ? req.body.thumbnail : productFound.thumbnail,
    }

    console.log('%c⧭ editedProduct', 'color: #00ff03;', editedProduct)

    await database.editById(editedProduct)

    res.json(editedProduct)
  } catch (error) {
    console.log(`ERROR: ${error}`)
  }
})

// Delete product by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  await database.deleteById(id)

  res.send(`The product with ID ${id} has been removed.`)
})

//----------* EXPORTS ROUTER *----------//
module.exports = router
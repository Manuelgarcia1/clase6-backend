const fs = require('fs')

class Container {
  constructor(fileName) {
    this.fileName = fileName
  }

  async getAll() {
    try {
      const allProducts = JSON.parse(await fs.promises.readFile(`${this.fileName}.json`, 'utf-8'))
      if (allProducts.length) {
        return allProducts
      } else {
        console.log('There are no products in the list.')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Container

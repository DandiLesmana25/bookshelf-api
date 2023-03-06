const books = []
const { nanoid } = require('nanoid')

function get () {
  return books
}

function getById (id) {
  return books.find(book => book.id === id)
}

function create (book) {
  book.id = nanoid(16)
  book.insertedAt = new Date().toISOString()
  book.updatedAt = new Date().toISOString()

  books.push(book)

  return book
}

function update (id, book) {
  const index = books.findIndex(book => book.id === id)
  if (index === -1) return false
  for (const [key, value] of Object.entries(book)) {
    books[index][key] = value
  }

  books[index].updatedAt = new Date().toISOString()

  return true
}

function remove (id) {
  const index = books.findIndex(book => book?.id === id)
  if (index === -1) return false
  books.splice(index, 1)

  return true
}

module.exports = { get, getById, create, update, remove }

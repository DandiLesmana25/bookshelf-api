const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('./handler')

module.exports = [
  {
    method: 'GET',
    path: '/books',
    handler: getBooks
  },
  {
    method: 'POST',
    path: '/books',
    handler: createBook
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBook
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBook
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBook
  }
]

const db = require('./db')

module.exports = {
  getBooks: (req, res) => {
    try {
      const query = req.query
      let books = db.get()

      if (query.name) books = books.filter(book => book.name.toLowerCase().includes(query.name.toLowerCase()))

      const reading = parseInt(query.reading)
      if (reading === 1) {
        books = books.filter(book => book.reading)
      } else if (reading === 0) {
        books = books.filter(book => !book.reading)
      }

      const finished = parseInt(query.finished)
      if (finished === 1) {
        books = books.filter(book => book.finished)
      } else if (finished === 0) {
        books = books.filter(book => !book.finished)
      }

      books = books.map(book => ({ id: book.id, name: book.name, publisher: book.publisher }))
      return res.response({
        status: 'success',
        data: {
          books
        }
      }).code(200)
    } catch (err) {
      console.log(err)
      return res.response({
        status: 'error',
        message: 'buku gagal ditambahkan'
      }).code(500)
    }
  },

  createBook: (req, res) => {
    try {
      const body = req.payload
      if (!body.name) {
        return res.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku'
        }).code(400)
      }

      if (body.readPage > body.pageCount) {
        return res.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        }).code(400)
      }

      body.readPage === body.pageCount ? body.finished = true : body.finished = false

      const book = db.create(body)
      return res.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: book.id
        }
      }).code(201)
    } catch (err) {
      return res.response({
        status: 'error',
        message: 'buku gagal ditambahkan'
      }).code(500)
    }
  },

  getBook: (req, res) => {
    try {
      const book = db.getById(req.params.id)

      if (!book) {
        return res.response({
          status: 'fail',
          message: 'Buku tidak ditemukan'
        }).code(404)
      }

      return res.response({
        status: 'success',
        data: {
          book
        }
      }).code(200)
    } catch (err) {
      return res.response({
        status: 'error',
        message: 'buku gagal ditambahkan'
      }).code(500)
    }
  },

  updateBook: (req, res) => {
    try {
      const book = db.getById(req.params.id)
      if (!book) {
        return res.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan'
        }).code(404)
      }

      const body = req.payload
      if (!body.name) {
        return res.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku'
        }).code(400)
      }

      if (body.readPage > body.pageCount) {
        return res.response({
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        }).code(400)
      }
      body.readPage === body.pageCount ? body.finished = true : body.finished = false

      db.update(req.params.id, body)
      return res.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
      }).code(200)
    } catch (err) {
      return res.response({
        status: 'error',
        message: 'buku gagal ditambahkan'
      }).code(500)
    }
  },

  deleteBook: (req, res) => {
    try {
      const book = db.getById(req.params.id)
      if (!book) {
        return res.response({
          status: 'fail',
          message: 'Buku gagal dihapus. Id tidak ditemukan'
        }).code(404)
      }

      db.remove(req.params.id)
      return res.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
      }).code(200)
    } catch (err) {
      return res.response({
        status: 'error',
        message: 'buku gagal ditambahkan'
      }).code(500)
    }
  }
}

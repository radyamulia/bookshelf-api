const { nanoid } = require('nanoid');
const books = require('./books');

/**
 * @description - add new book into books
 */
const onAddBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // if name is empty
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  // if user input readPage more than pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // on success
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  // on generic error
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);
  return response;
};

/**
 * @description - get all the books that match query param (name)
 */
const getBookByNameHandler = (name) => {
  const regx = new RegExp(name, 'i');
  const filteredBooks = books.filter((book) => regx.test(book.name));
  return filteredBooks;
};

/**
 * @description - get all the books that match query param (finished)
 */
const getBookByFinishedHandler = (val) => {
  const filteredBooks = books.filter((book) => book.finished === !!Number(val));
  return filteredBooks;
};

/**
 * @description - get all the books that match query param (reading)
 */
const getBookByReadingHandler = (val) => {
  const filteredBooks = books.filter((book) => book.reading === !!Number(val));
  return filteredBooks;
};

/**
 * @description - get all the books
 */
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  const data = {};

  // get all books with name query
  if (name !== undefined) {
    const filteredBooks = getBookByNameHandler(name);
    // book(s) found
    if (filteredBooks.length > 0) {
      // assign books array into data to be returned
      data.books = filteredBooks.map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        };
      });

      const response = h.response({
        status: 'success',
        data,
      });

      response.code(200);
      return response;
    }

    // book(s) not found
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
  }

  // get all books with finished query
  if (finished !== undefined) {
    const filteredBooks = getBookByFinishedHandler(finished);
    // book(s) found
    if (filteredBooks.length > 0) {
      // assign books array into data to be returned
      data.books = filteredBooks.map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        };
      });

      const response = h.response({
        status: 'success',
        data,
      });

      response.code(200);
      return response;
    }

    // book(s) not found
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
  }

  // get all books with reading query
  if (reading !== undefined) {
    const filteredBooks = getBookByReadingHandler(reading);
    // book(s) found
    if (filteredBooks.length > 0) {
      // assign books array into data to be returned
      data.books = filteredBooks.map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        };
      });

      const response = h.response({
        status: 'success',
        data,
      });

      response.code(200);
      return response;
    }

    // book(s) not found
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
  }

  // get all books with no query
  // assign books array into data to be returned
  data.books = books.map((book) => {
    return {
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    };
  });

  return {
    status: 'success',
    data,
  };
};

/**
 * @description - get all the books based on the book id
 */
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  // if book doesn't found
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

/**
 * @description - update existing book's information
 */
const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const index = books.findIndex((book) => book.id === id);

  // if name is empty
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  // if user input readPage more than pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  // on success
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt: new Date().toISOString(),
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  // id not found
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

/**
 * @description - delete existing book
 */
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  // if book not found
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

module.exports = {
  onAddBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  getBookByNameHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};

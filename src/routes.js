const {
  onAddBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require('./handler');

const routes = [
  // add new book
  {
    method: 'POST',
    path: '/books',
    handler: onAddBookHandler,
  },
  // get all books
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  // get specific book
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  // edit book
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  },
  // delete book
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;

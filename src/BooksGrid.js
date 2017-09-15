import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const BooksGrid = ({ shelfId, books, onMoveBook }) => {
  const gridBooks =
    shelfId !== undefined ? books.filter(book => book.shelf === shelfId) : books;
  return (
    <ol className="books-grid">
      {gridBooks.map(book => <Book key={book.id} data={book} onMoveBook={onMoveBook} />)}
    </ol>
  );
};

BooksGrid.propTypes = {
  shelfId: PropTypes.oneOf(['wantToRead', 'currentlyReading', 'read']),
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMoveBook: PropTypes.func.isRequired
};

export default BooksGrid;

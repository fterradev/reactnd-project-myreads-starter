import React, { PureComponent } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BooksGrid extends PureComponent {//= ({ shelfId, books, onMoveBook }) => {
  static propTypes = {
    shelfId: PropTypes.oneOf(['wantToRead', 'currentlyReading', 'read']),
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMoveBook: PropTypes.func.isRequired
  };
  render() {
    const { shelfId, books, onMoveBook } = this.props;
    const gridBooks = (shelfId !== undefined)
      ? books.filter(book => book.shelf === shelfId)
      : books;
    return (
      <ol className="books-grid">
        {gridBooks.map(book => 
          <Book key={book.id} data={book} onMoveBook={onMoveBook} />
        )}
      </ol>
    );
  }
}

export default BooksGrid;

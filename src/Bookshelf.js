import React, { PureComponent } from 'react';
import BooksGrid from './BooksGrid';
import PropTypes from 'prop-types';

class Bookshelf extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOf(['wantToRead', 'currentlyReading', 'read']).isRequired,
    title: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMoveBook: PropTypes.func.isRequired
  };

  render() {
    const { id, title, books, onMoveBook } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <BooksGrid shelfId={id} books={books} onMoveBook={onMoveBook} />
        </div>
      </div>
    );
  }
}


export default Bookshelf;

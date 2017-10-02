import React, { PureComponent } from 'react';
import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ListBooks extends PureComponent {
  static propTypes = {
    shelves: PropTypes.arrayOf(PropTypes.object).isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMoveBook: PropTypes.func.isRequired
  };

  render() {
    const { shelves, books, onMoveBook } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            {shelves.map(shelf => (
              <Bookshelf
                key={shelf.id}
                title={shelf.title}
                id={shelf.id}
                books={books}
                onMoveBook={onMoveBook}
              />
            ))}
          </div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }

}
export default ListBooks;

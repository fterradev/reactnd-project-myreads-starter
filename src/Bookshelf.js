import React, { Component } from 'react';
import BooksGrid from './BooksGrid';
import PropTypes from 'prop-types';

class Bookshelf extends Component {
  static propTypes = {
    id: PropTypes.oneOf(['wantToRead', 'currentlyReading', 'read']).isRequired,
    title: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMoveBook: PropTypes.func.isRequired
  };
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BooksGrid
            shelfId={this.props.id}
            books={this.props.books}
            onMoveBook={this.props.onMoveBook}
          />
        </div>
      </div>
    );
  }
}

export default Bookshelf;

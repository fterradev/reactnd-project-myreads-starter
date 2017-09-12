import React, { Component } from 'react'
import BooksGrid from './BooksGrid'

class Bookshelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BooksGrid shelfId={this.props.id} books={this.props.books} onMoveBook={this.props.onMoveBook} />
        </div>
      </div>
    )
  }
}

export default Bookshelf
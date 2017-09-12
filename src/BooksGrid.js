import React, { Component } from 'react'
import Book from './Book'

class BooksGrid extends Component {
  render() {
    const { shelfId, books, onMoveBook } = this.props
    const gridBooks = (shelfId !== undefined)
      ? books.filter((book) => (book.shelf === shelfId))
      : books
    return (
      <ol className="books-grid">
        {gridBooks.map((book) => (
          <Book key={book.id} data={book} onMoveBook={onMoveBook} />
        ))}
      </ol>
    )
  }
}

export default BooksGrid
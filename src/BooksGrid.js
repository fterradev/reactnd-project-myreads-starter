import React, { Component } from 'react'

class BooksGrid extends Component {
  render() {
    const { shelfId, books, onMoveBook } = this.props
    const gridBooks = (shelfId !== null)
      ? books.filter((book) => (book.shelf === shelfId))
      : books
    return (
      <ol className="books-grid">
        {gridBooks.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: book.imageLinks ? `url("${book.imageLinks.thumbnail}")` : ''
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select value={shelfId} onChange={(event) => onMoveBook(book, event.target.value)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default BooksGrid
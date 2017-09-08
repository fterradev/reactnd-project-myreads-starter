import React, { Component } from 'react'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  render() {
    const shelves = [
      {
        title: 'Currently Reading',
        id: 'currentlyReading'
      },
      {
        title: 'Want to Read',
        id: 'wantToRead'
      },
      {
        title: 'Read',
        id: 'read'
      }
    ]
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (
              <BookShelf
                key={shelf.id}
                title={shelf.title}
                id={shelf.id}
                books={this.props.books}
                onMoveBook={this.props.onMoveBook}
              />
            ))}
            
          </div>
        </div>
        <div className="open-search">
          <a onClick={this.props.onNavigateToSearch}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks
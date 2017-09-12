import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'

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
              <Bookshelf
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
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
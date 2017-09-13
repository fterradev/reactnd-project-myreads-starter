import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  onMoveBook = (book, shelfId) => {
    BooksAPI.update(book, shelfId).then((res) => {
      this.setState((state) => {
        const otherBooks = state.books.filter((other) => (other.id !== book.id))
        if (res[shelfId] === undefined) { // The book has been moved to a shelf that doesn't exist, thus it has been removed.
          return {books: otherBooks}
        }
        book.shelf = shelfId
        return {books: otherBooks.concat([ book ])}
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            shelfBooks={this.state.books}
            onMoveBook={this.onMoveBook}
            history={history} />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onMoveBook={this.onMoveBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp

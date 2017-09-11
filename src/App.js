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
    this.setState((state) => {
      const otherBooks = state.books.filter((other) => (other.id !== book.id))
      book.shelf = shelfId
      return {books: otherBooks.concat([ book ])}
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            shelfBooks={this.state.books} />
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

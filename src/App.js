import React from 'react'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
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
        {this.state.showSearchPage ? (
          <SearchBooks onNavigateToList={() => this.setState({ showSearchPage: false })} />
        ) : (
          <ListBooks
            books={this.state.books}
            onNavigateToSearch={() => this.setState({ showSearchPage: true })}
            onMoveBook={this.onMoveBook}
          />
        )}
      </div>
    )
  }
}

export default BooksApp

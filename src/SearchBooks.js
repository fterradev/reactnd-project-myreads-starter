import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery(rawQuery) {
    const query = rawQuery;
    this.setState({ query });
    if (query.length > 0) {
      BooksAPI.search(query).then((results) => {
        this.setState((state) => {
          if (state.query === query)
            return { books: Array.isArray(results) ? results : [] }
        })
      })
    } else {
      this.setState((state) => {
        if (state.query === query)
          return { books: [] }
      })
    }
  }

  render() {
    const { query } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={this.state.books}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks
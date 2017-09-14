import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';
import * as BooksAPI from './BooksAPI';
import debounce from 'debounce';
import PropTypes from 'prop-types';

class SearchBooks extends Component {
  static propTypes = {
    shelfBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMoveBook: PropTypes.func.isRequired,
    initialQuery: PropTypes.string,
    onQueryUpdated: PropTypes.func
  };

  state = {
    query: '',
    resultsAreUpToDate: true,
    books: []
  };

  /**
  * @description Makes the query available externally.
  * @param {string} query
  */
  onQueryUpdated = query => {
    if (this.props.onQueryUpdated) this.props.onQueryUpdated(query);
  };

  search = (query, bypassQueryUpdate) =>
    BooksAPI.search(query).then(results => {
      this.setState(state => {
        if (state.query === query) {
          // checks if the query is still the same value supplied for this search request
          if (!bypassQueryUpdate) this.onQueryUpdated(query);
          return Array.isArray(results)
            ? {
                books: results.map(book =>
                  // assign apropriate shelf for the book
                  Object.assign({}, book, {
                    shelf: (this.props.shelfBooks.find(
                      shelfBook => shelfBook.id === book.id
                    ) || { shelf: undefined }).shelf // find the same book in some shelf // otherwise set the shelf to undefined
                  })
                ),
                resultsAreUpToDate: true
              }
            : {
                books: [],
                resultsAreUpToDate: true
              };
        }
      });
    });

  debouncedSearch = debounce(this.search, 250); // debounce wait time

  updateQuery(rawQuery) {
    const query = this.formatQuery(rawQuery);
    this.setState({
      query,
      resultsAreUpToDate: false
    });
    if (query.length > 0) {
      this.debouncedSearch(query);
    } else {
      this.setState(state => {
        if (state.query === query) {
          // checks if the query is still the same value supplied earlier
          this.onQueryUpdated(query);
          return {
            books: [],
            resultsAreUpToDate: true
          };
        }
      });
    }
  }

  formatQuery = query =>
    query
      .replace(/^ {1,}/, '') // remove leading spaces
      .replace(/ {2,}/g, ' '); // remove duplicated spaces

  componentDidMount() {
    const query = this.props.initialQuery;
    if (query) {
      this.setState(state => ({
        query,
        resultsAreUpToDate: false
      }));
      this.search(query, true);
    }
    document.querySelector('input#search-query').focus();
  }

  render() {
    const { query, resultsAreUpToDate, books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input
              id="search-query"
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        {query.length > 0 &&
        resultsAreUpToDate &&
        books.length === 0 && (
          <div className="search-books-no-results">
            <span>No results for "{query}"</span>
          </div>
        )}
        <div className="search-books-results">
          <BooksGrid books={books} onMoveBook={this.props.onMoveBook} />
        </div>
      </div>
    );
  }
}

export default SearchBooks;

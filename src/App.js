import React from 'react';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  onMoveBook = (book, shelfId) => {
    BooksAPI.update(book, shelfId).then(res => {
      this.setState(state => {
        const otherBooks = state.books.filter(other => other.id !== book.id);
        if (res[shelfId] === undefined) {
          // The book has been moved to a shelf that doesn't exist, thus it has been removed.
          return { books: otherBooks };
        }
        book.shelf = shelfId;
        return { books: otherBooks.concat([book]) };
      });
    });
  };

  onSearchQueryUpdated = (query, history, searchParam) => {
    history.replace({
      search: query ? `${searchParam}=${encodeURIComponent(query)}` : ''
    });
    /* const locationSearchObj = queryString.parse(history.location.search);
    locationSearchObj[searchParam] = (query) ? query : undefined;
    history.replace({
      search: queryString.stringify(locationSearchObj)
    }) */
  };

  render() {
    const searchParam = 'q';
    return (
      <div className="app">
        <Route
          path="/search"
          render={({ history }) => (
            <SearchBooks
              shelfBooks={this.state.books}
              onMoveBook={this.onMoveBook}
              initialQuery={queryString.parse(history.location.search)[searchParam] || ''}
              onQueryUpdated={query => {
                this.onSearchQueryUpdated(query, history, searchParam);
              }}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks books={this.state.books} onMoveBook={this.onMoveBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

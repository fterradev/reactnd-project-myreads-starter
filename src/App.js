import React from 'react';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
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

  shelves = [
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
  ];

  searchBookLocationInUpdateResults = (results, bookId) => {
    this.shelves.forEach(shelf => {
      if (results[shelf.id].find(shelfBookId => shelfBookId === bookId)) {
        return shelf.id;
      }
    });
    return undefined;
  }

  onMoveBook = (book, shelfId) => {
    BooksAPI.update(book, shelfId).then(res => {
      this.setState(state => {
        const otherBooks = state.books.filter(other => other.id !== book.id);
        if (res[shelfId] === undefined) {
          // The book has been moved to a shelf that doesn't exist, thus it has been removed.
          if (this.searchBookLocationInUpdateResults(res, book.id) === undefined) {
            console.log('Book succesfully removed.');
            return {books: otherBooks};
          } else {
            console.log('Book removal failed.');
          }
        }
        book.shelf = shelfId;
        if (res[shelfId].find(bookId => bookId === book.id)) {
          console.log('Book succesfully moved to %s.', shelfId);
          return {books: otherBooks.concat([book])};
        } else {
          console.log('Book move failed.');
        }
      });
    });
  };

  onSearchQueryUpdated = (query, history) => {
    history.replace({
      pathname: '/search' + (query ? `/${query}` : '')
    });
    /* const locationSearchObj = queryString.parse(history.location.search);
    locationSearchObj[searchParam] = (query) ? query : undefined;
    history.replace({
      search: queryString.stringify(locationSearchObj)
    }) */
  };

  render() {
    //const searchParam = 'q';
    return (
      <div className="app">
        <Route
          path="/search/:initialQuery?"
          render={({ match, history }) => (
            <SearchBooks
              shelfBooks={this.state.books}
              onMoveBook={this.onMoveBook}
              initialQuery={match.params.initialQuery || ''}
              onQueryUpdated={query => {
                this.onSearchQueryUpdated(query, history);
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

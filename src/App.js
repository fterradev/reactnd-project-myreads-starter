import React from 'react';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import Notifications, { notify } from 'react-notify-toast';
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

  enqueueToast = notify.createShowQueue();

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
      if (results[shelf.id].some(shelfBookId => shelfBookId === bookId)) {
        return shelf.id;
      }
    });
    return null;
  };

  checkBookRemoval = (bookId, results) => {
    return this.searchBookLocationInUpdateResults(results, bookId) === null;
  };

  checkBookUpdate = (bookId, shelfId, results) => {
    return results[shelfId].some(shelfBookId => shelfBookId === bookId);
  };

  onMoveBook = (book, shelfId) => {
    BooksAPI.update(book, shelfId)
      .then(res => {
        if (!this.shelves.some(shelf => shelf.id === shelfId)) {
          // There is no shelf with this id, so the book has been moved to a shelf that doesn't exist, thus it has been removed.
          if (this.checkBookRemoval(book.id, res)) {
            this.setState(state => {
              const otherBooks = state.books.filter(other => other.id !== book.id);
              return {books: otherBooks};
            });
            this.enqueueToast(`"${book.title}" succesfully removed.`, 'success');
          } else {
            this.enqueueToast(`"${book.title}" removal has failed.`, 'error');
          }
        } else {
          if (this.checkBookUpdate(book.id, shelfId, res)) {
            book.shelf = shelfId;
            const shelf = this.shelves.find(shelf => shelf.id === shelfId);
            this.setState(state => {
              const otherBooks = state.books.filter(other => other.id !== book.id);
              return {books: otherBooks.concat([book])};
            });
            this.enqueueToast(
              `"${book.title}" succesfully moved to ${shelf.title}.`,
              'success'
            );
          } else {
            this.enqueueToast(`"${book.title}" move has failed.`, 'error');
          }
        }
      })
      .catch(reason => {
        this.enqueueToast(`"${book.title}" update has failed.`, 'error');
        //console.log(reason);
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
        <Notifications />
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
            <ListBooks
              shelves={this.shelves}
              books={this.state.books}
              onMoveBook={this.onMoveBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

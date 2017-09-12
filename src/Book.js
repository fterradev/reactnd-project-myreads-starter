import React, { Component } from 'react'

class Book extends Component {
  render() {
    const { data, onMoveBook } = this.props
    const { authors = [], shelf = 'none' } = data
    return (
      <li key={data.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: data.imageLinks ? `url("${data.imageLinks.thumbnail}")` : ''
              }}
            ></div>
            <div className="book-shelf-changer">
              <select value={shelf} onChange={(event) => onMoveBook(data, event.target.value)}>
                <option value="" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{data.title}</div>
          {authors.map((author, index) => (
            <div key={index} className="book-authors">{author}</div>
          ))}
        </div>
      </li>
    );
  }
}

export default Book
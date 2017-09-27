import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImageSize } from './getImageSize';

class Book extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onMoveBook: PropTypes.func.isRequired
  };

  state = {
    imageURL: null,
    imageSize: {
      width: '100%',
      height: '100%'
    }
  };

  imageSizeGetter = undefined;

  componentDidMount() {
    const { imageLinks } = this.props.data;
    const imageURL = imageLinks ? imageLinks.thumbnail : null;
    if (imageURL) {
      this.imageSizeGetter = getImageSize(imageURL);
      this.imageSizeGetter.promise
        .then(imageSize => {
          this.setState({
            imageURL,
            imageSize
          });
        })
        .catch(reason => {
          // do nothing - keep initial state
        });
    }
  }

  componentWillUnmount() {
    if (this.imageSizeGetter) {
      this.imageSizeGetter.cancel(); //Cancel processing which would occur on completion of getting the image data.
    }
  }

  render() {
    const { data, onMoveBook } = this.props;
    const { authors = [], shelf = 'none' } = data;
    const { imageURL } = this.state;
    const { width, height } = this.state.imageSize;

    return (
      <li key={data.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width,
                height,
                backgroundImage: imageURL ? `url("${imageURL}")` : ''
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={shelf}
                onChange={event => onMoveBook(data, event.target.value)}
              >
                <option value="" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{data.title}</div>
          {authors.map((author, index) => (
            <div key={index} className="book-authors">
              {author}
            </div>
          ))}
        </div>
      </li>
    );
  }
}

export default Book;

/*The Thumbnail variable in this component was helped by https://www.youtube.com/watch?v=i6L2jLHV9j8 */

import React, { Component } from 'react';

class Book extends Component {
    render() {
        let thumbnail = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : '' ;

        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${ thumbnail}"`}} ></div>
                    <div className="book-shelf-changer">
                        <select
                            onChange = {(event) => this.props.changeShelf(
                                this.props.book, event.target.value
                            )}
                            value = {this.props.shelf}
                        >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        );
    }

}

export default Book;

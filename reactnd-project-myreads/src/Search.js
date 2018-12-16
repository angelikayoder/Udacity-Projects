/* Much of the search section was helped along with a "Study Jam" https://www.youtube.com/watch?v=i6L2jLHV9j8 */

import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {

    state = {
        query: '',
        queriedBooks: []
    }

    updateQuery = (query) => {
        this.setState({ query: query })
        this.updateQueriedBooks(query);
    }

    updateQueriedBooks = (query) => {
        if (query) {
            BooksAPI.search(query).then((queriedBooks) => {
                if (queriedBooks.error) {
                    this.setState({ queriedBooks : [] });
                } else {
                    this.setState({ queriedBooks : queriedBooks })
                }
            })
        } else {
            this.setState({ queriedBooks : [] });
        }
    }

    render() {
        return(
            <div className="search-books">
              <div className="search-books-bar">
                <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                <div className="search-books-input-wrapper">
                  <input
                      type="text" placeholder="Search by title or author" value = {this.state.query} onChange = {(event) => this.updateQuery(event.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                     {
                         this.state.queriedBooks.map(queriedBook => (
                             <li key = {queriedBook.id}>
                                <Book
                                    book = {queriedBook}
                                />
                             </li>
                         ))
                     }
                </ol>
              </div>
            </div>
        );
    }
}

export default Search;

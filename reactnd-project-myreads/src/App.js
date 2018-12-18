import React from 'react';
import Main from './Main';
import Search from './Search';
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            BooksAPI.getAll().then((books) => {
                this.setState({ books })
            })
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path = "/" render = {() => (
                    <Main
                        books = {this.state.books}
                        changeShelf = {this.changeShelf}
                    />
                )} />

                <Route path = "/search" render = {() => (
                    <Search
                        changeShelf = {this.changeShelf}
                        books = {this.state.books}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp

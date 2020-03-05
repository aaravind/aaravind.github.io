import React, { Component } from 'react';

import { loadData } from '../etc/util';
import BookList from './BookList';
import BookDetails from './BookDetails';
import CreateBookItem from './CreateBookItem';

class BookContainer extends Component {

    componentDidMount() {
        loadData();
    }

    render() {
        const styles = {
            width: '50%'
        }
        return (
            <div className="container book-container">
                <div className="d-flex">
                    <div className="book-list" style={styles}>
                        <CreateBookItem />
                        <BookList />
                    </div>
                    <div className="book-details" style={styles}>
                        <BookDetails />
                    </div>
                </div>
            </div>
        );
    }
}

export default BookContainer;
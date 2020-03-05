import React, { Component } from 'react';
import { connect } from 'react-redux';

import { activeItemHandler } from '../etc/util';
import BookListItem from './BookListItem';

class BookList extends Component {

    itemClickHandler = (id) => {
        activeItemHandler(id);
    }
    render() {
        const { data } = this.props;
        return (
            <ul className="d-flex flex-wrap book-list">
                {
                    data.length ?
                    data.map(item => {
                        return (
                            <BookListItem data={item} key={item.id}/>
                        );
                    })
                    :
                    'No books available'
                }
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    const data = state.bookReducer.bookData ? state.bookReducer.bookData : [];
    return {
        data: [...data]
    }
}

export default connect(mapStateToProps)(BookList);
import React from 'react';
import BookCard from './BookCard';

const BookListItem = (props) => {
        const { data } = props;
        return (
            <li className="book-list-item m-2">
                <BookCard data={data} />
            </li>
        );
}

export default BookListItem;
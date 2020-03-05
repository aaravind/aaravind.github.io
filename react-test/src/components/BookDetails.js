import React, { Fragment } from 'react';
import { connect } from 'react-redux';


import BookCard from './BookCard';

const BookDetails = (props) => {
    const { activeItem } = props;
    return (
        <Fragment>
        { activeItem && activeItem.id ?
            <BookCard data={activeItem} isDetailCard={true}/>
        :
        ''
        }
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        activeItem: state.bookReducer.activeBook
    }
}

export default connect(mapStateToProps)(BookDetails);
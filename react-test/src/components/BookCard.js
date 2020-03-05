import React from 'react';
import { activeItemHandler, deleteBookItem } from '../etc/util';
const BookCard = (props) => {
    const { data, isDetailCard } = props;
    const itemClickHandler = (id) => {
        activeItemHandler(id);
    }
    const deleteBookItemClickHandler = (id) => {
        console.log(id);
        deleteBookItem(id);
    }
    return (
        data ? (
            <div className="card">
                <img src={data['image-url']} className="card-img-top" alt={data['image-url']} onClick={
                () => {
                    itemClickHandler(data.id);
                }
            }/>
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    { !isDetailCard ?
                    <button className="" type="button" onClick={
                        () => {
                            deleteBookItemClickHandler(data.id);
                        }
                    }>Delete</button>
                    :
                    ''
                    }
                    {/* <p className="card-text">{data['sub-title']}</p> */}
                    {
                        isDetailCard && (
                            <React.Fragment>
                                <p className="card-text">{data['sub-title']}</p>
                                <p className="">{data.description}</p>
                            </React.Fragment>
                        )
                    }
                </div>
            </div>
        ) : <React.Fragment />
    );
}

export default BookCard;
import React, { Component } from 'react';

import { createBookItemHandler } from '../etc/util';

class CreateBookItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookTitle: '',
            bookSubTitle: '',
            bookUrl: '',
            description: '',
            isActive: false
        };
    }
    submitHandler = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.bookTitle,
            'sub-title': this.state.bookSubTitle,
            'image-url': this.state.bookUrl,
            description: this.state.description
        }
        createBookItemHandler(data);
        this.toggleForm(false);
    }

    onChangeHandler = (e) => {
        const name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val
        });
    }

    toggleForm = (isVisible) => {
        this.setState({
            isActive: isVisible
        });
    }

    render() {

        return (
            <div className="create-book-wrapper">
                {
                    !this.state.isActive ? (
                        <button className="" type="button" onClick={() => {
                            this.toggleForm(true);
                        }}>Add Book</button>
                    ) : (
                        <div className="create-book">
                            <form onSubmit={this.submitHandler}>
                                <div className="form-group">
                                    <label htmlFor="bookTitle">
                                        <span>Book Name: </span>
                                        <input id="bookTitle" type="text" name="bookTitle" value={this.state.bookTitle} onChange={this.onChangeHandler}/>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bookSubTitle">
                                        <span>Book Name: </span>
                                        <input id="bookSubTitle" type="text" name="bookSubTitle" value={this.state.bookSubTitle} onChange={this.onChangeHandler}/>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="imageUrl">
                                        <span>Image URL: </span>
                                        <input id="bookUrl" type="text" name="bookUrl" value={this.state.bookUrl} onChange={this.onChangeHandler}/>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">
                                        <span>Description: </span>
                                        <textarea id="description" name="description" value={this.state.description} onChange={this.onChangeHandler}></textarea>
                                    </label>
                                </div>
                                <button type="submit">Add Book</button>
                            </form>
                        </div>
                    )
                }
            </div>
        );
    } 
}

export default CreateBookItem;
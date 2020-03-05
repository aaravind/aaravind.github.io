import * as actions from '../actions/bookActions';

export const bookReducer = (state=[], action) => {
    switch(action.type) {
        case actions.SET_BOOK_DATA_ACTION: {
            return {
                ...state,
                bookData: [...action.payload.data]
            }
        }
        case actions.SET_ACTIVE_BOOK_ACTION: {
            return {
                ...state,
                activeBook: {
                    ...action.payload.data
                }
            }
        }
        case actions.CREATE_BOOK_ACTION: {
            return {
                ...state,
                bookData: [action.payload.data, ...state.bookData],
                activeBook: {
                    ...action.payload.data
                }
            }
        }
        case actions.DELETE_BOOK_ACTION: {
            console.log('here');
            const tempData = state.bookData.filter((each) => each.id !== action.payload.id);
            const activeData = state.activeBook && state.activeBook.id === action.payload.id ? tempData[0] : state.activeBook;
            return {
                ...state,
                bookData: tempData,
                activeBook: {
                    ...activeData
                }
            }
        }
        default: {
            return state;
        }
    }
}
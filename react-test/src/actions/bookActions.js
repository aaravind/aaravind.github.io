// Action Types

export const SET_BOOK_DATA_ACTION = 'SET_BOOK_DATA_ACTION';
export const SET_ACTIVE_BOOK_ACTION = 'SET_ACTIVE_BOOK_ACTION';
export const CREATE_BOOK_ACTION = 'CREATE_BOOK_ACTION';
export const DELETE_BOOK_ACTION = 'DELETE_BOOK_ACTION';
// Action Creators
export const setBookDataAction = (data) => {
    return {
        type: SET_BOOK_DATA_ACTION,
        payload: data
    }
}

export const setActiveBookAction = (data) => {
    return {
        type: SET_ACTIVE_BOOK_ACTION,
        payload: {
            data: {...data[0]}
        }
    }
}

export const createBookAction = (data) => {
    return {
        type: CREATE_BOOK_ACTION,
        payload: {
            data
        }
    }
}

export const deleteActiveBookAction = (data) => {
    console.log('here12', data);
    return {
        type: DELETE_BOOK_ACTION,
        payload: {
            id: data
        }
    }
}
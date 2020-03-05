
import store from '../store';
import { setBookDataAction, setActiveBookAction, createBookAction, deleteActiveBookAction } from '../actions/bookActions';

export const loadData = () => {
    // var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'image/jpeg');
    
    var myInit = { method: 'GET',
            //    headers: myHeaders,
                mode: 'cors',
                cache: 'default' };
    const request = new Request('/data/data.json', myInit);

    fetch(request).then(response => {
        return response.json();
    }, error => {
        console.log(error);
    })
    .then(result => {
        store.dispatch(setBookDataAction(result));
    })
}

export const activeItemHandler = (id) => {
    store.dispatch(setActiveItem(id));
}

const setActiveItem = (id) => {
    return (dispatch, getState) => {
        const data = getState().bookReducer.bookData;
        const activeItem = data.filter(item => {
            return item.id === id;
        });
        dispatch(setActiveBookAction(activeItem));
    }
}

export const createBookItemHandler = (data) => {
    store.dispatch(createBookItem(data));
}

const createBookItem = (data) => {
    return (dispatch, getState) => {
        const d = {
            ...data,
            id: 'book_'+Date.now()
        }
        dispatch(createBookAction(d));
    }
}
export const deleteBookItem = (data) => {
    console.log('utile', data);
    store.dispatch(deleteActiveBookAction(data));
}

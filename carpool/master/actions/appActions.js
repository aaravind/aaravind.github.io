export function updatedestinations(start,destination){
    return function(dispatch){
     dispatch({ type:'UPDATE_DESTINATIONS', start: start, destination:destination });
    }
	
}
export function updaterides(data){
    return function(dispatch){
     dispatch({ type:'UPDATE_RIDES', data: data});
    }
	
}
export function updateselectedride(ride,data){
    return function(dispatch){
     dispatch({ type:'UPDATE_SELECTED_RIDE', ride: ride,data:data});
    }
	
}

export function setInitialState(){
    return function(dispatch){
     dispatch({ type:'SET_INITIAL_RIDE_STATE'});
    }
	
}

export function updateTab(name){
    return function(dispatch){
     dispatch({ type:'UPDATE_CURRENT_TAB',name:name});
    }
	
}


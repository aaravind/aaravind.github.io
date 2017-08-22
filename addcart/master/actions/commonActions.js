export function fetchData(api,method) {
  return fetch(api,{
  method: method});
}
export function fetchapiandcalldispatch(api,method) {
  return function (dispatch) {
    return fetchData(api,method).then(
    	data =>  {
                return data.json()}
    );
  };
}

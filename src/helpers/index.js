export const debounce = (fn, delay) => {
  var timeoutID = null;
  return function () {
    clearTimeout(timeoutID);
    var args = arguments;
    var that = this;
    timeoutID = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
};

const BASE_URL = "https://restcountries.com/v3.1";

export const getFromApi = (path) => {
  const controller = new AbortController();
  controller.abort();
  const url = `${BASE_URL}${path}`;
  return fetch(url)
};

export const fillObjectValues = (to = {}, from= { }) => {
  if(to){
    Object.keys(from).forEach((val,idx)=>{
      to[val] = from[val];
    })
  }
}

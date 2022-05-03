import axios from "axios";


const fetchPizzas = (sortBy, category) => (dispatch) =>{
  dispatch(setLoaded(false))
  axios.get(`http://localhost:3000/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
  .then(({data}) => {
    dispatch(setPizzas(data))
  });
}


const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items
});

const setLoaded  = (payload) => ({
  type: 'SET_LOADED',
  payload
});


export { setPizzas, setLoaded, fetchPizzas }
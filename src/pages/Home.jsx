import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Categories, SortPopup, PizzaBlock, LoadingBlock} from "../components";
import {setCategory, setSortBy} from '../redux/actions/filters'
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";
// import pizzas from '../redux/reducers/pizzas';

const categoryNames = [
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые'
]
const sortIems = [
  {name: 'популярности', type: 'popular', order: 'desc'},
  {name: 'цене', type: 'price', order: 'desc'},
  {name: 'алфавиту', type: 'alphabet', order: 'asc'},
]

function Home() {
  const dispatch = useDispatch();

  const items  = useSelector(({ pizzas }) => pizzas.items );
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const {category, sortBy} = useSelector(({ filters }) => filters);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [category, sortBy]);

  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj))
    
  };

  
  return (
    <div className="container">
        <div className="content__top">
          <Categories 
            activeCategory={category}
            items={categoryNames} 
            onClickCategory={onSelectCategory }
            />

          <SortPopup
            activeSortType={sortBy.type}
            items={sortIems} 
            onClickSortType={onSelectSortType} 
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">

          {isLoaded ? 
          items.map(pizza=>{
            return <PizzaBlock 
                      onClickAddPizza={handleAddPizzaToCart}
                      key={pizza.id} 
                      isLoaded={true} 
                      addedCount={cartItems[pizza.id] && cartItems[pizza.id].items.length}
                      {...pizza} />
          }) :
          Array(12)
              .fill(0)
              .map((_, index) => <LoadingBlock key={index} />)
          }
        </div>
      </div>
  )
}

export default Home
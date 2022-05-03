import React from 'react'
import PropTypes from 'prop-types';

export const Categories = React.memo(({ activeCategory, items, onClickCategory }) => {
  
  const onSelectItem = (index) =>{
    onClickCategory(index)
  }
  
  return (
    <div className="categories">
      <ul>
        <li 
          onClick={() => onSelectItem(null)} 
          className={activeCategory === null ? 'active' : ''}
        >
          Все
        </li>
        {items &&
        items.map((item, index) => {
          return <li
            className={activeCategory === index ? 'active' : ''} 
            onClick={() => onSelectItem(index)}
            key={`${item}_${index}`}
            >
              {item}
            </li>
        })
        }
        
      </ul>
    </div>
  )
}
)
Categories.propTypes = {
  // activeCategory: PropTypes.oneOf([PropTypes.number, null]),
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

Categories.defaultProps = { activeCategory: null, items: [] };
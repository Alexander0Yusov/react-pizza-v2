import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from 'components/Pagination';
import { SearchContext } from 'components/App';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности(уб.)',
    sortProperty: 'rating',
  });
  const [currentPage, setCurrentPage] = React.useState(1);

  const { searchValue } = React.useContext(SearchContext);

  React.useEffect(() => {
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    setIsLoading(true);
    fetch(
      `https://647bc928c0bae2880ad03fe8.mockapi.io/adverts?product=pizza&sortBy=${sortBy}&order=${order}${search}${category}&page=${currentPage}&limit=4`
    )
      .then(res => res.json())
      .then(array => setItems(array))
      .finally(() => setIsLoading(false));

    // showing top of the page after first render
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.filter(obj => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={setCategoryId} />
        <Sort value={sortType} onChangeSort={setSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {!isLoading &&
          pizzas.map(item => <PizzaBlock key={item.id} {...item} />)}
        {isLoading &&
          [...new Array(10)].map((_, index) => <Skeleton key={index} />)}
      </div>
      <Pagination onChangePage={setCurrentPage} />
    </div>
  );
};

export default Home;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectFilters,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from 'redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from 'components/Pagination';

import qs from 'qs';
import { fetchPizzas, selectPizzaData } from 'redux/slices/pizzaSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilters);
  const { items, status } = useSelector(selectPizzaData);

  const sortType = sort.sortProperty;

  // на первом рендере забираем параметры поиска и сетим в стор
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, [dispatch]);

  // если параметры пришли из строки поиска то запрос будет пропущен
  React.useEffect(() => {
    const getPizzas = async () => {
      const order = sortType.includes('-') ? 'asc' : 'desc';
      const sortBy = sortType.replace('-', '');
      const category = categoryId ? `&category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(fetchPizzas({ order, sortBy, category, search, currentPage }));
    };

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage, dispatch]);

  // показываем параметры поиска на каждом рендере кроме первого
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage, navigate]);

  const pizzas = items?.filter(obj => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  });

  const onCategoryId = id => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  const pizzas_ = pizzas.map(item => <PizzaBlock key={item.id} {...item} />);
  const skeletons_ = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onCategoryId} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === 'error' ? (
        <div className="content__errorInfo">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>Не удалось получить питсы.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons_ : pizzas_}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

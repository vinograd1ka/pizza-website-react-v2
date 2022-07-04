import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setSortType, setFilters } from "../../redux/slices/filterSlice";
import qs from 'qs';
import { useNavigate } from "react-router";

import Categories from "../Categories";
import Sort from "../Sort";
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import PizzaBlockLoader from "../PizzaBlock/PizzaBlockLoader";
import Pagination from "../Pagination/Pagination";
import {fetchPizzas, setItems} from "../../redux/slices/pizzaSlice";
import axios from "axios";

const categoriesList = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed']
const sortList = [
    {name: 'популярности', sortProperty: 'rating', order: 'desc'},
    {name: 'цене' , sortProperty: 'price', order: 'desc'},
    {name: 'алфавиту', sortProperty: 'title', order: 'asc'}
]

const Home = ({ searchValue }) => {
    const navigate = useNavigate();
    const isMounted = useRef(false)

    const dispatch = useDispatch()
    const isSearch = useRef(false)

    const categoryId = useSelector(state => state.filterSlice.categoryId)
    const handleClickCategory = (index) => dispatch(setCategoryId(index))

    const sortType = useSelector(state => state.filterSlice.sortType)
    const handleClickSort = (obj) => dispatch(setSortType(obj))

    const { items, status } = useSelector(state => state.pizzaSlice)

    const [currentPage, setCurrentPage] = useState(1)

    const getPizzas = async () => {
        const res = await axios.get(
            `https://628cfdca3df57e983eda02d0.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=${sortType.order}`
        )
        dispatch(setItems(res.data))
    }

    // если изменили параметры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true;
    }, [categoryId, sortType, currentPage, searchValue])

    // если был первый рендер то проверяем url-параметры и сохраняем в redux'e
    useEffect(() => {
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true;
        }

        getPizzas()
    }, [])


    // если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false;
    }, [categoryId, sortType, currentPage, searchValue])

    const skeletons = Array(12).fill(0).map((_, index) => (<PizzaBlockLoader key={index}/>))

    return (
        <>
            <div className="content__top">
                <Categories
                    activeCategory={categoryId}
                    onChangeActiveCategory={(index) => handleClickCategory(index)}
                    categories={categoriesList}
                />

                <Sort
                    activeSort={sortType}
                    onChangeActiveSort={(obj) => handleClickSort(obj)}
                    sortList={sortList}
                />
            </div>

            <h2 className="content__title">Все пиццы</h2>


                {status === 'error' ? (
                    <div>
                        <h2>Произошла ошибка</h2>
                    </div>
                ) : (
                    <div className="content__items">
                        {status === 'loading'
                            ? items.filter(obj => {
                                if(obj.title.toLowerCase().includes(searchValue.toLowerCase())) return true
                                return false
                            }).map( (obj, index) => (<PizzaBlock key={index} {...obj} />) )

                            : skeletons
                        }
                    </div>
                )}

            <Pagination onChangePage={(num) => setCurrentPage(num)}/>
        </>
    );
};

export default Home;

// const getPizzas = async () => {
//     dispatch(fetchPizzas({
//         currentPage,
//         categoryId,
//         sortType
//     }))
// }


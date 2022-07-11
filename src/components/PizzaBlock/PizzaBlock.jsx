import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

const PizzaBlock = ({ id, title, price, imageUrl, types, sizes }) => {
    const dispatch = useDispatch();

    const availableTypes = ['thin', 'traditional']
    const availableSizes = [26, 30, 40]

    const [activeType, setActiveType] = useState(0)
    const [activeSize, setActiveSize] = useState(0)


    const handleClickAdd = () => {
        const item = {
            id,
            title,
            price,
            imageUrl,
            type: availableTypes[activeType],
            size: availableSizes[activeSize],
        }
        dispatch(addItem(item))
    }

    const cartItem = useSelector(state => state.cartSlice.items.find(obj => obj.title === title))
    const addedCount = cartItem ? cartItem.count : 0;

    const [openSize, setOpenSize] = useState(false)
    const sortRef = useRef()

    const handleClickSelected = (index) => {
        setOpenSize(!openSize)
        setActiveSize(index)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.path.includes(sortRef.current)) {
                setOpenSize(false)
            }
        }

        document.body.addEventListener('click', handleClickOutside)

        // если компонент захочет размонтироваться (умереть при переходе на другую страничку(корзина))
        return () => document.body.removeEventListener('click', handleClickOutside)
    }, [])

    const priceOfSize = [ 0, 50, 100 ][activeSize] ?? null;
    price = price + priceOfSize;

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{ title }</h4>
            <div className="pizza-block__selector">
                <ul>
                    {types.map((type, index) =>
                        <li key={index}
                            className={activeType === index ? 'active' : ''}
                            onClick={() => setActiveType(index)}>{availableTypes[index]}</li> )}
                </ul>

                <ul ref={sortRef}>
                    <li style={{backgroundColor:"white"}} onClick={() => setOpenSize(!openSize)}>{availableSizes[activeSize]} cm.</li>

                    {openSize &&
                        <div className="pizza-block__selector__popup">
                            <ul>
                                {sizes.map((size, index) =>
                                    <li key={index} onClick={() => handleClickSelected(index)}>{sizes[index]} cm.</li>
                                )}
                            </ul>
                        </div>
                    }

                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">from {price} $</div>
                <div className="button button--outline button--add" onClick={handleClickAdd}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>

                    <span>Add</span>
                    {addedCount > 0 && <i>{addedCount}</i>}
                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;

{/*{sizes.map((size, index) => */}
{/*    <li key={index} */}
{/*        className={activeSize === index ? 'active' : ''}*/}
{/*        onClick={() => setActiveSize(index)}>{availableSizes[index]} см.</li>)}*/}
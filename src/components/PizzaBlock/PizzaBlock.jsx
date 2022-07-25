import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {addItem, changeItemSize} from "../../redux/slices/cartSlice";
import {changeSizeItem} from "../../redux/slices/pizzaSlice";

const PizzaBlock = ({ id, title, imageUrl, types, sizes, priceOfSize, cartItems }) => {
    const dispatch = useDispatch()

    const availableTypes = ['thin', 'traditional']
    const availableSizes = [26, 30, 40]

    const [activeType, setActiveType] = useState(0)
    const [selectedSize, setSelectedSize] = useState(0)

    id = id + [0, 1, 2][selectedSize] + [0, 3][activeType] ?? null;

    const handleClickAdd = () => {
        const item = {
            id,
            title,
            price: priceOfSize[selectedSize],
            priceOfSize,
            imageUrl,
            selectedType: activeType,
            selectedSize,
            types,
            sizes
        }
        dispatch(addItem(item))
    }

    const cartItem = cartItems.find(obj => obj.id === id)
    const addedCount = cartItem ? cartItem.count : 0;

    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{ title }</h4>
            <div className="pizza-block__selector">
                <ul style={{marginBottom: 16}}>
                    {types.map((type, index) =>
                        <li key={index}
                            className={activeType === index ? 'active' : ''}
                            onClick={() => setActiveType(index)}>{availableTypes[index]}</li>)
                    }
                </ul>

                <ul style={{marginBottom: 16}}>
                    {sizes.map((size, index) =>
                        <li key={index}
                            className={selectedSize === index ? 'active' : ''}
                            onClick={() => setSelectedSize(index)}>{availableSizes[index]} cm.</li>)
                    }

                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">from {priceOfSize[selectedSize] ?? null} $</div>
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
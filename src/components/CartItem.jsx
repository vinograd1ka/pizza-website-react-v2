import React from 'react';
import {useDispatch} from "react-redux";
import {changeItemSize, changeItemType, minusItem, plusItem, removeItem} from "../redux/slices/cartSlice";
import {useEffect, useRef, useState} from "react";

const CartItem = ({ id, title, selectedType, selectedSize, count, imageUrl, types, sizes, priceOfSize, price }) => {
    const dispatch = useDispatch()

    const handleClickPlus = () => dispatch(plusItem({id, price: priceOfSize[selectedSize]}))
    const handleClickMinus = () => {
        if (count === 1) dispatch(removeItem({id}))
        dispatch(minusItem({id}))
    }
    const handleClickDelete = () => dispatch(removeItem({id}))

    const [openSize, setOpenSize] = useState(false)
    const [openType, setOpenType] = useState(false)

    const sizeRef = useRef()
    const typeRef = useRef()

    const availableSizes = [26, 30, 40]
    const availableTypes = ['thin', 'traditional']

    const handleClickSelectedSize = (index) => {
        setOpenSize(!openSize)

        if (index === selectedSize) return
        dispatch(changeItemSize({id, title, price: priceOfSize[index], imageUrl, selectedSize: index, types, sizes, count}))
    }
    const handleClickSelectedType = (index) => {
        setOpenType(!openType)
        dispatch(changeItemType({id, selectedSize: index}))
    }

    useEffect(() => {
        const handleClickOutsideSize = (event) => { if (!event.path.includes(sizeRef.current)) setOpenSize(false) }
        const handleClickOutsideType = (event) => { if (!event.path.includes(typeRef.current)) setOpenType(false) }


        document.body.addEventListener('click', handleClickOutsideSize)
        document.body.addEventListener('click', handleClickOutsideType)

        // если компонент захочет размонтироваться (умереть при переходе на другую страничку(корзина))
        return () => {
            document.body.removeEventListener('click', handleClickOutsideSize)
            document.body.removeEventListener('click', handleClickOutsideType)
        }
    }, [])

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img
                    className="pizza-block__image"
                    src={imageUrl}
                    alt="Pizza"
                />
            </div>
            <div className="cart__item-info">
                <h3>{ title }</h3>

                <p> {types.length !== 1
                    ? <button className="button button--outline button--add" ref={typeRef} onClick={() => setOpenType(!openType)}> {availableTypes[selectedType]} dough, </button>
                    : <>{availableTypes[selectedType]} dough,</>
                }

                    <button className="button button--outline button--add" style={{marginLeft: 5}} ref={sizeRef} onClick={() => setOpenSize(!openSize)}> {availableSizes[selectedSize]} cm. </button>
                </p>

                {openType &&
                    <div className="pizza-block__selector__popup">
                        <ul>
                            {types.map((size, index) =>
                                <li key={index} onClick={() => handleClickSelectedType(index)}>{availableTypes[index]} cm.</li>
                            )}
                        </ul>
                    </div>
                }

                {openSize &&
                    <div className="cart__item-size__popup pizza-block__selector__popup">
                        <ul>
                            {sizes.map((size, index) =>
                                <li key={index} onClick={() => handleClickSelectedSize(index)}>{availableSizes[index]} cm.</li>
                            )}
                        </ul>
                    </div>
                }
            </div>
            <div className="cart__item-count">

                <div onClick={handleClickMinus} className="button button--outline button--circle cart__item-count-minus">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"/>
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"/>
                    </svg>

                </div>

                <b>{count}</b>
                <div onClick={handleClickPlus} className="button button--outline button--circle cart__item-count-plus">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"/>
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"/>
                    </svg>

                </div>
            </div>
            <div className="cart__item-price">
                <b>{ priceOfSize[selectedSize] * count } $</b>
            </div>
            <div className="cart__item-remove">
                <div onClick={handleClickDelete} className="button button--outline button--circle">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"/>
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
import React from 'react';
import {Link} from "react-router-dom";

const CartEmpty = () => {
    return (
        <div className="content">
            <div className="container container--cart">
                <div className="cart cart--empty">
                    <h2>Cart is empty <icon>😕</icon></h2>
                    <p>
                        You probably haven't ordered pizza yet.<br/>
                        To order pizza, go to the main page.
                    </p>
                    <img alt="Empty cart"/>
                    <Link to='/'>
                        <button className="button--black">
                            <span>Come back</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartEmpty;
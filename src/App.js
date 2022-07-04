import './scss/app.scss';
import Header from "./components/Header";
import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import NotFound from "./components/pages/NotFound";

import {Route, Routes} from "react-router-dom";
import {useState} from "react";

function App() {
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path='/' element={ <Home searchValue={searchValue}/> } />
                        <Route path='/not-found' element={ <NotFound/> } />
                        <Route path='/cart' element={ <Cart/> } />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;

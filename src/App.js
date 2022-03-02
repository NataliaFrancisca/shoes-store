import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom'

import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Home from './pages/Home'
import Produto from './components/Product/Produto';

import ShopCart from './components/UI/ShopCart'

import './App.css';

import { Context } from './Context';
import {dataProducts} from "./data/db";

function App() {
    
  const [visibilityShopCart, setVisibilityShopCart] = useState("hidden");
  const [productsShoppingCart, setProductsShoppingCart] = useState([]);

  const [precoCompra, setPrecoCompra] = useState(0);

  // atualizar o preço total da compra
  useEffect(() => {
    if(productsShoppingCart.length !== 0){
      const reducer = (previousValue, currentValue) => previousValue + currentValue;
      const precoTotal = productsShoppingCart.map(element => element.product.preco * element.quantity).reduce(reducer);
      setPrecoCompra(precoTotal);
    }else{
      setPrecoCompra(0);
    }
  }, [productsShoppingCart, visibilityShopCart]);

  // lidando com o clique fora do carrinho de compras
  const useOutsideClick = (ref) => {
    useEffect(() => {
      const handleClickOutside = event => {
        if(ref.current && !ref.current.contains(event.target) && ref.current.classList.contains("visible")){
            setVisibilityShopCart("hidden")
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return() => {
        document.removeEventListener("mousedown", handleClickOutside)
      };
    }, [ref]);
  } 

  return (
    <div className="App">
      <Context.Provider value={{productsShoppingCart, setProductsShoppingCart, visibilityShopCart, setVisibilityShopCart}}>
          <Router>
            <header>
              <nav className="menu-hamburger">

                <input id="menu-hamburguer-button" type="checkbox" />
                <label for="menu-hamburguer-button" >
                  <div className="menu">
                      <span className="hamburguer"></span>
                  </div>
                </label>
                
                <ul className="menu-items">
                  <li>
                    <NavLink to="/" exact>Store</NavLink>
                  </li>

                  <li>
                    <NavLink to="/collection" exact>Collection</NavLink>
                  </li>

                  <li>
                    <NavLink to="/contact" exact>Contact</NavLink>
                  </li>
                </ul>
                
                <button 
                  onClick={() => setVisibilityShopCart('visible')}
                  className='btn-show-shopping-cart'>
                  <span className="material-icons-outlined"> shopping_cart </span>
                </button>

              </nav>
            </header>


              <div className="container-routes">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* passando pelos dados e pegando a url do dado */}
                      {dataProducts.map((product, index) => (
                        <Route path={`produto/${product.url}`} 
                          element={ 
                            <Produto 
                              key={index}
                              data={product} 
                            />}
                            />
                      ))}
                    
                  </Routes>          
              </div>
            </Router>

            <ShopCart 
              onHandleClickOutside={useOutsideClick}
              onHandleVisibilityComponent={visibilityShopCart} 
              onHideComponent={() => setVisibilityShopCart('hidden')}
              priceData={precoCompra}
            />

        </Context.Provider>
    </div>
  );
}

export default App;

import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom'

import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Home from './pages/Home'
import Produto from './components/Product/Produto';
import MiniCard from './components/UI/MiniCard';

import ShopCart from './components/UI/ShopCart'

import './App.css';

import { Context } from './Context';
import {dataProducts} from "./data/db";

function App() {
    
  const [visibilityShopCart, setVisibilityShopCart] = useState("hidden");
  const [productsShoppingCart, setProductsShoppingCart] = useState([]);

  const [precoCompra, setPrecoCompra] = useState(0);

  // const changeVisibilityCart = (action) => {
  //   setContainerShoppingCart(action);
  // }

  // // DELETAR O PRODUTO DO CARRINHO DE COMPRAS
  // const deleteProduct = (product) => {
  //     let newDataShoppingCart = dataShoppingCart.filter(element => (element.product.marca, element.product.produto) !== (product.marca, product.produto));
  //     setDataShoppingCart(newDataShoppingCart);
  // }

  // // RECEBE OS DADOS DO PRODUTO PARA ADICIONAR NO CARRINHO DE COMPRAS
  // function receiveProductsToShopCart(data){
  //   let checkDuplicate = productsShoppingCart.some(item => (item.product.marca, item.product.produto) === (data.product.marca, data.product.produto));
    
  //   if(checkDuplicate === true){
  //       productsShoppingCart
  //         .filter(item => (item.product.marca, item.product.produto) === (data.product.marca, data.product.produto))
  //         .map(item => item.quantity = data.quantity)
  //   }else{
  //       setProductsShoppingCart(previous => [...previous, data]); 
  //   }
  // }
  
  // // atualizar o preço total da compra
  useEffect(() => {

    if(productsShoppingCart.length !== 0){
      const reducer = (previousValue, currentValue) => previousValue + currentValue;
      const precoTotal = productsShoppingCart.map(element => element.product.preco * element.quantity).reduce(reducer);
      setPrecoCompra(precoTotal);
    }else{
      setPrecoCompra(0);
    }

  }, [productsShoppingCart]);


  console.log('renderizando na pasta app.js')

  return (
    <div className="App">
      <Context.Provider value={{productsShoppingCart, setProductsShoppingCart, visibilityShopCart, setVisibilityShopCart}}>
          <Router>
            <header>
              <nav className="menu-hamburger">

                <input id="menu-hamburguer-button" type="checkbox" />
                <label for="menu-hamburguer-button">
                  <div className="menu">
                      <span className="hamburguer"></span>
                  </div>
                </label>
                
                <ul className="menu-items">
                  <li>
                    <NavLink to="/" exact>Converse</NavLink>
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
                      {dataProducts.map(product => (
                        <Route path={`produto/${product.url}`} 
                          element={ 
                            <Produto 
                              data={product} 
                              // receiveData={receiveProductsToShopCart} 
                              // onShowCartShop={changeVisibilityCart}
                            />}
                            />
                      ))}
                    
                  </Routes>
                
              </div>
            </Router>

            <ShopCart 
              onShowComponent={visibilityShopCart} 
              onHideComponent={() => setVisibilityShopCart('hidden')}
              priceData={precoCompra}
            />

        </Context.Provider>
    </div>
  );
}

export default App;

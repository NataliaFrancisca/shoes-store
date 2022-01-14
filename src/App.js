import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom'

import Collection from "./components/Collection"
import Contact from "./components/Contact"
import Home from './components/Home';
import Produto from './components/UI/Produto';
import MiniCard from './components/UI/MiniCard';

import './App.css';

import {dataProducts} from "./data/db";

function App() {


  const [containerShoppingCart, setContainerShoppingCart] = useState("hidden");
  const [dataShoppingCart, setDataShoppingCart] = useState([]);
  const [precoCompra, setPrecoCompra] = useState(0);

  const changeVisibilityCart = (action) => {
    setContainerShoppingCart(action);
  }

  // DELETAR O PRODUTO NO CARRINHO DE COMPRAS
  const deleteProduct = (product) => {
      let newDataShoppingCart = dataShoppingCart.filter(element => (element.product.marca, element.product.produto) !== (product.marca, product.produto));
      setDataShoppingCart(newDataShoppingCart);
  }

  // RECEBE OS DADOS DO PRODUTO QUE FOI ADICIONADO NO CARRINHO DE COMPRAS NO COMPONENTE PRODUTO
  function receiveProductsToShopCart(data){
    let checkDuplicate = dataShoppingCart.some(item => (item.product.marca, item.product.produto) === (data.product.marca, data.product.produto));
    
    if(checkDuplicate === true){
        dataShoppingCart
          .filter(item => (item.product.marca, item.product.produto) === (data.product.marca, data.product.produto))
          .map(item => item.quantity = data.quantity)
    }else{
        setDataShoppingCart(previous => [...previous, data]); 
    }
  }
  
  // Função de atualizar o preço total da compra
  useEffect(() => {
    
    console.log("omgggggg")
    if(dataShoppingCart.length !== 0){
      const reducer = (previousValue, currentValue) => previousValue + currentValue;
      const t = dataShoppingCart.map(element => element.product.preco * element.quantity).reduce(reducer);
      setPrecoCompra(t);
    }else{
      setPrecoCompra(0);
    }

  }, [dataShoppingCart]);


  console.log('renderizando na pasta app.js')

  return (
    <div className="App">
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
                    <NavLink to="/" exact>Nome Empresa</NavLink>
                  </li>

                  <li>
                    <NavLink to="/collection" exact>Collection</NavLink>
                  </li>

                  <li>
                    <NavLink to="/contact" exact>Contact</NavLink>
                  </li>
                </ul>
                

                <button 
                  onClick={() => changeVisibilityCart('visible')}
                  className='btn-show-shopping-cart'>
                  <span class="material-icons-outlined"> shopping_cart </span>
                </button>

              </nav>
            </header>

            <div className="container-routes">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* passando pelos dados e pegando a url do dado, exibindo ele e mandando os dados */}
                  {dataProducts.map(product => (
                    <Route path={`produto/${product.url}`} element={<Produto state={product} receiveData={receiveProductsToShopCart} onShowCartShop={changeVisibilityCart}/>} />
                  ))}
                
              </Routes>
            </div>
          </Router>

        <div className={`container-shopping-cart ${containerShoppingCart}`}>
          <div className="container-shopping-cart-details">
              <h2 className="title-container-cart">suas compras</h2>

              <button className="btn-close-shopping-cart" onClick={() => changeVisibilityCart("hidden")}>
                <span className="material-icons">close</span>
              </button>
          </div>

          <div className="container-compras">
            {dataShoppingCart.map(item => (
                <MiniCard 
                  data={item}
                  deleteProduct={deleteProduct}/>
            ))}
          </div>

          <label className="subtotal-value">Subtotal: <span>R${precoCompra}</span></label>
          <button className="btn-finish">Finish</button>
        </div>

      
    </div>
  );
}

export default App;

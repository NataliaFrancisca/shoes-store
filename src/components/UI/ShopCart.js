import React, { useContext, useRef} from 'react';

import './ShopCart.css'

import MiniCard from './MiniCard';
import { Context } from '../../Context';

const ShopCart = (props) => {

    const { setProductsShoppingCart, productsShoppingCart} = useContext(Context);
    const shopCartRef = useRef(null);
    const price = props.priceData.toLocaleString('pt-br', {minimumFractionDigits: 2});

    props.onHandleClickOutside(shopCartRef)

    const deleteProduct = (product) => {
        let newDataShoppingCart = productsShoppingCart.filter(element => (element.product.marca, element.product.produto) !== (product.marca, product.produto));
        setProductsShoppingCart(newDataShoppingCart);
    }

    return(
        <main className={`container-shopping-cart ${props.onHandleVisibilityComponent}`} ref={shopCartRef}>
            <section className="container-shopping-cart-details">
              <h2 className="title-container-cart">suas compras</h2>

              <button className="btn-close-shopping-cart" onClick={() => props.onHideComponent()}>
                <span className="material-icons">close</span>
              </button>
            </section>

            <section className="container-compras">
                {productsShoppingCart.map(item => (
                    <MiniCard 
                        data={item}
                        onDeleteProduct={deleteProduct}/>
                ))}
            </section>
            

            <label className="subtotal-value">Subtotal: <span>R$ {price}</span></label>
            <button className="btn-finish">Finish</button>
        </main>
    )
}

export default ShopCart;
import React, { useContext, useEffect, useRef} from 'react';

import './ShopCart.css'

import MiniCard from './MiniCard';
import { Context } from '../../Context';

const ShopCart = (props) => {

    const dataProductsShopCart = props.onAddProductsShopCart;
    const shopCartRef = useRef(null);

    props.onHandleClickOutside(shopCartRef)

    console.log(dataProductsShopCart);

    const { setProductsShoppingCart } = useContext(Context);

    const deleteProduct = (product) => {
        let newDataShoppingCart = dataProductsShopCart.filter(element => (element.product.marca, element.product.produto) !== (product.marca, product.produto));
        setProductsShoppingCart(newDataShoppingCart);
    }

    useEffect(() => {
        console.log("estou mudando no shopping cart")
        console.log(dataProductsShopCart)
    }, [props.onAddProductsShopCart])


    return(
        <main className={`container-shopping-cart ${props.onShowComponent}`} ref={shopCartRef}>
            <section className="container-shopping-cart-details">
              <h2 className="title-container-cart">suas compras</h2>

              <button className="btn-close-shopping-cart" onClick={() => props.onHideComponent()}>
                <span className="material-icons">close</span>
              </button>
            </section>

            <section className="container-compras">
                {dataProductsShopCart.map(item => (
                    <MiniCard 
                        data={item}
                        onDeleteProduct={deleteProduct}/>
                ))}
            </section>

            <label className="subtotal-value">Subtotal: <span>R$ {props.priceData}</span></label>
            <button className="btn-finish">Finish</button>
        </main>
    )
}

export default ShopCart;
import React from 'react';

import './ShopCart.css'

const ShopCart = (props) => {

    return(
        <main className={`container-shopping-cart ${props.onShowComponent}`}>
            <section className="container-shopping-cart-details">
              <h2 className="title-container-cart">suas compras</h2>

              <button className="btn-close-shopping-cart" onClick={() => props.onHideComponent()}>
                <span className="material-icons">close</span>
              </button>
            </section>

            <section className="container-compras">
                {/* {dataShoppingCart.map(item => (
                    <MiniCard 
                    data={item}
                    deleteProduct={deleteProduct}/>
                ))} */}
            </section>

            <label className="subtotal-value">Subtotal: <span>R$677</span></label>
            <button className="btn-finish">Finish</button>
        </main>
    )
}

export default ShopCart;
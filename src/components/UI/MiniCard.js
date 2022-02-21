import React from 'react';
import "./MiniCard.css"

const MiniCard = (props) => {

    const {produto, images, preco} = props.data.product;

    return(
        <div className="container-compra">
            <div className="container-compra-image-product">
                <img src={`../${images[2].url}`} alt={images[2]} />
            </div>
                
            <div className="container-compra-details">
                <h3 className="name-product">{produto}</h3>

                <label className="value-product"><span>R${preco}</span></label>
                <label>Quantidade: <span>{props.data.quantity}</span> </label>
            </div>

            <button className="btn-remove-shop" onClick={() => props.onDeleteProduct(props.data.product)}>
                <span className="material-icons">delete</span>
            </button>
        </div>
    )
}

export default MiniCard;
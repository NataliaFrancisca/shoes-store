import React from "react";
import "./Card.css"

const Card = (props) => {

    const {produto, preco, images} = props.data;

    console.log('renderizando no card')

    return(
        <div className="container-card">
            <div className="image-product">
                <img src={images[3].url} alt="card product"/>
            </div>

            <div className="card-product-details" onClick={props.onShow}>
                <h1>{produto}</h1>
                <span>R${preco}</span>
            </div>
        </div>
    )
}

export default Card;
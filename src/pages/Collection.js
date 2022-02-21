import React from "react";
import { useNavigate} from 'react-router-dom';

import "./styles/Collection.css"
import Card from "../components/Card/Card";

import {dataProducts} from "../data/db"

const Collection = () => {

    const navigate = useNavigate();

    const mostraProduto = (data) => {
        navigate(`../produto/${data.url}`)
    }

    return(
        <main className="container-collection">
            <h1 className="title-component">Collection</h1>
            
            <div className="container-collection-products">

                {dataProducts.map((product, index) => (
                    <Card 
                        key={index}
                        data={product}
                        onShow={() => mostraProduto(product)}
                    />
                ))}
          
            </div>
        </main>
    )
}

export default Collection;
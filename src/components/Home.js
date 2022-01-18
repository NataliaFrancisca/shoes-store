import React from "react";
import { useNavigate} from 'react-router-dom';

import "./Home.css"
import {dataProducts} from "../data/db"

const Home = () => {

    const navigate = useNavigate();

    let firstImage = dataProducts.filter(element => element.produto === "Día de Muertos Chuck 70");
    let secondImage = dataProducts.filter(element => element.produto === "Converse Color Vintage Canvas Chuck 70");
    
    const mostraProduto = (data) => {
        navigate(`../produto/${data.url}`)
    }

    return(
        <div classNameName="component-home">

            {/* PRIMEIRA TELA */}
            <main>
                <section className="first-column">
                    <h1>Any variation that fits your imagination</h1>
                </section>

                <section className="second-column">
                    {firstImage.map(element => (
                        <div className="second-column-first-element" onClick={() => mostraProduto(element)}>
                         <img src={`../${element.imageExtra.url}`} alt={element.produto}/>
                        </div>
                    ))}

                    <div className="second-column-second-element">
                        {secondImage.map(element => (
                            <div className="second-column-second-element" onClick={() => mostraProduto(element)}>
                            <img src={`../${element.imageExtra.url}`} alt={element.produto} />
                            </div>
                        ))}
                    </div>
                </section>   
            </main>

            {/* SEGUNDA TELA */}

            <main className="component-news-products">
                <h1> Trending Now </h1>
                <section className="component-cards">

                    <div className="trend-card-product">
                        <div className="trend-card-product-details">
                            <h2>Chuck 70</h2>
                            <button>BUY NOW</button>
                        </div>
                    </div>

                    <div className="trend-card-product">
                        <div className="trend-card-product-details">
                            <h2>Authentic Glam Chuck 70</h2>
                            <button>BUY NOW</button>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    )
}

export default Home;
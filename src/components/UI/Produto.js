import React, {useState, useRef} from "react";

import "./Produto.css"

const Produto = (props) => {

    const {marca, produto, preco, textDetails, images} = props.state;
    
    const [elementBigImage, setElementBigImage] = useState(images[0].url)    
    const [quantity, setQuantity] = useState(0);

    const listMiniCardRef = useRef();
    const buttonLessRef = useRef();

    // FUNÇÕES
    const handlePlus = () => {
        buttonLessRef.current.disabled = false;
        setQuantity((prevState) => prevState + 1);
    }

    const handleLess = () => {
        return quantity === 0 ? buttonLessRef.current.disabled = true : setQuantity((prevState) => prevState - 1);
    }

    const handleClick = (index, image) => {
        let list_miniCards = [...listMiniCardRef.current.children];
        setElementBigImage(image.url)

        // removendo a classe de todos os elementos primeiro
        list_miniCards.map(element => element.classList.remove("selected"));
        // adicionando a classe somente ao elemento que foi clicado
        list_miniCards.find(element => element.className === `card-image ${index}`).classList.add("selected")
    }

    const addProductShopCart = () => {

        // caso o usuário clique no botão de adicionar, vai adicionar 1 produto
        // mesmo sem ele definir a quantidade
        let newQuantity = 0;
        quantity === 0 ? newQuantity = 1 : newQuantity = quantity;

        let detailsShopping = {
            product: props.state,
            quantity: newQuantity
        }

        props.receiveData(detailsShopping);
        props.onShowCartShop("visible")
    }


    return(
        <main className="container-product">
            <section className="container-carrousel">
                
                <div className="container-image-principal">
                    <img src={`../${elementBigImage}`} alt="product"/>
                </div>
        
                <div className="container-mini-images" ref={listMiniCardRef}>
                    {images.map((image, index) => (
                        <div 
                            className={`card-image ${index}`}
                            onClick={() => handleClick(index, image)}>
                                <img src={`../${image.url}`} alt="product"/>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container-details">
                <span className="company-name">{marca}</span>
                <h1 className="product-name">{produto}</h1>
                <p className="product-details">{textDetails}</p>
                <span className="product-price">R${preco}</span>

                <div className="buttons-details">
                    <div className="container-btn-quantity">
                        <button id="btn-less" onClick={handleLess} ref={buttonLessRef}>-</button>
                        <span id="span-quantity">{quantity}</span>
                        <button id="btn-plus" onClick={handlePlus}>+</button>
                    </div>
            
                    <button 
                        className="container-btn-add"
                        onClick={addProductShopCart}
                    > Adicionar ao Card</button>
                </div>
            </section>
        </main>
    )
}


export default Produto;
import React, {useState, useRef, useContext} from "react";

import { Context } from '../../Context';

import "./Produto.css"

const Produto = (props) => {

    const { productsShoppingCart, setProductsShoppingCart, setVisibilityShopCart } = useContext(Context);

    const {marca, produto, preco, textDetails, images} = props.data;
    const [elementBigImage, setElementBigImage] = useState(images[0].url)    

    const listMiniCardRef = useRef();

    const handleClick = (index, image) => {
        let list_miniCards = [...listMiniCardRef.current.children];
        setElementBigImage(image.url)

        // removendo a classe de todos os elementos primeiro
        list_miniCards.map(element => element.classList.remove("selected"));
        // adicionando a classe somente ao elemento que foi clicado
        list_miniCards.find(element => element.className === `card-image ${index}`).classList.add("selected")
    }

    const addProductShopCart = () => {

        let detailsShopping = { product: props.data, quantity: 1}

        addProductToDataList(detailsShopping)
        setVisibilityShopCart('visible')
    }

    // FAZENDO VERIFICAÇÃO PARA SABER SE O PRODUTO JÁ EXISTE NO CARRINHO DE COMPRAS
    const addProductToDataList = data => {
        let checkDuplicate = productsShoppingCart.some(item => (item.product.marca, item.product.produto) === (data.product.marca, data.product.produto));
        
        if(checkDuplicate){
            productsShoppingCart
            .filter(item => (item.product.marca, item.product.produto) === (data.product.marca, data.product.produto))
            .map(item => item.quantity++)
        }else{
            setProductsShoppingCart(previous => [...previous, data]); 
        }
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
                            key={index}
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

                <button className="container-btn-add"
                    onClick={addProductShopCart}>
                    Adicionar ao Carrinho
                </button>
            </section>
        </main>
    )
}


export default Produto;
import react, { useEffect } from "react";
import Loader from './Loader';
import { listTopProducts } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { Link } from "react-router-dom";
import Product from "./Product";
const ProductCarousel = () => {
    const dispatch = useDispatch();
    const productTopRate = useSelector(state => state.productTopRate);
    const { loading, error, products } = productTopRate

    useEffect(() => {
        dispatch(listTopProducts());
        console.log(products)
    }, [dispatch])

    return (
        loading ? <Loader /> : error ? <Message variant={"danger"}>{error}</Message> : (
            <div id="carouselExampleCaptions" class="carousel slide">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    {products.map((product, key) => {
                        return (
                        <div class={key == 0 ? "active carousel-item" : "carousel-item"}>
                            <img src={product.image} class="d-block" alt="..." />
                            <div class="carousel-caption d-none d-md-block">
                                <h2>{product.name}
                                </h2>
                            </div>
     
                        </div>
                        )
                    })}


                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        )
    )
}

export default ProductCarousel
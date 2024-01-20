import "./SingleProduct.scss";



import { FaCartPlus, FaFacebook, FaInstagram, FaLinkedinIn, FaPinterest, FaTwitter } from 'react-icons/fa'
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { context } from "../../utils/context";



const SingleProduct = () => {


    const { id } = useParams();
    const [data, setData] = useState();
    const bearerToken = process.env.REACT_APP_STRAPI_APP_KEY;
    const [quantity, setQuantity] = useState(1);

    const { handleAddToCart } = useContext(context)

    useEffect(() => {

        fetch(`http://localhost:1337/api/products?populate=*&[filters][id]=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json', // Adjust the content type if necessary
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // console.log('Data:', ); 
                setData(data)
                // Process the data as needed
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // Handle errors as needed
            });
    }, [bearerToken, id])



    const decrement = () => {
        setQuantity((prevstate) => {
            if (prevstate === 1) {
                return 1
            } return prevstate - 1


        })


    }

    const increment = () => {

        setQuantity((prevstate) => prevstate + 1)
    }


    return <div className="single-product-main-content">
        <div className="layout">
            <div className="single-product-page">
                <div className="left">
                    {/* {console.log(data.data[0].attributes.title)} */}
                    <img src={process.env.REACT_APP_DEV_URL + data?.data?.[0].attributes?.img?.data?.[0].attributes?.url} alt="..pro-img" />
                </div>
                <div className="right">
                    <span className="name">{data?.data?.[0].attributes?.title}</span>
                    <span className="price">{data?.data?.[0].attributes?.price}</span>
                    <span className="desc">{data?.data?.[0].attributes?.desc}</span>

                    <div className="cart-buttons">
                        <div className="quantity-buttons">
                            <span onClick={() => { decrement() }}>-</span>
                            <span>{quantity}</span>
                            <span onClick={() => { increment() }}>+</span>
                        </div>
                        <button className="add-to-cart-button" onClick={()=>{
                            handleAddToCart(data.data[0],quantity  )
                            console.log(data.data[0],quantity  )
                        }}>
                            <FaCartPlus size={20} />
                            ADD TO CART
                        </button>
                    </div>

                    <span className="divider" />
                    <div className="info-item">
                        <span className="text-bold">Category:
                            <span >

                                {data?.data?.[0].attributes?.categories?.data?.[0].attributes?.title}

                            </span>
                        </span>
                        <span className="text-bold">Share:
                            <FaFacebook size={16} />
                            <FaTwitter size={16} />
                            <FaInstagram size={16} />
                            <FaLinkedinIn size={16} />
                            <FaPinterest size={16} />
                        </span>
                    </div>
                </div>
            </div>

            <RelatedProducts
                productId={id}
                categoryId={data?.data?.[0].attributes?.categories?.data?.[0].id}
            />
        </div>
    </div>;
};

export default SingleProduct;

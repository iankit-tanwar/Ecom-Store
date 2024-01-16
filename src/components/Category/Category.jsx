import { useParams } from "react-router-dom";
import Products from "../Products/Products";
import "./Category.scss";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";



const Category = () => {

    const id = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        fetchcat()
    }, [])

    const fetchcat = () => {
        fetchDataFromApi(`/api/products?populate=*&[filters][categories][id]=${id.id}`).then((res) => {

            setData(res)


        })
    }
    return <div className="category-main-content">

        <div className="layout">

            <div className="category-title">
                {data?.data?.[0].attributes?.categories?.data?.[0].attributes?.title}
            </div>
            <Products innerPage={true} products={data} />
        </div>
    </div>;
};

export default Category;

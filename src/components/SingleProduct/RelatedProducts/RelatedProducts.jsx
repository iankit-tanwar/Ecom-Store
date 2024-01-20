import { useEffect, useState } from "react";
import Products from "../../Products/Products";
import { fetchDataFromApi } from "../../../utils/api";

const RelatedProducts = ({ productId, categoryId }) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchDataFromApi(`/api/products?populate=*&[filters][id][$ne]=${productId}&filters[categories][id]=${categoryId}&pagination[start]=0&pagination[limit]=4`)
      .then((response) => {
        
        setData(response);
      });
  }, [productId, categoryId]);

  return (
    <div className='related-products'>
      <Products headingText='Related Products' products={data}  />
    </div>
  );
};

export default RelatedProducts;

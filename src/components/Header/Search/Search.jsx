import "./Search.scss";



import { MdClose } from 'react-icons/md'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../../utils/api";
const Search = ({ setShowSearch }) => {

    const [query, setQuery] = useState("")
    const [data, setData] = useState()
    const navigate = useNavigate()

    const onChange = (e) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        fetchDataFromApi(`/api/products?populate=*&filters[title][$contains]=${query}`)
            .then((data) => {
                if (query.length === 0) {
                    setData(null);
                } else {
                    setData(data);
                }
              /*   console.log(data); */
            });
    }, [query]);
    
    return <div className="search-model">
        <div className="form-field">
            <input
                type="text"
                autoFocus
                placeholder="Search for Products"
                value={query}
                onChange={onChange}

            />

            <MdClose onClick={() => { setShowSearch(false) }} />
        </div>

        <div className="search-result-content">
            <div className="search-results">

                {
                    data?.data?.map((item) => (
                        <div key={item.id} className="search-result-item" onClick={()=>{
                            navigate("/products/" + item.id);
                            setShowSearch(false) 

                        }}>
                            <div className="img-container">
                                <img src={process.env.REACT_APP_DEV_URL + item?.attributes?.img?.data?.[0].attributes?.url} alt="..cart-img" />
                            </div>
                            <div className="prod-details">
                                <span className="name">{item.attributes.title}</span>
                                <span className="desc">{item.attributes.desc}</span>


                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    </div>;
};

export default Search;

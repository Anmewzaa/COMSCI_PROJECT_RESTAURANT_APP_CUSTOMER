// ------ React ------
import { useState, useEffect } from "react";
// ------ Axios ------
import axios from "axios";
// ------ CSS ------
import "../css/CategoryPage.css";
// ------ React Router Dom ------
import { useSearchParams, useNavigate } from "react-router-dom";
// ------ Components ------
import HeaderComponent from "../Components/HeaderComponent";
import CartComponent from "../Components/CartComponent";
// Functions
import { setDefaultLanguage } from "../functions/language";

const CategoryPage = () => {
  const [selectLanguage, setSelectLanguage] = useState("th");
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const language = searchParam.get("language");
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  const fetchAPI = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories/get`)
      .then((result) => {
        setCategory(result.data.response);
      });
  };
  useEffect(() => {
    fetchAPI();
    setSelectLanguage(setDefaultLanguage(language));
  }, []);

  return (
    <div className="app-container">
      <HeaderComponent />
      <div className="category-grid-box">
        {category.length > 0 &&
          category.map((item, index) => {
            return (
              <div
                className="category-box"
                key={index}
                onClick={() => {
                  navigate(
                    `categories?id=${id}&categories=${item._id}&language=${language}`
                  );
                }}
              >
                <div className="category-image-box">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/images/${
                      item.category_image
                    }`}
                    alt="Food Image"
                  />
                </div>
                <h4 className="category-food-text">
                  {selectLanguage === "th" ? (
                    <>{item.category_name.thai}</>
                  ) : (
                    <>{item.category_name.english}</>
                  )}
                </h4>
              </div>
            );
          })}
      </div>
      <CartComponent data={selectLanguage} />
    </div>
  );
};

export default CategoryPage;

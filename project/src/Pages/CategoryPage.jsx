// ------ React ------
import { useState, useEffect } from "react";
// ------ Axios ------
import axios from "axios";
// ------ React Router Dom ------
import { useSearchParams, useNavigate } from "react-router-dom";
// ------ Components ------
import HeaderComponent from "../Components/HeaderComponent";
import CartComponent from "../Components/CartComponent";
// Functions
import { setDefaultLanguage } from "../functions/language";
// ------ CSS ------
import "../CSS/CategoryPage.css";
// AntD
import { Spin } from "antd";

const CategoryPage = () => {
  const [selectLanguage, setSelectLanguage] = useState("th");
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const language = searchParam.get("language");
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAPI = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories/get`)
      .then((result) => {
        setCategory(result.data.response);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchAPI();
    setSelectLanguage(setDefaultLanguage(language));
  }, []);

  return (
    <div className="app-container">
      <HeaderComponent />
      {loading ? (
        <div>
          <Spin fullscreen />
        </div>
      ) : (
        <>
          <div className="category-grid-box">
            {category &&
              category.length > 0 &&
              category.map((item, index) => {
                return (
                  <div
                    className="category-box"
                    key={index}
                    onClick={() => {
                      navigate(
                        `categories?id=${id}&categories=${item._id}&language=${
                          language === null ? "th" : language
                        }`
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
                      {selectLanguage === "th"
                        ? `${item.category_name.thai.substring(0, 18)}${
                            item.category_name.thai.length > 18 ? "..." : ""
                          }`
                        : `${item.category_name.english.substring(0, 18)}${
                            item.category_name.english.length > 18 ? "..." : ""
                          }`}
                    </h4>
                  </div>
                );
              })}
          </div>
        </>
      )}
      {loading ? (
        <></>
      ) : (
        <>
          <CartComponent data={selectLanguage} />
        </>
      )}
    </div>
  );
};

export default CategoryPage;

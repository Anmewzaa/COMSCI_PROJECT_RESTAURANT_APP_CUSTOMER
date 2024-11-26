// Ant Design
import { Spin } from "antd";
// Axios
import axios from "axios";
// CSS
import "../CSS/HomePage.css";
// Components
import AnchorComponent from "../Components/AnchorComponent";
import HeaderComponent from "../Components/HeaderComponent";
import MenuComponent from "../Components/MenuComponent";
import CartComponent from "../Components/CartComponent";
// React
import { useState, useEffect } from "react";
// React Router Dom
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  // REACT ROUTER DOM
  const [searchParam] = useSearchParams();
  // VARIABLE
  const id = searchParam.get("id");
  const language = searchParam.get("language");
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH API
  const fetchCategories = () => {
    try {
      axios
        .get(`${import.meta.env.VITE_API_URL}/categories/get`)
        .then((data) => {
          if (data?.data?.response) {
            setCategories(data.data.response);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchMenus = () => {
    try {
      axios.get(`${import.meta.env.VITE_API_URL}/menu/get`).then((data) => {
        if (data?.data?.response) {
          setMenus(data.data.response);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTable = () => {
    try {
      axios
        .get(`${import.meta.env.VITE_API_URL}/table/get/${id}`)
        .then((data) => {
          if (data?.data?.response) {
            setTable(data.data.response);
          }
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };
  // USE EFFECT
  useEffect(() => {
    fetchCategories();
    fetchMenus();
    fetchTable();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Spin fullscreen />
        </>
      ) : (
        <>
          <div className="app-container">
            <HeaderComponent table={table} language={language} />
            <AnchorComponent item={categories} language={language} />
            <div className="menu-container">
              {categories.map((data, index) => {
                const filteredMenus = menus.filter((menu) =>
                  menu.menu_category_id.some(
                    (cat) => cat.category_id === data.category_id
                  )
                );
                return (
                  <MenuComponent
                    key={index}
                    category={data}
                    menus={filteredMenus}
                    language={language}
                  />
                );
              })}
            </div>
            <CartComponent id={id} language={language} />
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;

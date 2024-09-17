import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../css/box.css";
// ------ React Router Dom ------
import { useSearchParams, Link } from "react-router-dom";

const CategoryPage = () => {
  const [table, setTable] = useState([]);
  // const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/table/get/${id}`)
      .then((result) => {
        setTable(result.data.response);
      });
    axios.get(`${import.meta.env.VITE_API_URL}/category/get`).then((result) => {
      setCategory(result.data.response);
    });
    // axios.get(`${import.meta.env.VITE_API_URL}/menu/get`).then((result) => {
    //   setMenu(result.data.response);
    // });
  }, []);
  return (
    <div>
      <div>โต๊ะที่ {table.table_number}</div>
      {/* <div>
        {menu &&
          menu.map((item) => {
            return (
              <>
                <img
                  src={`${import.meta.env.VITE_API_URL}/images/${
                    item.menu_image
                  }`}
                  alt=""
                />
              </>
            );
          })}
      </div> */}
      <div>
        {category &&
          category.map((item) => {
            return (
              <>
                <div className="MenuBox">
                  <Link
                    to={`categories?id=${id}&categories=${item.category_name.english}`}
                  >
                    {item.category_name.thai}
                  </Link>
                </div>
              </>
            );
          })}
      </div>
      {/* <div>{category && category.map(item)}</div> */}
      {/* Hello{JSON.stringify(category)} */}
      {/* <div>{category.category_name}</div> */}
      {/* <div>{category && category.map(item)}</div> */}
    </div>
  );
};

export default CategoryPage;

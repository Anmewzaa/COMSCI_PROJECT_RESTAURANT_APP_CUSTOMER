import axios from "axios";
import { FloatButton } from "antd";
import { useState, useEffect } from "react";
import "../css/CategoryPage.css";
// ------ React Router Dom ------
import { useSearchParams, Link, useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const [table, setTable] = useState([]);
  // const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/table/get/${id}`)
      .then((result) => {
        setTable(result.data.response);
      });
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories/get`)
      .then((result) => {
        setCategory(result.data.response);
      });
    // axios.get(`${import.meta.env.VITE_API_URL}/menu/get`).then((result) => {
    //   setMenu(result.data.response);
    // });
  }, []);
  return (
    <div className="app-container">
      <FloatButton onClick={() => console.log("onClick")} />
      <div className="grid-box">
        {category.map((item, index) => {
          return (
            <div
              className="menu-box"
              key={index}
              onClick={() => {
                navigate(`categories?id=${id}&categories=${item._id}`);
              }}
            >
              <div className="image-box">
                <img
                  src={`${import.meta.env.VITE_API_URL}/images/${
                    item.category_image
                  }`}
                  alt=""
                />
              </div>
              <h3>{item.category_name.thai}</h3>
            </div>
          );
        })}
      </div>
      {/* <div>โต๊ะที่ {table.table_number}</div> */}

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

      {/* <div>
        {category &&
          category.map((item) => {
            return (
              <>
                <div className="MenuBox">
                  <Link to={`categories?id=${id}&categories=${item._id}`}>
                    หมวดหมู่ {item.category_name.thai}
                  </Link>
                </div>
              </>
            );
          })}
      </div> */}

      {/* <div>{category && category.map(item)}</div> */}
      {/* Hello{JSON.stringify(category)} */}
      {/* <div>{category.category_name}</div> */}
      {/* <div>{category && category.map(item)}</div> */}
    </div>
  );
};

export default CategoryPage;

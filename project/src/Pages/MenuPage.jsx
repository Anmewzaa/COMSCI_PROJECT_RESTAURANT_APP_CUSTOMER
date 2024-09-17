import React from "react";

import { useSearchParams } from "react-router-dom";

const MenuPage = () => {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const categories = searchParam.get("categories");
  return (
    <div>
      ID : {id}
      <br />
      CATE : {categories}
    </div>
  );
};

export default MenuPage;

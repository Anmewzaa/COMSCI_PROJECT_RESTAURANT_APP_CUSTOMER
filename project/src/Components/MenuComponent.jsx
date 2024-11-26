/* eslint-disable react/prop-types */
// CSS
import "../CSS/MenuComponent.css";
// Components
import CardComponent from "./CardComponent";

const MenuComponent = ({ category, menus, language }) => {
  return (
    <>
      <div
        key={category.category_id}
        id={category.category_id}
        className="menu-container"
      >
        <div className="menu-box">
          <h2 className="menu-text">
            {language === "th" ? (
              <div className="prompt-semibold">
                {category.category_name.thai}
              </div>
            ) : (
              <div className="inter-semibold ">
                {category.category_name.english}
              </div>
            )}
          </h2>
          {menus && menus.length > 0 ? (
            <div className="card-container">
              {menus &&
                menus.map((item, index) => {
                  return (
                    <CardComponent
                      key={index}
                      menu={item}
                      language={language}
                    />
                  );
                })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuComponent;

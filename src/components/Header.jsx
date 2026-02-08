import { useContext } from "react";
import moon from "../../Public/html_template/dist/assets/icons/moon.svg";
import sun from "../../Public/html_template/dist/assets/icons/sun.svg";
import logo from "../../Public/html_template/dist/assets/logo.svg";
import ring from "../../Public/html_template/dist/assets/ring.svg";
import shoppingCart from "../../Public/html_template/dist/assets/shopping-cart.svg";
import { CartContext, ThemeContext } from "../Context/Context";

const Header = ({ onShowCart }) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { cartData } = useContext(CartContext);

  return (
    <header>
      <nav className="container flex items-center justify-between space-x-10 py-6">
        <a href="index-light.html">
          <img src={logo} width="139" height="26" alt="" />
        </a>
        <ul className="flex items-center space-x-5">
          <li>
            <a
              className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
              href="#"
            >
              <img src={ring} width="24" height="24" alt="" />
            </a>
          </li>
          <li>
            <a
              onClick={() => setDarkMode((darkMode) => !darkMode)}
              className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
              href="#"
            >
              <img src={darkMode ? sun : moon} width="24" height="24" alt="" />

              {/* {darkMode ? (
              <img src={moon} width="24" height="24" alt="" />
              ) : (
                <img src={moon} width="24" height="24" alt="" />
              )} */}
            </a>
          </li>
          <li>
            <a
              onClick={onShowCart}
              className=" bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
              href="#"
            >
              <img src={shoppingCart} width="24" height="24" alt="" />
              {cartData.length > 0 && (
                <span className="rounded-full absolute left-[28px] top-[-12px] bg-[#12CF6F] text-white text-xs text-center p-[2px] w-[25px] h-[25px]">
                  {cartData.length}
                </span>
              )}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

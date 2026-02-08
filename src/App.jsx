import { useReducer, useState } from "react";
import Page from "./components/Page";
import { CartContext, ThemeContext } from "./Context/Context";
import { cartReducer } from "./Data/cartReducer";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [cartData, dispatch] = useReducer(cartReducer, []);

  return (
    <>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <CartContext.Provider value={{ cartData, dispatch }}>
          <Page />
        </CartContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;

import { useContext, useState } from "react";
import { ThemeContext } from "../Context/Context";

import Cart from "./Cart";
import Footer from "./Footer";
import Header from "./Header";
import MovieList from "./MovieList";
import Sidebar from "./Sidebar";

export default function Page() {
  const { darkMode } = useContext(ThemeContext);

  const [showCart, setShowCart] = useState(false);

  return (
    <div className={`h-full w-full ${darkMode ? "dark" : " "} font-[Sora]`}>
      {showCart && <Cart setShowCart={setShowCart} />}
      <Header onShowCart={() => setShowCart(true)} />
      <main>
        <div className="container grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
          <Sidebar />
          <MovieList />
        </div>
      </main>
      <Footer />
    </div>
  );
}

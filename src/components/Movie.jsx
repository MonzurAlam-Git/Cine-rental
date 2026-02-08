import { useContext, useState } from "react";
import star from "../../Public/html_template/dist/assets/star.svg";
import tag from "../../Public/html_template/dist/assets/tag.svg";
import { CartContext } from "../Context/Context";
import MovieDetails from "./MovieDetails";

const Movie = ({ movie }) => {
  const { title, genre, rating, price, image } = movie;

  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const { cartData, dispatch } = useContext(CartContext);

  const handleAddToCart = (e, newMovie) => {
    e.stopPropagation();
    dispatch({ type: "add_cart", newMovie: newMovie });
  };

  // const handleAddCart = (event, movie) => {
  //   event.stopPropagation();
  //   const found = state.cartData.find((item) => item.id === movie.id);
  //   if (!found) {
  //     dispatch({
  //       type: "ADD_TO_CART",
  //       payload: { ...movie },
  //     });
  //     setShowModal(false);
  //   } else {
  //     alert("Movie already in the cart");
  //   }
  // };

  return (
    <>
      {showMovieDetails && (
        <MovieDetails movie={movie} setShowMovieDetails={setShowMovieDetails} />
      )}
      <figure
        onClick={() => setShowMovieDetails(true)}
        className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl"
      >
        <img className="w-full object-cover" src={image} alt="" />
        <figcaption className="pt-4">
          <h3 className="text-xl mb-1">{title}</h3>
          <p className="text-[#575A6E] text-sm mb-2">{genre}</p>
          {/* rating  */}
          <div className="flex items-center space-x-1 mb-5">
            {[...Array(rating)].map((s, i) => (
              <img key={i} src={star} width="14" height="14" alt="" />
            ))}
          </div>

          <a
            onClick={(e) => handleAddToCart(e, movie)}
            className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm dark:text-white"
            href="#"
          >
            <img src={tag} alt="" />
            <span>${price} | Add to Cart</span>
          </a>
        </figcaption>
      </figure>
    </>
  );
};

export default Movie;

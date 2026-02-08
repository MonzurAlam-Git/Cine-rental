export const cartReducer = (state, action) => {
  // const { cartData } = useContext(CartContext);

  switch (action.type) {
    case "add_cart": {
      const duplicateMovie = state.find(
        (movie) => movie.id === action.newMovie.id,
      );
      if (duplicateMovie) {
        alert(
          "The Movie you selected already exists on your cart, Please experience a different one ",
        );
      } else {
        return [...state, action.newMovie];
      }
    }
    case "remove_cart": {
      return state.filter((movie) => movie.id !== action.removeID);
    }
  }
};

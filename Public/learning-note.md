# Learning Notes

## Component Responsibility & Placement
File reference: `src/components/Page.jsx`, `src/components/Header.jsx`
- Modals should live near the component that owns the interaction that opens/closes them.
- Rendering the Cart modal inside `Header.jsx` clarifies ownership and keeps `Page.jsx` focused on layout.
- This matches the React mental model: components own what they control.
- Result: cleaner top-level components and clearer ownership boundaries.

Wrong approach (modal placed at page level): `src/components/Page.jsx`
```jsx
{showCart && <Cart setShowCart={setShowCart} />}
<Header onShowCart={() => setShowCart(true)} />
```

Right approach (modal colocated with controlling component): `src/components/Header.jsx`
```jsx
<Header onShowCart={() => setShowCart(true)}>
  {showCart && <Cart onClose={() => setShowCart(false)} />}
</Header>
```

## Writing Concise JSX
File reference: `src/components/Header.jsx`
- Prefer concise JSX expressions over duplicated or commented blocks.
- JSX is just expressions, not templates. Keep expressions small and readable.

Wrong approach (duplicated or commented JSX): `src/components/Header.jsx`
```jsx
{/* {darkMode ? (
  <img src={moon} width="24" height="24" alt="" />
) : (
  <img src={moon} width="24" height="24" alt="" />
)} */}
```

Right approach (single expression): `src/components/Header.jsx`
```jsx
<img src={darkMode ? sun : moon} width="24" height="24" alt="" />
```

## Reducer Design Principles
File reference: `src/Data/cartReducer.jsx`, `src/components/Movie.jsx`
- Reducers must be pure and predictable.
- No side effects: no alerts, no console logs, no DOM logic.
- Reducers should not know about UI decisions.
- Reducers should be easy to test in isolation.
- Duplication/search logic belongs in components, not reducers.

Wrong approach (side effects inside reducer): `src/Data/cartReducer.jsx`
```jsx
const duplicateMovie = state.find((movie) => movie.id === action.newMovie.id);
if (duplicateMovie) {
  alert("The Movie you selected already exists on your cart, Please experience a different one ");
} else {
  return [...state, action.newMovie];
}
```

Right approach (UI decides, reducer stays pure): `src/components/Movie.jsx`
```jsx
const handleAddToCart = (e, newMovie) => {
  e.stopPropagation();
  // check for duplicates here, then dispatch
  dispatch({ type: "add_cart", newMovie });
};
```

## Duplicate Handlers with Separate Concerns
File reference: `src/components/Movie.jsx`, `src/components/MovieDetails.jsx`
- Having `handleAddToCart` in both components is OK when concerns differ.
- Separation of concerns beats DRY when behavior is intentionally different.
- This reduces coupling and hidden side effects.

Wrong approach (forcing a single handler to serve both contexts):
```jsx
const handleAddToCart = (e, newMovie) => {
  e.stopPropagation();
  setShowMovieDetails(false);
  dispatch({ type: "add_cart", newMovie });
};
```

Right approach (context-specific handlers):
`src/components/Movie.jsx`
```jsx
const handleAddToCart = (e, newMovie) => {
  e.stopPropagation();
  dispatch({ type: "add_cart", newMovie });
};
```

`src/components/MovieDetails.jsx`
```jsx
const handleAddToCart = () => {
  dispatch({ type: "add_cart", newMovie: movie });
  setShowMovieDetails(false);
};
```

## Passing Handlers vs State Setters
File reference: `src/components/Page.jsx`
- Pass intent-based handlers instead of raw setters.
- This makes component APIs clearer and more reusable.

Wrong approach (setter leaked): `src/components/Page.jsx`
```jsx
{showCart && <Cart setShowCart={setShowCart} />}
```

Right approach (intent-based handler): `src/components/Page.jsx`
```jsx
{showCart && <Cart onClose={() => setShowCart(false)} />}
```

## Array Method Mental Models
File reference: `src/components/Cart.jsx`
- `map()` is for transforming arrays, not for accumulation.
- Using `map()` for totals hides intent and can return the wrong value.

Wrong approach (map for accumulation): `src/components/Cart.jsx`
```jsx
const costCalculator = () => {
  let total = 0;
  cartData.map((movie) => (total = total + movie.price));
  return total;
};

const costCalculator1 = () => {
  let total = 0;
  const cost = cartData.map((movie) => (total = total + movie.price));
  return cost;
};
```

Right approach (reduce expresses intent): `src/components/Cart.jsx`
```js
const totalCost = cartData.reduce((total, movie) => {
  return total + movie.price;
}, 0);
```

Right approach (ultra-clean reduce): `src/components/Cart.jsx`
```js
const totalCost = cartData.reduce(
  (sum, movie) => sum + movie.price,
  0
);
```

## Mental Model Summary
- `map` -> transform items
- `filter` -> remove items
- `reduce` -> combine into one value

﻿# Learning Notes: Architectural and React Mental-Model Insights

## 1. Component Responsibility & Placement

Modals should be rendered close to the component that controls their visibility, rather than arbitrarily placed in higher-level components like Page.jsx. This ensures clearer ownership and reduces prop drilling.

**Wrong Approach:** Placing the Cart modal in Page.jsx, far from the Header component that triggers it.

Code reference (wrong placement): `src/components/Page.jsx`

```jsx
return (
  <div className={`h-full w-full ${darkMode ? "dark" : " "} font-[Sora]`}>
    {showCart && <Cart setShowCart={setShowCart} />}
    <Header onShowCart={() => setShowCart(true)} />
    // ...
  </div>
);
```

**Right Approach:** Render the modal within Header.jsx, where the cart button is located.

Code reference (right placement): Suggested for `src/components/Header.jsx`

```jsx
const Header = ({ onShowCart }) => {
  // ...
  return (
    <header>
      // ... nav items ...
      {showCart && <Cart setShowCart={setShowCart} />}
    </header>
  );
};
```

This aligns with React's "components own what they control" mental model, promoting encapsulation and making the codebase easier to maintain and debug.

## 2. Writing Concise JSX

Conditional rendering in JSX can be simplified using ternary expressions instead of full if-else blocks or duplicated elements. This keeps the code readable and leverages JSX as expressions rather than templates.

**Wrong Approach:** Using commented-out or duplicated JSX for conditional rendering.

Code reference (wrong): `src/components/Header.jsx`

```jsx
<img src={darkMode ? sun : moon} width="24" height="24" alt="" />;

{
  /* {darkMode ? (
<img src={moon} width="24" height="24" alt="" />
) : (
  <img src={moon} width="24" height="24" alt="" />
)} */
}
```

**Right Approach:** Concise ternary expression without duplications or comments.

Code reference (right): `src/components/Header.jsx`

```jsx
<img src={darkMode ? sun : moon} width="24" height="24" alt="" />
```

Removing unnecessary comments and duplications reduces noise, making the intent clearer and the component easier to scan.

## 3. Reducer Design Principles

Reducers must remain pure, predictable functions that compute the next state based solely on the current state and action, without any side effects like alerts, console logs, or DOM manipulations.

They should have no knowledge of UI context, focusing only on state transformations. This makes them easy to test in isolation, as they don't depend on external factors.

Reducers belong in dedicated files like reducer.js, separate from components. Logic like movie searching or data duplication should reside in components, not reducers, to keep reducers clean and focused.

**Wrong Approach:** Placing searching logic in the reducer, making it impure.

Code reference (wrong): Suggested anti-pattern in `src/Data/cartReducer.jsx` (if searching were added there).

**Right Approach:** Keep searching in components, reducer only handles state updates.

Code reference (right): `src/components/Movie.jsx` (searching logic should be here, not in reducer).

This design perfectly matches React's mental model, where state updates are deterministic and side-effect-free, enabling features like time-travel debugging.

## 4. Duplicate Handlers with Separate Concerns

Having duplicate handlers like `handleAddToCart` in both Movie.jsx and MovieDetails.jsx is acceptable when each component has distinct concerns and behaviors.

**Wrong Approach:** Trying to share a single handler, leading to unnecessary complexity or side effects.

**Right Approach:** Separate handlers for different behaviors.

Code reference (Movie.jsx - right): `src/components/Movie.jsx`

```jsx
const handleAddToCart = (e, newMovie) => {
  e.stopPropagation(); // Prevents modal open
  dispatch({ type: "add_cart", newMovie: newMovie });
};
```

Code reference (MovieDetails.jsx - right): `src/components/MovieDetails.jsx`

```jsx
const handleAddToCart = () => {
  dispatch({ type: "add_cart", newMovie: movie });
  setShowMovieDetails(false); // Closes modal after adding
};
```

Prioritizing separation of concerns over strict DRY (Don't Repeat Yourself) reduces hidden coupling and unexpected side effects. This approach keeps components independent, making changes to one less likely to break the other.

## 5. Passing Handlers vs State Setters

Passing event handlers is preferable to passing state setters directly. This encapsulates logic and provides a clearer API.

**Wrong Approach:** Passing the setter directly, exposing internal state management.

Code reference (wrong): `src/components/Page.jsx`

```jsx
{
  showCart && <Cart setShowCart={setShowCart} />;
}
```

**Right Approach:** Pass a handler that encapsulates the close logic.

Code reference (right): Suggested for `src/components/Page.jsx`

```jsx
{
  showCart && <Cart onClose={() => setShowCart(false)} />;
}
```

Child components like Cart receive a well-defined `onClose` prop, making them more reusable and less tied to specific state management. It also prevents accidental misuse of the setter in the child.

## 6. Array Method Mental Models

Using `map` for accumulation is a misuse, as `map` is intended to transform each item into a new array element.

**Wrong Approach 1:** Mutating a variable inside `map`, ignoring the returned array.

Code reference (wrong): `src/components/Cart.jsx`

```jsx
const costCalculator = () => {
  let total = 0;
  cartData.map((movie) => (total = total + movie.price));
  return total;
};
```

**Wrong Approach 2:** Returning the mutated array instead of the total.

Code reference (wrong): `src/components/Cart.jsx`

```jsx
const costCalculator1 = () => {
  let total = 0;
  const cost = cartData.map((movie) => (total = total + movie.price));
  return cost; // Returns [100, 190, 290] instead of total
};
```

**Right Approach:** Use `reduce` to combine into a single value.

Code reference (right): Suggested for `src/components/Cart.jsx`

```js
const totalCost = cartData.reduce((sum, movie) => sum + movie.price, 0);
```

This is clean, readable, and free of side effects.

### Mental Model Summary

- `map` → transform items
- `filter` → remove items
- `reduce` → combine into one value

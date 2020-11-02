import React, { useReducer, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Payment from './components/Payment'
import Contact from "./components/Contact";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { reducer, initState } from "./reducer/contextReducer";
import { cartReducer, initCart } from "./reducer/cartReducer";
import Footer from "./components/Footer";

export const stateContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  const [cartState, cartDispatch] = useReducer(cartReducer, initCart, () => {
    const cartLocalStorage = localStorage.getItem('cart');
    return cartLocalStorage ? JSON.parse(cartLocalStorage) : initCart
  });
  
  const cart = cartState

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <stateContext.Provider value={{ state, dispatch, cartState, cartDispatch }}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Products />
            </Route>
            <Route path="/cart" component={Cart} />
            <Route path="/payment" component={Payment} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/contact" component={Contact} />
            <Route path="/:user_id" component={PrivateRoute} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </stateContext.Provider>
  );
}

export default App;
import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import About from "./components/Pages/About";
import Home from "./components/Pages/Home";
import AvailableProducts from "./components/Products/AvailableProducts";
import AvailableMovie from "./components/Products/Movies/AvailableMovies";
import CarProvider from "./components/Store/Cart-Provider";
import ContactUs from "./components/Pages/ContactUs";
import ProductDetails from "./components/Products/Music/ProductDetails";
import AuthForm from "./components/LogIn/AuthForm";
import AuthContext from "./components/Store/Auth-Context";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <CarProvider>
      {/* <Cart></Cart> */}
      <Header />
      <div>
        <Switch>
          <Route path='/about'>
            <About></About>
          </Route>
          <Route path='/Login'>
            <AuthForm></AuthForm>
          </Route>
          <Route path='/' exact>
            <Redirect to={"/home"} />
          </Route>
          {ctx.isLoggedIn && (
            <Route path='/Login' exact>
              <Redirect to={"/store"} />
            </Route>
          )}
          <Route path='/store'>
            <AvailableProducts />
          </Route>
          <Route path='/Details/:productId'>
            <ProductDetails />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/contactus'>
            <ContactUs />
          </Route>
          <Route path='/movies'>
            <AvailableMovie />
          </Route>
        </Switch>
      </div>
      <Footer />
    </CarProvider>
  );
}

export default App;

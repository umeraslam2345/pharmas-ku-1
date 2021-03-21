import React from 'react';

import Home from './Pages/Home';
import About from './Pages/About';
import Shop from './Pages/Shop';
import Contact from './Pages/Contact';
import Detail from './Pages/Detail';
import Card from './Pages/Card';
import Checkout from './Pages/Checkout';
import Thankyou from './Pages/Thankyou';
import Header from './Components/Header';
import Footer from './Components/Footer';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import demo from './Pages/demo';
import Admin from './Pages/Admin/Admin';
import createProduct from './Pages/Admin/createProduct';
import AllProduct from './Pages/Admin/AllProduct';
import CheckoutUser from './Pages/Admin/CheckoutUser';
import CategoriesShop from './Pages/CategoriesShop';
import SearchData from './Pages/SearchData';
import CheckoutUserOrderData from './Pages/Admin/CheckoutUserOrderData';
import LoginAdmin from './Pages/Admin/LoginAdmin';
import forgetPass from './Pages/Admin/forgetPass';
import Signup from './Pages/Admin/Signup';
import AllUser from './Pages/Admin/AllUser';



function App() {
  return (
    <div className="App">
      <Router>

        <Header />

        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route exact path='/Header12345678' component={Header} /> */}
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/login' component={LoginAdmin} />
          <Route exact path='/signup-user' component={Signup} />
          <Route exact path='/forget-pass-admin' component={forgetPass} />
          <Route exact path='/createProduct' component={createProduct} />
          <Route exact path='/allproduct' component={AllProduct} />
          <Route exact path='/alluser' component={AllUser} />
          <Route exact path='/allcheckoutuser' component={CheckoutUser} />
          <Route exact path='/allcheckoutuser/:id' component={CheckoutUserOrderData} />
          <Route exact path='/abc' component={demo} />
          <Route exact path='/about' component={About} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/shop/categories/:productcategories/:productname' component={Detail} />
          <Route exact path='/shop/categories/:categories' component={CategoriesShop} />
          <Route exact path='/shop/search/product-item' component={SearchData} />
          {/* <Route exact path='/detail' component={Detail} /> */}
          <Route exact path='/card' component={Card} />
          <Route exact path='/checkout' component={Checkout} />
          <Route exact path='/thankyou' component={Thankyou} />
        </Switch>

        <Footer />

      </Router>
    </div>
  );
}

export default App;

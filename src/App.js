import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from "./pages/Login";
import Home from "./component/Home";
import Register from "./pages/Register";
import LoginAdmin from "./pages/LoginAdmin"
import HomeAdmin from "./component/HomeAdmin";
import Edit from "./pages/Edit";
import Cart from "./pages/Cart";
import Footer from "./component/Footer";


function App() {
  return (
    <div className="App">
    <Navbar />
      <BrowserRouter>
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/loginadmin" component={LoginAdmin} exact />
          <Route path="/edit/:id" component={Edit} exact />
          <Route path="/homeadmin" component={HomeAdmin} exact />
          <Route path="/cart" component={Cart} exact />
        </Switch>
      </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App

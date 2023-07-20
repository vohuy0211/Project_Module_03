import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Invoice from "./Component/HomeAdmin/ManagerInvoice/Invoice";
import Product from "./Component/HomeAdmin/ManagerProduct/Product";
import LayoutNavbar from "./Component/Layout/LayoutNavbar";
import User from "./Component/HomeAdmin/ManagerUsers/User";
import Login from "./Component/Login/Login";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import RequiredAdmin from "./Component/RequireAuth";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<RequiredAdmin />}>
          <Route
            path="/Navbar"
            element={
              <LayoutNavbar>
                <User />
              </LayoutNavbar>
            }
          />
        </Route>
        <Route element={<RequiredAdmin />}>
          <Route
            path="/Product"
            element={
              <LayoutNavbar>
                <Product />
              </LayoutNavbar>
            }
          />
        </Route>
        <Route element={<RequiredAdmin />}>
          <Route
            path="/Invoice"
            element={
              <LayoutNavbar>
                <Invoice />
              </LayoutNavbar>
            }
          />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

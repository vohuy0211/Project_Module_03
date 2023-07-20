import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
import LoginLayout from "./Layouts/LoginLayout/LoginLayout";
import UserLayout from "./Layouts/UserLayout/UserLayout";
import Home from "./pages/Home/Home";
import HomeLogin from "./Component/HomeLogin/HomeLogin";
import LayoutCard from "./Layouts/LayoutCard/LayoutCard";
import Detail from "./Component/Detail/Detail";
import CartProduct from "./Component/CartProduct/CartProduct";
import Profile from "./Component/ProFile/Profile";
import History from "./Component/History/History";
import RequiredAdmin from "./Component/RequireAuth";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/Login"
          element={
            <LoginLayout>
              <Login />
            </LoginLayout>
          }
        />
        <Route
          path="/Register"
          element={
            <LoginLayout>
              <Register />
            </LoginLayout>
          }
        />
        <Route element={<RequiredAdmin />}>
          <Route
            path="/HomeLogin"
            element={
              <UserLayout>
                <HomeLogin />
              </UserLayout>
            }
          />
        </Route>
        <Route
          path="/Detail/:id"
          element={
            <LayoutCard>
              <Detail />
            </LayoutCard>
          }
        />
        <Route element={<RequiredAdmin />}>
          <Route path="/Cart" element={<CartProduct />} />
        </Route>
        <Route element={<RequiredAdmin />}>
          <Route path="/Profile" element={<Profile />} />
        </Route>
        <Route element={<RequiredAdmin />}>
          <Route path="/History" element={<History />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

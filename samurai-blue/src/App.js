import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import NewBroadcast from "./pages/NewBroadcast";
import Broadcasts from "./pages/Broadcasts";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Broadcasting from "./pages/Broadcasting";
import NinjaLiveContextProvider from "./ticketing-context";

function App() {
    const location = useLocation();
    return (
        <NinjaLiveContextProvider>
            <div className="flex w-full h-[100vh] justify-between font-opensans">
                <div
                    className={`hidden ${
                        location.pathname.includes("login") ||
                        location.pathname.includes("sign-up")
                            ? "hidden"
                            : "sm:flex"
                    }`}
                >
                    <NavBar></NavBar>
                </div>
                <Routes>
                    <Route path="dashboard" element={<Dashboard />}></Route>
                    <Route path="broadcasts" element={<Broadcasts />}></Route>
                    <Route
                        path="broadcasts/new-broadcast"
                        element={<NewBroadcast />}
                    ></Route>
                    <Route path="orders" element={<Orders />}></Route>
                    <Route path="products" element={<Products />}></Route>
                    <Route path="settings" element={<Settings />}></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="sign-up" element={<SignUp />}></Route>
                    <Route
                        path="broadcasting"
                        element={<Broadcasting />}
                    ></Route>
                </Routes>
            </div>
        </NinjaLiveContextProvider>
    );
}

export default App;

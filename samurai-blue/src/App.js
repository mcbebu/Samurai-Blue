import './App.css';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sessions from './pages/Sessions';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Settings from './pages/Settings';


function App() {
  return (
    <div className='flex w-full h-full justify-between font-opensans'>
      <NavBar></NavBar>
      <Routes>
        <Route path="dashboard" element={<Dashboard/>}></Route>
        <Route path="sessions" element={<Sessions/>}></Route>
        <Route path="orders" element={<Orders/>}></Route>
        <Route path="products" element={<Products/>}></Route>
        <Route path="settings" element={<Settings />}></Route>
      </Routes>
    </div>
  );
}

export default App;

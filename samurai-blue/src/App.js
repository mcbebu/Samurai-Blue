import './App.css';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sessions from './pages/Sessions';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Settings from './pages/Settings';
import NewBroadcast from './pages/NewBroadcast'


function App() {
  return (
    <div className='flex w-full h-[100vh] justify-between font-opensans'>
      <div className='hidden sm:flex'>
        <NavBar></NavBar>
      </div>
      <Routes>
        <Route path="dashboard" element={<Dashboard/>}></Route>
        <Route path="sessions" element={<Sessions />}></Route>
        <Route path="sessions/new-broadcast" element={<NewBroadcast/>}></Route>

        <Route path="orders" element={<Orders/>}></Route>
        <Route path="products" element={<Products/>}></Route>
        <Route path="settings" element={<Settings />}></Route>
      </Routes>
    </div>
  );
}

export default App;

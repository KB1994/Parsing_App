import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import SignIn from './Components/SignIn'
import MainPage from './Components/MainPage'
import history from "./Components/history";
import PrivateRoute from "./PrivateRoute";
import { isLogin } from "./Authentification";

function App() {
  return (
   
     <BrowserRouter>
            <Routes>
                <Route path='/' element={isLogin() ? <Navigate push='true' to='/MainPage' /> : <SignIn/> }> </ Route>
                <Route path='/MainPage' element={<PrivateRoute> <MainPage/> </PrivateRoute>}/>
                <Route path='*' element={<h3> The page your are trying to access does not exist </h3>} />
            </Routes>
        </ BrowserRouter>
   


  );
}

export default App;

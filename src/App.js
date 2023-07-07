import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import MainGis from './component/MainGis.js';
import SignUp from './component/SignUp';
import Login from './component/Login';
import FoodInfomation  from './component/FoodInfomation';
import BoardList from './component/BoardList';
import BoardDetail from './component/BoardDetail';
import FoodDetail from './component/FoodDetail';

import NotFoundPage from './component/NotFoundPage';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<MainGis />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="/foodInfo/:la/:ma/:address" element={<FoodInfomation/>}></Route>
          <Route path="/boardList" element={<BoardList />}></Route>
          <Route path="/boardDetail/:id" element={<BoardDetail />}></Route>
          <Route path="/foodDetail/:id" element={<FoodDetail />} ></Route>
          <Route path="/*" element={<NotFoundPage></NotFoundPage>} ></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>      
      

    </div>
  );
} 

export default App; 

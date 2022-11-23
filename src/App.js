import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home'; 
import AddEditBlog from './pages/AddEditBlog';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';
import About from './pages/About';
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/> 
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addblog" element={<AddEditBlog />} />
          <Route path="/editblog/:id" element={<AddEditBlog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

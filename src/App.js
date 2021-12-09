import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home'
import Book from './components/book/Book'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} exact={true}></Route>
          <Route path="/book" element={<Book></Book>} exact={true}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

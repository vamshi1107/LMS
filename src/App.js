import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home'
import Book from './components/book/Book'
import Import from './components/import/Import'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Members from './components/members/members';
import Issue from './components/issue/issue'
import Explore from './components/explore/explore';
import Transaction from './components/transaction/transaction';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} exact={true}></Route>
          <Route path="/books" element={<Book></Book>} exact={true}></Route>
          <Route path="/import" element={<Import></Import>} exact={true}></Route>
          <Route path="/issue" element={<Issue></Issue>} exact={true}></Route>
          <Route path="/members" element={<Members></Members>} exact={true}></Route>
          <Route path="/explore" element={<Explore></Explore>} exact={true}></Route>
          <Route path="/reports" element={<Transaction></Transaction>} exact={true}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import Header from "./components/Header";
import Cards from "./components/Cards";
import AddMovie from "./components/AddMovie";
import Detail from "./components/Detail";
import { createContext,useContext, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

const Appstate = createContext();

function App() {
  const [login,setLogin] = useState(false);
  const [userName,setUserName] = useState("");
  

  return (
    <Appstate.Provider value={{login , userName, setLogin , setUserName }}>
    <Router>
    <div className="App relative">
     <Header></Header>
     <Routes>
      <Route path="/" element={<Cards/>}/>
      <Route path="/addmovie" element={<AddMovie/>}/>
      <Route path="/detail/:id" element={<Detail/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/> 
     </Routes>
    </div>
    </Router>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate};
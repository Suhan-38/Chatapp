import './App.css';
import { BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { useContext } from 'react';
import { usercontext } from './Mycontext';

function App() {
  
  const {user,setuser}=useContext(usercontext);
  
  const Protector =({children})=>{
    if(!user) {
      return <Navigate to="/Login"/>}
    else{return(
      children
    )}
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/Register' element={<Register />}/>
      <Route path='/Login' element={<Login />}/>
      <Route path='/Home' element={<Protector><Home /></Protector>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

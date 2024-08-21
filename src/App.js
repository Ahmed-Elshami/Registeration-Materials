import logo from './logo.svg';
import './App.css';
import MainHeader from './Components/MainHeader/MainHeader';
import Navbar from './Components/Navbar/Navbar';
import UserContextProvider from './Context/UserContext';


function App() {
  return (
   <>
   <Navbar/>
 <UserContextProvider
 >
  <MainHeader/>
 </UserContextProvider >
     
 
   
   </>
  );
}

export default App;

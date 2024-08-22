import logo from './logo.svg';
import './App.css';
import MainHeader from './Components/MainHeader/MainHeader';
import Navbar from './Components/Navbar/Navbar';
import UserContextProvider from './Context/UserContext';
import { Toaster } from 'react-hot-toast';



function App() {
  return (
   <>
   <Navbar/>
 <UserContextProvider>
  <MainHeader/>
 </UserContextProvider >
 <Toaster/>
     
 
   
   </>
  );
}

export default App;

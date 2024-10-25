import {BrowserRouter as Router , Route, Routes} from "react-router-dom"
import './App.css';
import ImageUploader from './component/ImageUploader';
import Login from './component/Login';

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/login" element={<Login/>}/>

      </Routes>
    </Router>
  );
}

export default App;

// <div className="App">
    //   <header className="App-header">
       
    //     <Login/>
     
    //   </header>
  
    // </div>
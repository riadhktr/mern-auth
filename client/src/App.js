
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import UserRoute from './components/privateRoutes/userRoute';
import Register from './components/Register';
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>

      <Route element={<UserRoute/>}>
      <Route path="/welcome" element={<Welcome/>}/>
      </Route>
    </Routes>
      </header>
    </div>
  );
}

export default App;

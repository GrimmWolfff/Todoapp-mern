import Register from './Components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Login from './Components/Login';
import Todos from './Components/Todos';

//TODO: RUN electron concurrently
//TODO: Three.js
function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
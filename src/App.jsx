
import { Route, Routes } from "react-router-dom";
import CountryDetails from "./pages/CountryDetails";
import Home from "./pages/home";
function App() {
  

  return (
   <div>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/country/:code" element ={<CountryDetails/>} />
    </Routes>
   </div>
  )
}

export default App

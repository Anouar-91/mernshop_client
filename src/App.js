import Footer from "./components/Footer";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap";
import HomeScreen from "./screens/HomeScreen";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>

      <Header></Header>
      <main>
        <div className="container">
        <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/product/:id' element={<ProductScreen />} />

        </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

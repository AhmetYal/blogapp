import "./App.css";
import { Routes, Route } from "react-router-dom";
import MakaleEkle from "./components/MakaleEkle";
import MakaleListesi from "./components/MakaleListesi";
import Baslik from "./components/Baslik";
import MakaleDetay from "./components/MakaleDetay";

function App() {
  return (
    <div className="App">
      <Baslik />
      <Routes>
        <Route exact path="/" element={<MakaleListesi />} />
        <Route path="/ekle" element={<MakaleEkle />} />
        <Route path="/makale/:id" element={<MakaleDetay />} />
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";

function Baslik() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Makale Listesi</Link>
        </li>
        <li>
          <Link to="/ekle">Makale Ekle</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Baslik;

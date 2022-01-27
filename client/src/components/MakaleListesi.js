import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const MAKALELER_GETIR = gql`
  {
    makalelerGetir {
      id
      baslik
      icerik
    }
  }
`;

function MakaleListesi() {
  const { data, loading, error } = useQuery(MAKALELER_GETIR);

  let makaleTemp;
  if (loading) {
    makaleTemp = <p>Yükleniyor</p>;
  } else if (data) {
    makaleTemp = data.makalelerGetir.map((makale) => {
      return (
        <div className="makaleler" key={makale.id}>
          <Link to={`/makale/${makale.id}`}>{makale.baslik}</Link>
        </div>
      );
    });
  }

  return <div>{makaleTemp}</div>;
}

export default MakaleListesi;

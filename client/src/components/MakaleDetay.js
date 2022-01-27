import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

const MAKALE_GETIR = gql`
  query makaleGetir($id: ID!) {
    makalelerGetir(id: $id) {
      id
      baslik
      icerik
    }
  }
`;

const MAKALE_SIL = gql`
  mutation makaleSil($id: ID!) {
    makaleSil(id: $id)
  }
`;

function MakaleDetay() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(MAKALE_GETIR, {
    variables: { id },
  });
  const [makaleSil] = useMutation(MAKALE_SIL);

  const onClick = () => {
    makaleSil({ variables: { id } });
    window.location = "/";
  };

  return (
    <div>
      MakaleDetay ID: {id}
      <button className="sil" onClick={onClick}>
        Sil
      </button>
      {data && (
        <div className="detay content">
          <h2>{data.makaleGetir.baslik}</h2>
          <div className="content">{data.makaleGetir.icerik}</div>
        </div>
      )}
    </div>
  );
}

export default MakaleDetay;

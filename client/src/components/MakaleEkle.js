import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const MAKALE_EKLE = gql`
  mutation makaleEkle($baslik: String!, $icerik: String!) {
    makaleOlustur(baslik: $baslik, icerik: $icerik) {
      id
      baslik
      icerik
    }
  }
`;

function MakaleEkle() {
  const [veriler, setVeriler] = useState({
    baslik: "",
    icerik: "",
  });

  const [makaleEkle, { loading }] = useMutation(MAKALE_EKLE, {
    update(proxy, result) {
      console.log(result);
    },
    variables: veriler,
  });

  const onChange = (e) => {
    setVeriler({ ...veriler, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    makaleEkle();
    window.location = "/";
  };

  return (
    <div className="makale-olustur">
      <form onSubmit={onSubmit}>
        <label htmlFor="baslik">Makale Başlık:</label>
        <input type="text" id="baslik" name="baslik" onChange={onChange} />
        <label htmlFor="icerik">Makale İçerik:</label>
        <textarea type="text" id="icerik" name="icerik" onChange={onChange} />
        <button>Kaydet</button>
      </form>
    </div>
  );
}

export default MakaleEkle;

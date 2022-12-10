import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, InputGroup  } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../style/edit.css";

export default function Edit() {
    const param = useParams();
    const [gambar, setGambar] = useState("");
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [harga, setHarga] = useState(0);

    const history = useHistory();

    useEffect(() => {
        axios
        .get("http://localhost:8000/daftarMenu/" + param.id)
        .then((response) => {
            const newMenu = response.data;
            setGambar(newMenu.gambar);
            setNama(newMenu.nama);
            setDeskripsi(newMenu.deskripsi);
            setHarga(newMenu.harga)
        })
        .catch((error) => {
            alert("Terjadi kesalahan Sir!" + error);
        });
    }, []);

    const submitActionHandler = async (event) => { //menjalankan perintah put (update)
        event.preventDefault();

        await axios
        .put("http://localhost:8000/daftarMenu/" + param.id, {
            gambar : gambar,
            nama : nama,
            deskripsi : deskripsi,
            harga : harga
        })
        Swal.fire(
            'Update Berhasil',
            'Data berhasil diupdate!',
            'success'
          ) 
        .then(() => {
            history.push("/homeadmin");
            window.location.reload();
        })
        .catch((error) => {
            alert("Terjadi kesalahan : " + error);
        });
    };

  return (
    <div className="edit mx-5">
        <div className="container my-5 box">
            <Form onSubmit={submitActionHandler}>
                <div className="header">
                    <h1>Update Data</h1>
                    <hr />
                </div>
                <div className="name mb-3">
                    <Form.Label>
                        <strong>Link Gambar</strong>
                    </Form.Label>
                    <InputGroup className="d-flex gap-3">
                        <Form.Control 
                        placeholder="Masukkan Link Gambar..."
                        value={gambar}
                        onChange={(e) => setGambar(e.target.value)}  //untuk 
                        />
                    </InputGroup>
                </div>

                <div className="name mb-3">
                    <Form.Label>
                        <strong>Nama</strong>
                    </Form.Label>
                    <InputGroup className="d-flex gap-3">
                        <Form.Control 
                        placeholder="Masukkan nama..."
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="name mb-3">
                    <Form.Label>
                        <strong>Deskripsi</strong>
                    </Form.Label>
                    <InputGroup className="d-flex gap-3">
                        <Form.Control 
                        placeholder="Masukkan deskripsi..."
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="name mb-3">
                    <Form.Label>
                        <strong>Harga</strong>
                    </Form.Label>
                    <InputGroup className="d-flex gap-3">
                        <Form.Control 
                        placeholder="Masukkan harga..."
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="d-flex justify-content-end align-items-center mt-2">
                    <button className="buton btn" type="submit">Save</button>
                </div>
            </Form>
        </div>
    </div>
  );
}

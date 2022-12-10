import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../style/navbar.css";
import logo from "../image/pngegg (6).png"
import Swal from "sweetalert2";
import axios from "axios";
import { Modal, Form, FormControl, FormLabel, InputGroup, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [gambar, setGambar] = useState("");
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState(0);

  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addMenu = async (e) => {
    e.preventDefault();

    const data = {
      gambar : gambar,
      nama : nama,
      deskripsi : deskripsi,
      harga : harga,
    }

    await axios
    .post(" http://localhost:8000/daftarMenu/", data)
    Swal.fire(
      'Success',
      'Data berhasil ditambahkan!',
      'success'
    )
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      alert("Terjadi kesalahan " + error);
    });
  };

  const logout = () => {
    window.location.reload();
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="navbar">
      <nav className="navbar navbar-expand-lg container-fluid">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Coffe
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Snack
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Ice Cup
                    </a>
                  </li>
                </ul>
              </li> */}
              {localStorage.getItem("username") !== null ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" onClick={handleShow}>Tambah Data</a>
                  </li>
                </>
              ) : (
                <></>
              )}
              {localStorage.getItem("id") !== null ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/cart">
                      Cart
                    </a>
                  </li>
                  <li className="nav-item float-right">
                    <a className="nav-link" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item float-right">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* modal */}
      <Modal show={show} onHide={handleClose} className="modal">
    <ModalHeader closeButton className='header'>
      <ModalTitle>Add Menu</ModalTitle>
    </ModalHeader>
    <ModalBody>
      <Form onSubmit={addMenu} method="POST">
        <div className="mb-3">
          <FormLabel>
            <strong>Link Gambar</strong>
          </FormLabel>
          <InputGroup className="d-flex gap-3">
            <FormControl placeholder="Masukkan link gambar..." value={gambar} onChange={(e) => setGambar(e.target.value)} required />
          </InputGroup>
        </div>
        <div className="mb-3">
          <FormLabel>
            <strong>Nama</strong>
          </FormLabel>
          <InputGroup className="d-flex gap-3">
            <FormControl placeholder="Masukkan nama.." value={nama} onChange={(e) => setNama(e.target.value)} required />
          </InputGroup>
        </div>
        <div className="mb-3">
          <FormLabel>
            <strong>Deskripsi</strong>
          </FormLabel>
          <InputGroup className="d-flex gap-3">
            <FormControl placeholder="Masukkan deskripsi..." value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required />
          </InputGroup>
        </div>
        <div className="mb-3">
          <FormLabel>
            <strong>Harga</strong>
          </FormLabel>
          <InputGroup className="d-flex gap-3">
            <FormControl placeholder="Masukkan harga..." value={harga} onChange={(e) => setHarga(e.target.value)} required />
          </InputGroup>
        </div>
        <button className="mx-1 button-btl btn btn-danger" onClick={handleClose}>Close</button>
        <button type="submit" className="mx-1 buoton btn btn-primary" onClick={handleClose}>Save</button>
      </Form>
    </ModalBody>
  </Modal>
    </div>
  );
}

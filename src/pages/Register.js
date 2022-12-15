import axios from "axios";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/login.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const addUser = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    await axios.post("http://localhost:8000/users/", data);
    Swal.fire({
      icon: "success",
      title: "Berhasil Registrasi",
      showConfirmButton: false,
      timer: 1500,
    })
      .then(() => {
        history.push("/login");
        window.location.reload();
      })
      .catch((error) => {
        alert("Terjadi kesalahan " + error);
      });
  };

  return (
    <div className="form">
      <div className="login">
        <h1 className="mb-5">REGISTER</h1>
        <hr />
        <Form onSubmit={addUser} method="POST">
          <div className="mb-3">
            <Form.Label>
              <strong>Email</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                placeholder="Masukkan email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
          </div>
          <div className="mb-3">
            <Form.Label>
              <strong>Password</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                type="password"
                placeholder="Masukkan password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputGroup>
          </div>
          <button variant="primary" type="submit" className="mx-1 buton btn">
            Register
          </button>
          <p>
            Sudah punya akun? Silahkan <a href="/login">Login</a> <br /> Atau
            masuk sebagai <a href="/loginadmin">Admin</a>
          </p>
        </Form>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";
import "../style/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const loginAdmin = async (e) => {
    e.preventDefault();
    axios.get("http://localhost:8000/admin").then(({ data }) => {
      const admin = data.find(
        (x) => x.username === username && x.password === password
      );
      if (admin) {
        Swal.fire({
          icon: "success",
          title: "Welcome Admin !",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("id", admin.id);
        localStorage.setItem("username", admin.username);
        history.push("/homeadmin");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Username atau Password Tidak Valid",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="form">
      <div className="login">
        <h1 className="mb-5">LOGIN ADMIN</h1>
        <hr />
        <Form onSubmit={loginAdmin} method="POST">
          <div className="mb-3">
            <Form.Label>
              <strong>Username</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                placeholder="Masukkan username..."
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="mb-3">
            <Form.Label>
              <strong>Password</strong>
            </Form.Label>
            <InputGroup className="d-flex gap-3">
              <Form.Control
                placeholder="Masukkan password..."
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </div>
          <button variant="primary" type="submit" className="mx-1 buton btn">
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Form, InputGroup } from 'react-bootstrap';
import "../style/login.css"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const login = async (e) => {
        e.preventDefault();
        axios.get("http://localhost:8000/users").then(({data}) => {
            const user = data.find(
                (x) => x.email === email && x.password === password
            );
            if(user) {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome !!!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                    localStorage.setItem("id", user.id)
                    history.push("/");
                    setTimeout(() => {
                        window.location.reload();   
                    }, 1500)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Email atau Password Tidak Valid!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    }
        });
    };

  return (
    <div className="form">
    <div className="login">
        <h1 className="mb-5">LOGIN</h1>
        <hr />
        <Form onSubmit={login} method="POST">
            <div className="mb-3">
                <Form.Label>
                    <strong>Email</strong>
                </Form.Label>
                <InputGroup className="d-flex gap-3">
                    <Form.Control 
                    placeholder="Masukkan email..."
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" className="buton btn">Login</button>
            <p>Belum punya akun? Silahkan <a href="/register">Register</a> <br/> Atau masuk sebagai <a href="/loginadmin">Admin</a></p>
        </Form>

    </div>
    </div>
  )
}

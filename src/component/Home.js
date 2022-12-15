import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import promo1 from "../image/promo3.jpeg";
import promo2 from "../image/promo2.jpg";
import promo3 from "../image/promo1.jpg";
import "../style/home.css";

export default function Home() {
  const [menu, setMenu] = useState([]);
  const history = useHistory();

  const addToCart = async (daftar) => {
    await axios.post("http://localhost:8000/cart/", daftar);
    Swal.fire({
      icon: "success",
      title: "Berhasil dimasukkan ke Cart",
      showConfirmButton: false,
      timer: 1500,
    })
      .then(() => {
        window.location.reload();
        history.push("/cart");
      })
      .catch((error) => {
        alert("Terjadi kesalahan " + error);
      });
  };

  const getAll = () => {
    axios
      .get("http://localhost:8000/daftarMenu")
      .then((res) => {
        setMenu(res.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan" + error);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="home">
      <div className="welcome">
        <div className="ucapan">
          <small>Selamat Datang di</small>
          <h1>LeKafe</h1>
          <p>
            Kafe kekinian dengan berbagai pilihan menu hitz. Dijamin ketagihan
          </p>
        </div>
      </div>

      <div className="promo">
        <h3>
          <b>YEAY!! HARI INI</b> Kalian masih bisa nikmati{" "}
          <span className="coffe">Promo International Coffee Day</span> dengan
          harga spesial mulai Rp 25.000,-
        </h3>
        <h4>
          Udah gitu, bisa tambah menu lain favorit kamu juga, kayak : Croffle,
          Croissant, atau Chocolate MilkShake
        </h4>
        <small>
          <b>* syarat dan ketentuan berlaku</b>
        </small>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={promo1} className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src={promo2} className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src={promo3} className="d-block w-100" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="produk flex-wrap">
        {menu.map((daftar) => (
          <div key={daftar.id} className="card">
            <div className="img">
              <img src={daftar.gambar} className="card-img-top" />
            </div>
            <div className="card-body">
              <h3>{daftar.nama}</h3>
              <h5>{daftar.deskripsi}</h5>
              <h4>Rp {daftar.harga}</h4>
              {localStorage.getItem("id") !== null ? (
                <div className="buy">
                  <a onClick={() => addToCart(daftar)}>Buy Now</a>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

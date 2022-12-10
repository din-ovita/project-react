import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import "../style/homeadmin.css";

export default function HomeAdmin() {
  const [menu, setMenu] = useState([]);

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

  const deleteMenu = async (id) =>  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8000/daftarMenu/" + id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 5000
        })
      }
      window.location.reload();
    })
    getAll();
  };


  return (
    <div className="homeadmin">
    <div className="container data">
            <div className="table-admin">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
          {menu.map((daftar, index) => (
            <tr key={daftar.id}>
              <td>{index + 1}</td>
              <td><img src={daftar.gambar} /></td>
              <td>{daftar.nama}</td>
              <td className="deskripsi">{daftar.deskripsi}</td>
              <td className="harga">Rp {daftar.harga}</td>
              <td className="aksi">
              <button
                  className="mx-1 tombol delete"
                  onClick={() => deleteMenu(daftar.id)}
                  >
                   Hapus
                  </button> <a href={"/edit/" + daftar.id} >
                    <button className="mx-1 tombol ubah">
                      Ubah
                    </button>
                  </a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import "../style/cart.css"

export default function Cart() {
const [menu, setMenu] = useState([]);

// const totalHarga = () => {
//   this.daftar.reduce((a, b) => a + b.harga, 0)
// }

// const checkout = () => {
//    if(!this.totalHarga) {
//      Swal.fire("Failed :(", "Please select the item", "error");  
//    }
//    Swal.fire("Checkout Successfull!", "Thank you for shopping", "success")
//    window.location.reload();
// }

const getAll = () => {
  axios
    .get("http://localhost:8000/cart")
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
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete("http://localhost:8000/cart/" + id);
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
        )
        window.location.reload();
    }
  })
  getAll();
};

  return (
    <div>
          <div className="container my-5">
            <div className="table-admin">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th className="harga">Harga</th>
              <th className="aksi">Aksi</th>
            </tr>
          </thead>
          <tbody>
          {menu.map((daftar, index) => (
            <tr key={daftar.id}>
              <td>{index + 1}</td>
              <td><img src={daftar.gambar} /></td>
              <td>{daftar.nama}</td>
              <td>{daftar.deskripsi}</td>
              <td>Rp {daftar.harga}</td>
              <td>
              <button
                  className="mx-1 tombol delete"
                  onClick={() => deleteMenu(daftar.id)}
                  >
                   Hapus
                  </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
    <strong>Total Harga : </strong>
    <div className="checkout">
      <button >CheckOut</button>
    </div>
    </div>
  )
}

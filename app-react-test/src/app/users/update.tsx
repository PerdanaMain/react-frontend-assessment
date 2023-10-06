"use client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";
import axios from "axios";

type user = {
  id: number;
  name: string;
  address: string;
  born_date: string;
  tanggal_lahir: string;
  tanggal_input: string;
  gender: string;
};

const Update = ({ user }: { user: user }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [nama, setNama] = useState(user.name);
  const [alamat, setAlamat] = useState(user.address);
  const [jenisKelamin, setJenisKelamin] = useState(user.gender);
  const [tanggalLahir, setTanggalLahir] = useState(user.born_date);
  const user_id = user.id;

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const token = getCookie("token");

      const data = {
        name: nama,
        address: alamat,
        gender: jenisKelamin,
        born_date: tanggalLahir,
      };

      const res = await axios({
        method: "PUT",
        url: `testapi/user/${user_id}`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
        baseURL: "https://cms-admin-v2.ihsansolusi.co.id/",
      });

      if (res.status == 200) {
        // close modal
        handleModal();

        setIsLoading(false);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data Berhasil Diupdate",
        }).then((result) => {
          if (result.isConfirmed) {
            router.refresh();
            router.push("/users");
          }
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  };
  return (
    <div>
      <button className="btn btn-warning btn-sm mb-4" onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-large text-center mb-3">Edit Data</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full mt-2">
              <label className="label font-bold">Nama</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Masukkan Nama Anda"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="form-control w-full mt-2">
              <label className="label font-bold">Alamat</label>
              <textarea
                className="textarea input input-bordered"
                placeholder="Masukkan Alamat Anda"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              ></textarea>
            </div>

            <div className="form-control w-full mt-2">
              <label className="label font-bold">Jenis Kelamin</label>
              <div className="columns-2">
                <label className="cursor-pointer mr-5">
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio radio-accent"
                    value="l"
                    checked={jenisKelamin === "l"}
                    onChange={(e) => {
                      setJenisKelamin(e.target.value);
                    }}
                  />
                  <span className="label-text">Pria</span>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio radio-secondary"
                    value="p"
                    checked={jenisKelamin === "p"}
                    onChange={(e) => {
                      setJenisKelamin(e.target.value);
                    }}
                  />
                  <span className="label-text">Wanita</span>
                </label>
              </div>
            </div>

            <div className="form-control w-full mt-2">
              <label className="label font-bold">Tanggal Lahir</label>
              <input
                type="date"
                className="input input-bordered"
                placeholder="Enter the date"
                value={tanggalLahir}
                onChange={(e) => setTanggalLahir(e.target.value)}
              />
            </div>
            <div className="modal-action mt-5">
              <button
                type="button"
                className="btn mr-2 w-auto"
                onClick={handleModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {isLoading ? (
                  <div>
                    <span className="loading loading-spinner loading-xs mr-3"></span>
                    Processing ...
                  </div>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;

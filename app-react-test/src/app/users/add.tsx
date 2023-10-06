"use client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import { getCookie } from "cookies-next";

const Add = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsloading(true);

      const token = getCookie("token");

      const data = {
        name: nama,
        address: alamat,
        gender: jenisKelamin,
        born_date: tanggalLahir,
      };

      const res = await axios({
        method: "POST",
        url: "testapi/user",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "json",
        baseURL: "https://cms-admin-v2.ihsansolusi.co.id/",
      });

      if (res.status == 201) {
        // close modal
        handleModal();

        setIsloading(false);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data Berhasil Ditambahkan",
        }).then((result) => {
          if (result.isConfirmed) {
            // set state to default
            setNama("");
            setAlamat("");
            setJenisKelamin("");
            setTanggalLahir("");

            router.refresh();
          }
        });
      }
    } catch (error: any) {
      setIsloading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    }
  };
  return (
    <div>
      <button className="btn btn-primary mb-4" onClick={handleModal}>
        Add New
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-large text-center mb-3">
            Add New Data
          </h3>
          <form onSubmit={handleSubmit}>
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
                    <span className="loading loading-spinner loading-xs mr-2"></span>
                    Processing...
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;

"use client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";

type user = {
  name: string;
  address: string;
  born_date: string;
  tanggal_lahir: string;
  tanggal_input: string;
  gender: string;
};

const View = ({ user }: { user: user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    setIsLoading(true);
  };
  return (
    <div>
      <button className="btn btn-info btn-sm mb-4" onClick={handleModal}>
        View
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-large text-center mb-3">View Data</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full mt-2">
              <label className="label font-bold">Nama</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Masukkan Nama Anda"
                value={user.name}
                readOnly
              />
            </div>
            <div className="form-control w-full mt-2">
              <label className="label font-bold">Alamat</label>
              <textarea
                className="textarea input input-bordered"
                placeholder="Masukkan Alamat Anda"
                readOnly
                value={user.address}
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
                    readOnly
                    checked={user.gender === "l"}
                  />
                  <span className="label-text">Pria</span>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio radio-secondary"
                    value="p"
                    readOnly
                    checked={user.gender === "p"}
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
                readOnly
                value={user.born_date}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default View;

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { getCookie } from "cookies-next";

type user = {
  id: number;
  name: string;
  address: string;
  born_date: string;
  tanggal_lahir: string;
  tanggal_input: string;
  gender: string;
};

const Delete = ({ user }: { user: user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleDelete = async () => {
    try {
      setIsloading(true);

      const token = getCookie("token");

      const res = await axios({
        method: "DELETE",
        url: `testapi/user/${user.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        baseURL: "https://cms-admin-v2.ihsansolusi.co.id/",
      });

      if (res.status == 200) {
        setIsloading(false);
        handleModal();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data Berhasil Dihapus",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/users");
          }
        });
      } else {
        setIsloading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${res.data.detail}`,
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
      <button className="btn btn-error btn-sm" onClick={handleModal}>
        Delete
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-large text-center mb-3">
            Are You Sure to Delete ?
          </h3>
          <div className="modal-action mt-5">
            <button
              type="button"
              className="btn mr-2 w-auto"
              onClick={handleModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={handleDelete}
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <div>
                    <span className="loading loading-spinner loading-xs mr-3"></span>
                    Processing ...
                  </div>
                </div>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;

"use client";

import Add from "./add";
import View from "./view";
import Update from "./update";
import Delete from "./delete";

import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Page = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllUser();
  });

  const getAllUser = async () => {
    const token = getCookie("token");

    const res = await axios({
      method: "GET",
      url: "testapi/user",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "json",
      baseURL: "https://cms-admin-v2.ihsansolusi.co.id/",
    });
    setUsers(res.data.data);
  };

  const logoutHandle = () => {
    // delete token
    deleteCookie("token");

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Logout Success",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/");
      }
    });
  };
  return (
    <div className="m-4">
      <div className="mb-2">
        <Add />

        <button className="btn btn-error mb-4" onClick={logoutHandle}>
          Logout
        </button>
      </div>

      <table className="table w-full">
        <thead>
          <tr className="text-center">
            <th>No</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>P / W</th>
            <th>Tanggal Lahir</th>
            <th>Tanggal Input</th>
            <th className="tag-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any, index) => (
            <tr key={index} className="text-center">
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>{user.gender === "l" ? "Pria" : "Wanita"}</td>
              <td>{user.born_date}</td>
              <td>{user.created_at}</td>
              <td>
                <div className="mx-5">
                  <View user={user} />
                  <Update user={user} />
                  <Delete user={user} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { setCookie } from "cookies-next";
import Swal from "sweetalert2";

const Home = () => {
  const [isLoading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      setIsloading(true);
      const response = await axios({
        method: "POST",
        url: "testapi/auth/login",
        data: {
          email,
          password,
        },
        baseURL: "https://cms-admin-v2.ihsansolusi.co.id/",

        headers: {
          "Content-Type": "application/json",
        },

        responseType: "json",
      });

      if (response.status == 200) {
        setIsloading(false);
        // set cookie
        setCookie("token", response.data.token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          path: "/",
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login Success",
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
          text: `${response.data.detail}`,
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
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-700">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered input-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered input-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-primary w-full" type="submit">
              {isLoading ? (
                <div>
                  <span className="loading loading-spinner loading-xs mr-3"></span>
                  Processing ...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;

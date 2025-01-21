import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { properties } from "../../config/properties";

const generateCaptcha = () => {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    captcha += chars[randomIndex];
  }
  return captcha;
};

const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [formSection, setFormSection] = useState("sendOtp");
  const [semail, setEmail] = useState("");
  const [smobile, setMobile] = useState("");
  const [userType, setTrainer] = useState("trainer");
  const [loading, setLoading] = useState(false);
  const [loginUse, setLoginUse] = useState("email");
  const [otp, setOtp] = useState("");
  const [sendOtpData, setSendOtpData] = useState(null);

  const [captcha, setCaptcha] = useState(generateCaptcha()); // Generate the initial CAPTCHA
  const [captchaInput, setCaptchaInput] = useState(""); // User's input for the CAPTCHA

  const handleLogin = async () => {
    setLoading(true);
    let cred = "";
    let loginType = "";
    if (semail && semail !== "") {
      cred = semail;
      loginType = "semail";
    }
    if (smobile && smobile !== "") {
      cred = smobile;
      loginType = "smobile";
    }
    if (!captchaInput) {
      toast.warn("Please fill all fields and the CAPTCHA!");
      setLoading(false);
      return;
    }

    if (captcha !== captchaInput) {
      toast.error("CAPTCHA is incorrect!");
      setCaptcha(generateCaptcha()); // Regenerate CAPTCHA on failure
      setLoading(false);
      return;
    }
    if (!cred || cred === "") {
      toast.error("Emailor mobile is not required");
      setCaptcha(generateCaptcha()); // Regenerate CAPTCHA on failure
      setLoading(false);
    }
    try {
      const { data } = await axios.post(
        `${properties.URLS.BASE_URL_DEV}/api/user/send-otp`,
        {
          cred,
          userType: userType,
          loginType,
        }
      );

      if (data?.response === "success") {
        setLoading(false);
        setFormSection("verifyOtp");
        setSendOtpData(data);
      }
    } catch (error) {
      toast.error("Something Went Wrong!!");
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    try {
      setLoading(true);
      if (!otp && !otp === "") {
        toast.error("OTP is required");
        setLoading(false);
      }

      const { data } = await axios.post(
        `${properties.URLS.BASE_URL_DEV}/api/user/verify-otp`,
        {
          studentId: sendOtpData.data.userId,
          otp,
        }
      );
      if (data?.response === "success") {
        setLoading(false);
        setAuth({ ...data.data });
        toast.success("Login Successful");
        localStorage.setItem("admin", JSON.stringify(data?.data));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      toast.error("Something Went Wrong!!");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex">
        <section style={{ width: "100%" }} className="py-5">
          <div>
            <h1 className="text-white flex justify-center text-4xl">
              Welcome!
            </h1>
          </div>
          <div className="flex justify-center">
            <img
              src={`${process.env.PUBLIC_URL}/images/logicgyan.png`}
              alt="header log"
              className="w-[50%] h-[50%] object-cover"
            />
          </div>
        </section>
        <section style={{ width: "100%" }} className="py-5">
          <div className="box text-white p-3 w-[500px]">
            <div className="text-2xl font-medium text-white mb-3">
              <h1>Login to your logicMitra account</h1>
            </div>
            {formSection === "sendOtp" ? (
              <div className="bg-gray-800 mb-3 p-2 rounded">
                <div className="flex justify-evenly">
                  <p
                    className={`cursor-pointer border-1 border-amber-500 py-1 px-5 rounded ${
                      loginUse === "email" ? "bg-emerald-600" : null
                    } hover:bg-emerald-600`}
                    onClick={() => {
                      setLoginUse("email");
                    }}
                  >
                    Email
                  </p>
                  <p
                    className={`cursor-pointer border-1 border-amber-500 py-1 px-5 rounded ${
                      loginUse === "mobile" ? "bg-emerald-600" : null
                    } hover:bg-emerald-600`}
                    onClick={() => {
                      setLoginUse("mobile");
                    }}
                  >
                    Mobile
                  </p>
                </div>
              </div>
            ) : null}
            {formSection === "sendOtp" ? (
              <div className="space-y-3">
                {loginUse === "email" ? (
                  <div className="space-y-2 mb-3">
                    <p>Email</p>
                    <input
                      required
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={semail}
                      placeholder="Email address"
                      className="form-control input outline-none w-[100%] text-white"
                    />
                  </div>
                ) : null}
                {loginUse === "mobile" ? (
                  <div className="space-y-2 mb-3">
                    <p>Mobile</p>
                    <input
                      required
                      type="mobile"
                      name="mobile"
                      onChange={(e) => setMobile(e.target.value)}
                      value={smobile}
                      placeholder="Mobile Number"
                      className="form-control input outline-none w-[100%] text-white"
                    />
                  </div>
                ) : null}
                {/* Custom CAPTCHA */}
                <div className="space-y-2">
                  <p>Enter the CAPTCHA</p>
                  <div className="flex items-center space-x-3">
                    <span className="bg-gray-800 text-white p-2 rounded-md text-xl font-semibold">
                      {captcha}
                    </span>
                    <button
                      className="text-white underline"
                      onClick={() => setCaptcha(generateCaptcha())}
                    >
                      Refresh
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter the CAPTCHA"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="form-control input outline-none w-[100%] text-white"
                  />
                </div>

                <button
                  className="Add-btn px-3 py-2 rounded-md mt-3"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>
            ) : null}

            {formSection === "verifyOtp" ? (
              <div className="space-y-3">
                {loginUse === "email" ? (
                  <div className="space-y-2 mb-3">
                    <p>OTP</p>
                    <input
                      required
                      type="number"
                      name="otp"
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                      placeholder="Enter OTP"
                      className="form-control input outline-none w-[100%] text-white"
                    />
                  </div>
                ) : null}

                <button
                  className="Add-btn px-3 py-2 rounded-md mt-3"
                  onClick={handleOtpVerification}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Verify"}
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;

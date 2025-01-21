import { useEffect, useState } from "react";
import { useAdd } from "../../hooks/useAdd";
// import { useNavigate } from "react-router-dom";
// import swal from "sweetalert";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";
import Home from "../../Home";

function AddTrainer() {
  const [states, setStates] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  // const [fetchedDataCity, setFetchedDataCity] = useState(false)
  const [citiesData, setCitiesData] = useState();

  const TrainerUrl = "/trainers";
  const initialFormData = {
    userType: "trainer",
    sname: "",
    semail: "",
    smobile: "",
    languages: "",
    experience: "",
    sintro: "",
    sabout: "",
    sgender: "",
    sdob: "",
    scity: "",
    saddress: "",
    levelOfeducation: "",
    passOutYear: "",
    sstate: "",
    scountry: "",
    spincode: "",
    sstatus: "",
    swhatsapp: "",
    sfcm: "",
    slattitude: "",
    slongitude: "",
    sbackgroundUrl: null,
    sprofilepicUrl: null,
    isPopuler: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [Checkbtn, Setcheckbtn] = useState(0);

  // to select the mobile or whatsap using checked input

  const handleChackchange = (e) => {
    Setcheckbtn(e.target.checked);
    if (!Checkbtn) {
      setFormData((prevdata) => ({
        ...prevdata,
        swhatsapp: formData.smobile,
      }));
    } else {
      setFormData((prevdata) => ({
        ...prevdata,
        swhatsapp: "",
      }));
    }
  };

  const handleChangeState = async (state) => {
    await axios
      .post(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
        country: "India",
        state: state,
      })
      .then((res) => {
        // //console.log("res---->", res);
        if (res.status === 200) {
          setCitiesData(res.data.data);
        }
      })
      .catch((err) => {
        setCitiesData([]);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "sstate") {
      handleChangeState(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  //useAdd here
  const [addData] = useAdd("/user/create_user");

  const handleSubmit = (e) => {
    const formdata = new FormData();
    formdata.append("image", formData.sprofilepicUrl);
    formdata.append("banner-image", formData.sbackgroundUrl);
    e.preventDefault();
    addData(formData, TrainerUrl);
  };

  // //console.log(formData);

  // fetching all country , state, and country data for showing on dropdown

  const [Citydata, error1, loading1] = useFetch("/address/city-list", true);

  const [Countrydata, error2, loading2] = useFetch(
    "/address/country-list",
    true
  );

  const [Statedata, error3, loading3] = useFetch("/address/state-list", true);

  useEffect(() => {
    const fetchcitydata = async () => {
      try {
        const res = await axios.get(
          `/address/city-detail?cityID=${formData.scity}`
        );
        const data = res.data;
        // //console.log(data?.data?.state);

        const datastate = Statedata?.data?.filter(
          (elm) => elm.id === data?.data?.state
        );
        // //console.log(datastate);
        const UniquStatename = datastate.map((elm) => elm.title);
        // //console.log(...UniquStatename);

        setFormData((predata) => ({
          ...predata,
          sstate: UniquStatename.toString(),
        }));

        // //console.log(datastate);
      } catch (error) {
        // //console.log(error);
      }
    };

    fetchcitydata();
  }, [formData.scity, Statedata?.data]);

  useEffect(() => {
    async function fetchStates() {
      await axios
        .post(`https://countriesnow.space/api/v0.1/countries/states`, {
          country: "india",
        })
        .then((res) => {
          if (res.status === 200) {
            setStates(res.data.data.states);
            setFetchedData(true);
          }
        })
        .catch((err) => {
          setFetchedData(true);
          setStates([]);
        });
    }

    if (!fetchedData) {
      fetchStates();
    }
  }, [fetchedData]);

  // //console.log(Countrydata, Statedata, Citydata);

  // //console.log(formData);

  return (
    <>
      <Home>
        <div className="w-[100%] pb-5 px-3 mb-16">
          <section className="section py-3">
            <div className="text-xl font-medium text-white  d-flex justify-between items-center">
              <h1> Add Trainer Details</h1>
            </div>
          </section>
          <form
            className="forms-sample w-[100%]  p-4 box"
            onSubmit={handleSubmit}
          >
            <div className=" ">
              <div className="form-group grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div className="">
                  <label className="text-white" htmlFor="exampleInputUsername1">
                    Trainer Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    value={formData.sname}
                    name="sname"
                    placeholder="Your Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label className="text-white" htmlFor="exampleInputUsername1">
                    User Type *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    value={formData.userType}
                    name="userType"
                    placeholder="Trainers Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label className="text-white" htmlFor="exampleInputDOB">
                    Gender *
                  </label>

                  <select
                    className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                    value={formData.sgender}
                    name="sgender"
                    onChange={handleChange}
                    required
                  >
                    <option>Select gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                </div>
                <div className="">
                  <label className="text-white" htmlFor="exampleInputEmail1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    value={formData?.semail}
                    name="semail"
                    placeholder="Your Email"
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label className="text-white" htmlFor="exampleInputMobile">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="Mobile no."
                    maxLength={10}
                    minLength={10}
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    value={formData.smobile}
                    name="smobile"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label className="text-white " htmlFor="exampleInputMobile">
                    <div className="flex gap-2 items-center  ">
                      <p>Whatsapp</p>

                      <input
                        type="checkbox"
                        className="text-xs"
                        checked={Checkbtn}
                        onChange={handleChackchange}
                      />
                      <span className="text-xs text-red-300">
                        {" "}
                        (same as contact no.)
                      </span>
                    </div>
                  </label>
                  <input
                    type="number"
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white"
                    value={formData?.swhatsapp}
                    name="swhatsapp"
                    placeholder="Whatsapp no."
                    maxLength={10}
                    minLength={10}
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label className="text-white" htmlFor="exampleInputMobile">
                    Date Of Birth *
                  </label>
                  <input
                    required
                    type="date"
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    value={formData.sdob}
                    name="sdob"
                    placeholder="Date of birth"
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label className="text-white" htmlFor="exampleInputDOB">
                    Country *
                  </label>

                  <select
                    className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2  py-[10px]"
                    onChange={handleChange}
                    name="scountry"
                    value={formData?.scountry}
                    required
                  >
                    <option> select country</option>
                    {Countrydata?.data?.map((elm) => {
                      return (
                        <>
                          <option value={elm.title}> {elm.title} </option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <div className="">
                  <label className="text-white" htmlFor="exampleInputDOB">
                    State *
                  </label>

                  <select
                    className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2  py-[10px]"
                    onChange={handleChange}
                    name="sstate"
                    value={formData?.sstate}
                    required
                  >
                    <option> select state</option>
                    {states?.map((elm) => {
                      return (
                        <>
                          <option value={elm.name}> {elm.name} </option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <div className="">
                  <label className="text-white" htmlFor="exampleInputDOB">
                    City *
                  </label>

                  <select
                    className="form-select input focus-within:bg-none border-none outline-none focus:bg-none my-2  py-[10px]"
                    onChange={handleChange}
                    name="scity"
                    value={formData?.scity}
                  >
                    <option> select city</option>
                    {citiesData?.map((elm) => {
                      return (
                        <>
                          <option value={elm}> {elm} </option>
                        </>
                      );
                    })}
                  </select>
                </div>

                <div className="">
                  <label className="text-white" htmlFor="exampleInputMobile">
                    Address *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    value={formData.saddress}
                    name="saddress"
                    placeholder="Address"
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label className="text-white" htmlFor="exampleInputMobile">
                    Pincode *
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    value={formData.spincode}
                    name="spincode"
                    placeholder="Pin Code"
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label className="text-white" htmlFor="exampleInputDOB">
                    Status
                  </label>
                  <select
                    onChange={handleChange}
                    value={formData.sstatus}
                    name="sstatus"
                    className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-[10px]"
                  >
                    <option>Select option</option>

                    <option value={1}>Active</option>
                    <option value="blocked">Blocked</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>
                {/* <div className="">
                  <label className="text-white" htmlFor="exampleInputMobile">
                    Longitude
                  </label>
                  <input
                    type="text"
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    value={formData.slongitude}
                    name="slongitude"
                    placeholder="longitude"
                    onChange={handleChange}
                  />
                </div> */}
                {/* <div className="">
                  <label className="text-white" htmlFor="exampleInputMobile">
                    Lattitude
                  </label>
                  <input
                    type="text"
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    value={formData.slattitude}
                    name="slattitude"
                    placeholder="Lattitude"
                    onChange={handleChange}
                  />
                </div> */}

                <div className="">
                  <label className="text-white" htmlFor="exampleInputMobile">
                    Profile Pic
                  </label>
                  <input
                    type="file"
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    name="sprofilepicUrl"
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label className="text-white" htmlFor="exampleInputMobile">
                    Banner Image
                  </label>
                  <input
                    type="file"
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    name="sbackgroundUrl"
                    onChange={handleChange}
                  />
                </div>

                <div className="">
                  <label className="text-white" htmlFor="exampleInputMobile">
                    Experience
                  </label>
                  <input
                    type="number"
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    value={formData.experience}
                    name="experience"
                    placeholder="Experience"
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label className="text-white" htmlFor="exampleInputMobile">
                    Languages
                  </label>
                  <input
                    type="text"
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    value={formData.languages}
                    name="languages"
                    placeholder="Language"
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label className="text-white" htmlFor="exampleInputMobile">
                    Level Of Education *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    value={formData.levelOfeducation}
                    name="levelOfeducation"
                    placeholder="Level of Education"
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label className="text-white" htmlFor="exampleInputMobile">
                    Pass Out Year *
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                    value={formData.passOutYear}
                    name="passOutYear"
                    placeholder="Pass out year"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-sm-4">
                  <label className="text-white" htmlFor="exampleInputDOB">
                    Populer
                  </label>
                  <select
                    onChange={handleChange}
                    name="isPopuler"
                    value={formData.isPopuler}
                    className="form-select input focus-within:bg-none focus:border-none outline-none w-[100%] text-white py-[10px]"
                  >
                    <option>Select option</option>
                    <option value={true}>Popular</option>
                    <option value={false}>Not Popular</option>
                  </select>
                </div>
              </div>
              <div className="">
                <label className="text-white" htmlFor="exampleInputMobile">
                  Intro
                </label>
                <textarea
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                  value={formData.sintro}
                  name="sintro"
                  placeholder="Intro"
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label className="text-white" htmlFor="exampleInputMobile">
                  About
                </label>
                <textarea
                  className="form-control input focus-within:bg-none focus:border-none outline-none w-[100%] text-white "
                  value={formData.sabout}
                  name="sabout"
                  placeholder="About"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                type="submit"
                className=" sm:px-4  px-5 py-2 Add-btn rounded-md "
              >
                Submit
              </button>
              <button
                type="reset"
                className="sm:px-4  px-5 py-2 Cancel-btn rounded-md "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Home>
    </>
  );
}

export default AddTrainer;

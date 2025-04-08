import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

function Manager() {
  const [form, setForm] = useState({ "sitename": "", "username": "", "password": "" })
  const [passwordArray, setPasswordArray] = useState([])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    //from localstorage
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }



  }, [])





  //save to localstorage

  const savePassword = () => {
    if(form.sitename.length > 0 && form.password.length > 0 && form.username.length > 0){
 
    console.log("password saved :", form)
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
    setForm({ "sitename": "", "username": "", "password": "" })
    toast('Password saved!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
  }

    else{
      toast.warn('Password not saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });
    }
  }




  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });

  }

  //edit in localstorage
  const editPassword = (id) => {
    setPasswordArray(passwordArray.filter((obj) => obj.id !== id))

    setForm(passwordArray.filter(obj => obj.id === id)[0])



    console.log("editing password with id ", id)

  }


  //delete in localstorage
  const deletePassword = (id) => {
    setPasswordArray(passwordArray.filter((obj) => obj.id !== id))
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((obj) => obj.id !== id)))


    console.log("password deleted with id ", id)
    toast('Password Deleted!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      // transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#7af3aa,transparent)]"></div>
      </div>

      <div className="container mx-auto my-4  p-2 md:w-[75%] ">
        <h1 className="font-bold text-4xl text-center">
          <span className="text-green-600"> &lt;</span>Pass
          <span className="text-green-600 ">OP/&gt;</span>
        </h1>
        <p className="text-center font-semibold text-xl text-green-800">
          Your Own Password Manager
        </p>
        <div className="p-4 space-y-4 flex flex-col items-center">
          <input
            className=" outline-none border border-green-500 w-full rounded-full px-4 py-1"
            type="text"
            placeholder="Enter Sitename"
            name="sitename"
            value={form.sitename}
            onChange={handleChange}
          />

          <div className="flex flex-col  sm:flex-row gap-4 w-full ">
            <input
              className=" outline-none border  w-full border-green-500 rounded-full px-4 py-1 "
              type="text"
              placeholder="Enter Username"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
            <input
              className=" outline-none border  w-full border-green-500 rounded-full px-4 py-1"
              type="text"
              placeholder="Enter Password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button  className=" flex items-center justify-center border border-gray-600  bg-green-500 rounded-full gap-2 px-8 py-1 text-xl" onClick={savePassword}>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            >
            </lord-icon>
            Save
          </button>

        </div>
        <div className="passwords" >
          <h2 className="text-2xl font-semibold py-2">Your Passwords :</h2>
          {passwordArray.length === 0 ? <div>No Password to Show</div> :

            <table className="w-full  table-auto rounded-md ">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-2">Sitename</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">

                {passwordArray.map((item) => {
                  return (
                    <tr key={item.id} >
                      <td className=" max-w-1/3 py-2 border border-white text-center ">
                        <div className="flex  items-center justify-center">
                          <a className=" break-all " title="Visit Website" href={item.sitename} target="_blank">{item.sitename}</a>
                          <span title="Copy Website" onClick={() => { copyText(item.sitename) }} className="hidden sm:block material-symbols-outlined mx-4 cursor-pointer">

                            content_copy

                          </span>
                        </div>
                      </td>


                      <td className="  py-2 border border-white text-center ">

                        <div className="flex items-center justify-center">
                          {item.username}
                          <span onClick={() => { copyText(item.username) }} title="Copy Username" className=" hidden sm:block material-symbols-outlined mx-4 cursor-pointer">

                            content_copy

                          </span>
                        </div>

                      </td>


                      <td className=" py-2 border border-white text-center ">
                        <div className="flex items-center justify-center">
                          {item.password}
                          <span className="material-symbols-outlined mx-4 cursor-pointer hidden sm:block " onClick={() => { copyText(item.password) }} title="Copy Password">

                            content_copy

                          </span>
                        </div>


                      </td>

                      <td className="  py-2 border border-white text-center">
<div className=" flex justify-center items-center">
                        <span title="Edit" className="material-symbols-outlined mx-4 cursor-pointer" onClick={() => { editPassword(item.id) }}  >
                          edit
                        </span>
                        <span title="Delete" className="cursor-pointer" onClick={() => {confirm("Are you sure?") && deletePassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}>
                          </lord-icon>
                        </span></div>
                      </td>
                    </tr>
                  )
                })}

              </tbody>
            </table>}
        </div>

      </div>

    </>
  );
}

export default Manager;

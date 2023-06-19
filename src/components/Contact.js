import React, { useState } from 'react'

export default function Contact() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  });


  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      address,
      message
    } = user
    if (name &&
      email &&
      phone &&
      address &&
      message) {
      const res = await fetch(
        "https://rabbitworld-9b092-default-rtdb.firebaseio.com/reactForm.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            address,
            message
          })
        }

      );
      if (res) {
        setUser({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: ""
        })
        alert("Data Stored Successfully !")
      }

    } else {
      alert('please fill all data')
    }


  };


  return (
    <div>
      <div className=" p-4 mt-4 m-2 bg-light rounded-4 shadow ">
        <div className="">
          <h2 className='font-monospace text-decoration-underline fw-bold'>Contact Us</h2>
        </div>
        <form className=" form" method="POST">
          <div className='d-flex flex-column'>
            <input type="text" value={user.name} onChange={getUserData} name="name" placeholder='Enter Your Name' className='form-control mt-3' required />

            <input type="email" value={user.email} onChange={getUserData} name="email" placeholder='Enter Your email' className='form-control mt-3' required />
          </div>

          <div className='d-flex mt-3 flex-column'>
            <input type="number" value={user.phone} name="phone" onChange={getUserData} placeholder='Enter Mobile  Number' className='form-control mt-3' required />

            <input type="text" value={user.address} name="address" onChange={getUserData} placeholder='Enter Address' className='form-control mt-3' required />
          </div>

          <div className="d-flex mt-3 flex-column">
            <textarea id="" cols="30" rows="10" name="message" className='form-control' value={user.message} onChange={getUserData} placeholder='Enter Your Message' required> </textarea>
          </div>
          <div className="mt-3">
            <button className="submit btn  btn-md btn-danger shadow  rounded-5 ps-4 pe-4" onClick={postData}>submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

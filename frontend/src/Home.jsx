import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


const Home = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChnage = (event) => {
    setInputUser({
      ...inputUser, 
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate fields
    if (inputUser.name.trim() === "" || inputUser.email.trim() === "" || inputUser.password.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (!inputUser.email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    // console.log(inputUser);
    const res = await axios.post("https://crudbase.adaptable.app/createuser", inputUser);
    fetchAllUser();
    // Clear input values after submission
    setInputUser({ name: "", email: "", password: "" });
  };

  // data fetching all
  const [userData, setUserData] = useState([]);
  const fetchAllUser = async () => {
    const res = await axios.get("https://crudbase.adaptable.app/readalluser");
    //console.log(res);
    setUserData(res.data);
  };
  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleDelete = async (id) => {
    const res = await axios.delete(`https://crudbase.adaptable.app/delete/${id}`);
    if (res.status === 200) {
      fetchAllUser();
    }
  };

  return (
    <>
    <div className="w-2/3 mx-auto ">
      {/* creating form */}
      <form onSubmit={handleSubmit}>
      <div className="flex items-center">
        <h1 className="second text-lg">Create User</h1>
        <div className="loader ml-2"></div>
      </div>

       <div className="flex-column">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent rounded border-2 border-gray-300"
            placeholder="Enter name"
            required
            value={inputUser.name}
            onChange={handleChnage}
          />
        </div>
        <div className="flex-column">
          <label>Email</label>
          <input
            type="text"
            name="email"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent rounded border-2 border-gray-300"
            placeholder="Enter email "
            required
            value={inputUser.email}
            onChange={handleChnage}
          />
        </div>
        <div className="flex-column">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent rounded border-2 border-gray-300"
            placeholder="Enter Password "
            required
            value={inputUser.password}
            onChange={handleChnage}
          />
        </div>

        <div className="flex justify-center my-4">
          <button type="submit" className="px-4 py-2 button">
            Add User
          </button>
        </div>
      </form>

      <div className="overflow-x-auto shadow-md">
        <table className="w-full text-lg text-center text-gray-500">
          <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-2 md:px-4 py-2 md:py-3">
                SN.
              </th>
              <th scope="col" className="px-2 md:px-4 py-2 md:py-3">
                Name
              </th>
              <th scope="col" className="hidden md:table-cell px-2 md:px-4 py-2 md:py-3">
                Email
              </th>
              <th scope="col" className="hidden md:table-cell px-2 md:px-4 py-2 md:py-3">
                Password
              </th>
              <th scope="col" className="px-2 md:px-4 py-2 md:py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, i) => (
              <tr key={item._id} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td
                  className="px-2 md:px-4 py-2 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </td>
                <td
                  className="px-2 md:px-4 py-2 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.name}
                </td>
                <td className="hidden md:table-cell px-2 md:px-4 py-2 md:py-4"> {item?.email}</td>
                <td className="hidden md:table-cell px-2 md:px-4 py-2 md:py-4"> {item?.password}</td>
                <td className="px-2 md:px-4 py-2 md:py-4">
                  <div className="flex flex-col md:flex-row md:gap-x-2 justify-center">
                    <NavLink
                      to={`/readuser/${item._id}`}
                      className="font-medium text-green-600 dark:text-blue-500 hover:underline mb-2 md:mb-0"
                    >
                      Read
                    </NavLink>
                    <NavLink
                      to={`/updateuser/${item._id}`}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline mb-2 md:mb-0"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
    </div>
    </>
  );
};

export default Home;

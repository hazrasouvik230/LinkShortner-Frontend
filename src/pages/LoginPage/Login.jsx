// import React, { useState } from "react";
// import styles from "./Login.module.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { baseUrl } from "../../Urls";

// const Login = ({ setUser }) => {
//   const [state, setState] = useState("Signup");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     ph: "",
//     password: "",
//     confirmpassword: "",
//   });
//   const [errors, setErrors] = useState({});

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (state === "Signup") {
//       if (!formData.name.trim()) newErrors.name = "Name is required";
//       if (!formData.ph.trim()) newErrors.ph = "Mobile number is required";
//       if (formData.password !== formData.confirmpassword) {
//         newErrors.confirmpassword = "Passwords do not match";
//       }
//     }
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.password.trim()) newErrors.password = "Password is required";

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       setErrors({});
//       try {
//         if (state === "Signup") {
//           const response = await axios.post(
//             `${baseUrl}/api/user/signup`,
//             formData
//           );
//           toast.success(response.data.message, {
//             onClose: () => navigate("/dashboard"),
//           });
//         } else {
//           const response = await axios.post(`${baseUrl}/api/user/login`, {
//             email: formData.email,
//             password: formData.password,
//           });
//           toast.success(response.data.message, {
//             onClose: () => navigate("/dashboard"),
//           });
//           localStorage.setItem("token", response.data.token);

//           // Fetch the user details after login
//           const userResponse = await axios.get(`${baseUrl}/api/user/me`, {
//             headers: { Authorization: `Bearer ${response.data.token}` },
//           });
//           console.log("Logged-in User Details:", userResponse.data.user);
//           setUser(userResponse.data.user);
//         }
//         setFormData({
//           name: "",
//           email: "",
//           ph: "",
//           password: "",
//           confirmpassword: "",
//         });
//       } catch (error) {
//         if (error.response) {
//           toast.error(error.response.data.error);
//         } else {
//           toast.error("An error occurred. Please try again.");
//         }
//       }
//     }
//   };

//   return (
//     <div className={styles.loginContainer}>
//       <ToastContainer position="top-right" autoClose={2000} />
//       <div className={styles.leftContainer}>
//         <img src="./Login.png" alt="" />
//         <div>
//           <img src="./Logo.png" alt="" className={styles.logo} />
//         </div>
//       </div>

//       <div className={styles.rightContainer}>
//         <div className={styles.navbar}>
//           <div
//             className={`${styles.navItem} ${
//               state === "Signup" ? styles.active : ""
//             }`}
//             onClick={() => setState("Signup")}
//           >
//             SignUp
//           </div>
//           <div
//             className={`${styles.navItem} ${
//               state === "Login" ? styles.active : ""
//             }`}
//             onClick={() => setState("Login")}
//           >
//             Login
//           </div>
//         </div>

//         <h2>{state === "Signup" ? "Join us Today!" : "Login"}</h2>
//         <form onSubmit={handleSubmit}>
//           {state === "Signup" && (
//             <>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//               {errors.name && (
//                 <span className={styles.error}>{errors.name}</span>
//               )}
//             </>
//           )}

//           <input
//             type="email"
//             name="email"
//             id="email"
//             placeholder="Email Id"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {errors.email && <span className={styles.error}>{errors.email}</span>}

//           {state === "Signup" && (
//             <>
//               <input
//                 type="number"
//                 name="ph"
//                 id="ph"
//                 placeholder="Mobile no."
//                 value={formData.ph}
//                 onChange={handleChange}
//               />
//               {errors.ph && <span className={styles.error}>{errors.ph}</span>}
//             </>
//           )}

//           <input
//             type="password"
//             name="password"
//             id="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           {errors.password && (
//             <span className={styles.error}>{errors.password}</span>
//           )}

//           {state === "Signup" && (
//             <>
//               <input
//                 type="password"
//                 name="confirmpassword"
//                 id="confirmpassword"
//                 placeholder="Confirm Password"
//                 value={formData.confirmpassword}
//                 onChange={handleChange}
//               />
//               {errors.confirmpassword && (
//                 <span className={styles.error}>{errors.confirmpassword}</span>
//               )}
//             </>
//           )}

//           <button type="submit" className={styles.registerButton}>
//             {state === "Signup" ? "Register" : "Login"}
//           </button>
//         </form>
//         {state === "Signup" ? (
//           <p>
//             Already have an account?{" "}
//             <span onClick={() => setState("Login")}>Login</span>
//           </p>
//         ) : (
//           <p>
//             Don’t have an account?{" "}
//             <span onClick={() => setState("Signup")}>SignUp</span>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../Urls";

const Login = ({ setUser }) => {
  const [state, setState] = useState("Signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ph: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (state === "Signup") {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.ph.trim()) newErrors.ph = "Mobile number is required";
      if (formData.password !== formData.confirmpassword) {
        newErrors.confirmpassword = "Passwords do not match";
      }
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) newErrors.password = "Password is required";

    return newErrors;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //   } else {
  //     setErrors({});
  //     try {
  //       if (state === "Signup") {
  //         const response = await axios.post(
  //           `${baseUrl}/api/user/signup`,
  //           formData
  //         );
  //         toast.success(response.data.message);
  //       } else {
  //         const response = await axios.post(`${baseUrl}/api/user/login`, {
  //           email: formData.email,
  //           password: formData.password,
  //         });
  //         toast.success(response.data.message);
  //         localStorage.setItem("token", response.data.token);

  //         // Fetch the user details after login
  //         const userResponse = await axios.get(`${baseUrl}/api/user/me`, {
  //           headers: { Authorization: `Bearer ${response.data.token}` },
  //         });
  //         console.log("Logged-in User Details:", userResponse.data.user);
  //         setUser(userResponse.data.user);
  //       }
  //       setFormData({
  //         name: "",
  //         email: "",
  //         ph: "",
  //         password: "",
  //         confirmpassword: "",
  //       });
  //     } catch (error) {
  //       if (error.response) {
  //         toast.error(error.response.data.error);
  //       } else {
  //         toast.error("An error occurred. Please try again.");
  //       }
  //     }
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        let response;
        if (state === "Signup") {
          response = await axios.post(`${baseUrl}/api/user/signup`, formData);
          toast.success(response.data.message);
        } else {
          response = await axios.post(`${baseUrl}/api/user/login`, {
            email: formData.email,
            password: formData.password,
          });
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.token);
        }
  
        // Fetch user details immediately after login/signup
        const userResponse = await axios.get(`${baseUrl}/api/user/me`, {
          headers: { Authorization: `Bearer ${response.data.token}` },
        });
  
        console.log("Logged-in User Details:", userResponse.data.user);
        setUser(userResponse.data.user);
  
        // Redirect to dashboard **AFTER** setting user
        navigate("/dashboard");
  
        // Reset form fields
        setFormData({
          name: "",
          email: "",
          ph: "",
          password: "",
          confirmpassword: "",
        });
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    }
  };
  
  return (
    <div className={styles.loginContainer}>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className={styles.leftContainer}>
        <img src="./Login.png" alt="" />
        <div>
          <img src="./Logo.png" alt="" className={styles.logo} />
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.navbar}>
          <div
            className={`${styles.navItem} ${
              state === "Signup" ? styles.active : ""
            }`}
            onClick={() => setState("Signup")}
          >
            SignUp
          </div>
          <div
            className={`${styles.navItem} ${
              state === "Login" ? styles.active : ""
            }`}
            onClick={() => setState("Login")}
          >
            Login
          </div>
        </div>

        <h2>{state === "Signup" ? "Join us Today!" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {state === "Signup" && (
            <>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </>
          )}

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Id"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}

          {state === "Signup" && (
            <>
              <input
                type="number"
                name="ph"
                id="ph"
                placeholder="Mobile no."
                value={formData.ph}
                onChange={handleChange}
              />
              {errors.ph && <span className={styles.error}>{errors.ph}</span>}
            </>
          )}

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}

          {state === "Signup" && (
            <>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm Password"
                value={formData.confirmpassword}
                onChange={handleChange}
              />
              {errors.confirmpassword && (
                <span className={styles.error}>{errors.confirmpassword}</span>
              )}
            </>
          )}

          <button type="submit" className={styles.registerButton}>
            {state === "Signup" ? "Register" : "Login"}
          </button>
        </form>
        {state === "Signup" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login</span>
          </p>
        ) : (
          <p>
            Don’t have an account?{" "}
            <span onClick={() => setState("Signup")}>SignUp</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
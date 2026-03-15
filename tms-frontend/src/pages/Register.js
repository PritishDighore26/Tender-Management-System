import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import "./Register.css";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName:"",
    middleName:"",
    lastName:"",
    mobile:"",
    email:"",
    password:"",
    confirmPassword:"",
    photo:null
  });

  const [message,setMessage] = useState("");
  const [loading,setLoading] = useState(false);

  const set = (key) => (e) => {

    if(key === "photo"){
      setForm({...form, photo:e.target.files[0]});
    }
    else{
      setForm({...form, [key]:e.target.value});
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(form.mobile.length !== 10){
      setMessage("Mobile number must be 10 digits");
      return;
    }

    if(form.password !== form.confirmPassword){
      setMessage("Password and Confirm Password must match");
      return;
    }

    if(form.photo){

      if(form.photo.size > 1024*1024){
        setMessage("Photo must be less than 1MB");
        return;
      }

      const allowed = ["image/jpeg","image/png","image/jpg"];

      if(!allowed.includes(form.photo.type)){
        setMessage("Only JPG, JPEG, PNG allowed");
        return;
      }
    }

    const formData = new FormData();

    Object.keys(form).forEach(key=>{
      formData.append(key, form[key]);
    });

    setLoading(true);

    try{

      const result = await registerUser(formData);

      setMessage(result);

      if(result.includes("Successfully")){
        setTimeout(()=>navigate("/login"),1500);
      }

    }
    catch{
      setMessage("Registration failed");
    }
    finally{
      setLoading(false);
    }
  };

  return (

    <div className="auth-page">

      <div className="auth-card wide">

        <div className="auth-brand">
          <span className="brand-icon">⬡</span>
          <h1>TMS Portal</h1>
          <p>Tender Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">

          <h2>Create Account</h2>

          {message && (
            <div className={`alert ${message.includes("Successfully") ? "alert-success":"alert-error"}`}>
              {message}
            </div>
          )}

          <div className="form-grid-3">

            <div className="form-group">
              <label>First Name</label>
              <input type="text" value={form.firstName} onChange={set("firstName")} required />
            </div>

            <div className="form-group">
              <label>Middle Name</label>
              <input type="text" value={form.middleName} onChange={set("middleName")} />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input type="text" value={form.lastName} onChange={set("lastName")} required />
            </div>

          </div>

          <div className="form-grid-2">

            <div className="form-group">
              <label>Mobile Number</label>
              <input type="tel" value={form.mobile} onChange={set("mobile")} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={set("email")} required />
            </div>

          </div>

          <div className="form-grid-2">

            <div className="form-group">
              <label>Password</label>
              <input type="password" value={form.password} onChange={set("password")} required />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" value={form.confirmPassword} onChange={set("confirmPassword")} required />
            </div>

          </div>

          <div className="form-group">
            <label>Photo (JPG/PNG under 1MB)</label>
            <input type="file" accept=".jpg,.jpeg,.png" onChange={set("photo")} required />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="auth-link">
            Already registered? <Link to="/login">Sign in</Link>
          </p>

        </form>

      </div>

    </div>
  );
}
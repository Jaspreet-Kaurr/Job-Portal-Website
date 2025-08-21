import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });



  const [errors, setErrors] = useState({}); // 👈 to store inline errors


  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error when typing
  };


  // ✅ simple validation (no empty fields)
  const validateForm = () => {
    let newErrors = {};   // Object - not have length property .
    if (!input.email.trim()) newErrors.email = "Email is required";
    if (!input.password.trim()) newErrors.password = "Password is required";
    if (!input.role) newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;  // If it’s 0, there are no failing fields (empty newErrors obj) → the form is valid.
//     ⚠️ Common confusion:
// setErrors is a function. setErrors.length would be “number of parameters the function is declared with” (which is 1), not the number of errors. Don’t use that.
// errors.length also doesn’t work because errors is an object, not an array. Objects don’t have .length. You must use Object.keys(errors).length.
  };


  const submitHandler = async (e) => {
    e.preventDefault();


    if (!validateForm()) return; // ⛔ stop if empty fields
    // true → proceed with submit (make API call).
// false → stop submission (if (!validateForm()) return;) and let the UI show errors.


    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // protect route
  useEffect(() => {
    if (user) navigate("/");
  }, []);


  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>

          {/* Email */}
          <div className='my-2'>
            <Label>Email *</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="xxxxx@gmail.com"
              className="mt-2"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className='my-2'>
            <Label>Password *</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="bfe$#ttgger*&"
              className="mt-2"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Role */}
          <div className='my-2'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  id="student"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Employee</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="recruiter"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>

          {/* Button */}
          {
            loading
              ? <Button className="w-full my-4" disabled>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                </Button>
              : <Button type="submit" className="w-full my-4">Login</Button>
          }

          <span className='text-sm'>
            Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Login






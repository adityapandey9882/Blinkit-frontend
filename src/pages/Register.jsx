import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {
    const [data,setData] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : ""
    })

    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e)=>{
        const { name, value } = e.target
 
        setData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })
    }

    const validateValue = Object.values(data).every(el => el)
    
    const handleSubmit = async(e) =>{
        e.preventDefault()    // prevent from page refresh
        
        if(data.password !== data.confirmPassword){
            toast.error(
                "password and confirm password must be same"
            )
            return
        }
        
        try{
            const response = await Axios({
                ...SummaryApi.register,
                data : data
            })

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    name : "",
                    email : "",
                    password : "",
                    confirmPassword : "",
                })
                navigate("/login")
            }

        console.log("response",response)
        } catch(error) {
            AxiosToastError(error)
        }

    }

  return (
    <section className='w-full container mx-auto px-2'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
            <p>Welcome to Binkeyit</p>

            <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label htmlFor='name'>Name : </label>
                    <input
                    type='text'
                    id='name'
                    autoFocus
                    className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
                    name='name'
                    placeholder='Enter your name'
                    value={data.name}
                    onChange={handleChange}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='email'>Email : </label>
                    <input
                    type='email'
                    id='email'
                    className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
                    name='email'
                    placeholder='Enter your email'
                    value={data.email}
                    onChange={handleChange}
                    />
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='password'>Password : </label>
                    <div className='bg-blue-50 border p-2 rounded flex items-center focus-within:border-primary-200'>
                        <input
                        type={showPassword ? 'text' : "password"}
                        id='password'
                        className='w-full outline-none '
                        name='password'
                        placeholder='Enter your password'
                        value={data.password}
                        onChange={handleChange}
                        />
                        <div onClick={(prev)=>setShowPassword(prev => !prev)} className='cursor-pointer'>
                            {
                                showPassword ? (
                                    <IoEyeSharp/>
                                ) : (
                                    <FaEyeSlash/>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='grid gap-1'>
                    <label htmlFor='confirmPassword'>Confirm Password : </label>
                    <div className='bg-blue-50 border p-2 rounded flex items-center focus-within:border-primary-200'>
                        <input
                        type={showConfirmPassword ? 'text' : "password"}
                        id='confirmPassword'
                        className='w-full outline-none '
                        name='confirmPassword'
                        placeholder='Enter your confirm password'
                        value={data.confirmPassword}
                        onChange={handleChange}
                        />
                        <div onClick={(prev)=>setShowConfirmPassword(prev => !prev)} className='cursor-pointer'>
                            {
                                showConfirmPassword ? (
                                    <IoEyeSharp/>
                                ) : (
                                    <FaEyeSlash/>
                                )
                            }
                        </div>
                    </div>

                </div>
            <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded my-3 tracking-wider`}>Register</button>
            </form>

            <p>
                Already have account ? <Link to={"/login"}
                className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
            </p>
        </div>
    </section>
  )
}

export default Register
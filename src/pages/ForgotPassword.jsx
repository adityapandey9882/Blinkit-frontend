import React, { useState } from 'react'
// import { FaEyeSlash } from "react-icons/fa";
// import { IoEyeSharp } from "react-icons/io5";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from 'react-router-dom';


const ForgotPassword = () => {
    const [data,setData] = useState({
        email : "",
    })

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
        
        try{
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data : data
            })

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/verification-otp",{
                    state : data
                })
                setData({
                    email : "",
                })
              
            }

        console.log("response",response)
        } catch(error) {
            AxiosToastError(error)
        }

    }

  return (
    <section className='w-full container mx-auto px-2'>
        <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
            <p className='font-semibold text-lg mb-2'>Forgot Password</p>
            <form className='grid gap-4 ' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label htmlFor='email'>Email : </label>
                    <input
                    type='email'
                    id='email'
                    className='bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200'
                    name='email'
                    autoFocus
                    placeholder='Enter your email'
                    value={data.email}
                    onChange={handleChange}
                    />
                </div>
              
            <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded my-3 tracking-wider`}>Send Otp</button>
            </form>

            <p>
                Already hava account ? <Link to={"/Login"}
                className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
            </p>
        </div>
    </section>
  )
}

export default ForgotPassword 
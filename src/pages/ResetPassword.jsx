
import React, { useEffect, useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';


const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data,setData] = useState({
        email : "",
        newPassword : "",
        confirmPassword : ""
    })

    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const validateValue = Object.values(data).every(el => el)


    useEffect(()=>{
        if(!(location?.state?.data?.success)){
            navigate('/')
        }
        
        if(location?.state?.email){
            setData((prev)=>{
                return {
                    ...prev,
                    email :  location?.state?.email
                }
            })
        }
    },[])

    const handleChange = (e)=>{
        const { name, value } = e.target
 
        setData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })
    }

    console.log("data reset password",data)

    const handleSubmit = async(e) =>{
        e.preventDefault()    // prevent from page refresh

        if(data.newPassword !== data.confirmPassword){
            toast.error("New password and confirm password must be same. ")
            return
        }
        
        try{
            const response = await Axios({
                ...SummaryApi.resetPassword,
                data : data
            })

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate('/login')
                setData({
                    email : "",
                    newPassword : "",
                    confirmPassword : ""
                })
              
            }

        } catch(error) {
            AxiosToastError(error)
        }

    }

  return (
    <section className='w-full container mx-auto px-2'>
    <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-semibold text-lg mb-2'>Enter Your Password</p>
        <form className='grid gap-4 ' onSubmit={handleSubmit}>
            <div className='grid gap-1'>
                <label htmlFor='newPassword'>New Password : </label>
                    <div className='bg-blue-50 border p-2 rounded flex items-center focus-within:border-primary-200'>
                        <input
                        type={showPassword ? 'text' : "password"}
                        id='password'
                        className='w-full outline-none '
                        name='newPassword'
                        placeholder='Enter your new password'
                        value={data.newPassword}
                        onChange={handleChange}
                        />
                        <div onClick={()=>setShowPassword(prev => !prev)} className='cursor-pointer'>
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
                        id='password'
                        className='w-full outline-none '
                        name='confirmPassword'
                        value={data.confirmPassword}
                        placeholder='Enter your comfirm password'
                        onChange={handleChange}
                        />
                        <div onClick={()=>setShowConfirmPassword(prev => !prev)} className='cursor-pointer'>
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
        <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded my-3 tracking-wider`}>Change Password</button>
        </form>

        <p>
            Already hava account ? <Link to={"/Login"}
            className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
        </p>
    </div>
</section>
  )
}

export default ResetPassword
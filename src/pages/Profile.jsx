import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaCircleUser } from "react-icons/fa6";
import UserProfileAvatartEdit from '../components/UserProfileAvatartEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';


const Profile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit,setProfileAvatarEdit] = useState(false)
    const [userData,setUserData] = useState({
        name : user.name,
        email : user.email,
        mobile : user.mobile,
    })

    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        setUserData({
            name : user.name,
            email : user.email,
            mobile : user.mobile,
        })
    },[user])    

    const handleOnChange = (e)=>{
        const { name, value } = e.target 

        setUserData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data : userData
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }

        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
    } 

    return (
    <div className='p-4'>
        {/* Profile upload and display image */}
        <div className='w-20 h-20 bg-red-500 flex items-center justify-center 
        rounded-full overflow-hidden drop-shadow-lg'>
            {
                user.avatar ? (
                    <img
                     alt={user.name}
                     src={user.avatar}
                     className='w-full h-full'
                    />
                ) : (
                  <FaCircleUser size={60}/>
                )
            }
        </div>
        <button onClick={()=>setProfileAvatarEdit(true)} className='text-sm 
        min-w-20 border border-primary-100 hover:border-primary-200 
        hover:bg-primary-100 rounded-full px-3 py-1 mt-3'>
            Edit
        </button>
        {
            openProfileAvatarEdit && (
                <UserProfileAvatartEdit close={()=>setProfileAvatarEdit(false)}/>
            )
        }
        {/* name, mobile, email, change Password */}
        <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
            <div className='grid'>
                <label>Name</label>
                <input
                type='text'
                placeholder='Enter your name'
                className='p-2 bg-blue-50 outline-none border
                focus-within:border-primary-200 rounded'
                value={userData.name}
                name='name'
                onChange={handleOnChange}
                required
                />
            </div>
            <div className='grid'>
                <label htmlFor='email'>Email</label>
                <input
                type='email'
                id='email'
                placeholder='Enter your Email'
                className='p-2 bg-blue-50 outline-none border
                focus-within:border-primary-200 rounded'
                value={userData.email}
                name='email'
                onChange={handleOnChange}
                required
                />
            </div>
            <div className='grid'>
                <label htmlFor='mobile'>Mobile</label>
                <input
                type='number'
                id='mobile'
                placeholder='Enter your mobile number'
                className='p-2 bg-blue-50 outline-none border
                focus-within:border-primary-200 rounded'
                value={userData.mobile}
                name='mobile'
                onChange={handleOnChange}
                required
                />
            </div>

            <button className='border px-4 py-2 font-semibold  hover:bg-primary-100 border-primary-100 text-primary-200
            hover:text-neutral-800 rounded'>
                {
                    loading ? "Loading..." : "Submit"
                }

            </button>
        </form>
    </div>
  )
}

export default Profile
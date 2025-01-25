import React, { useState } from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import { useDispatch,useSelector } from 'react-redux'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { updateAvatar } from '../store/userSlice'
import { IoClose } from "react-icons/io5";
import toast from 'react-hot-toast'


const UserProfileAvatartEdit = ({close}) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    const handleUploadAvatarImage = async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return 
        }
        const formData = new FormData()
        formData.append('avatar',file)  //updateAvatar
        
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.uplaodAvatar,
                data : formData
            })
            const { data : responseData} = response
            if(responseData.success){
                toast.success(responseData.message)
            }
            dispatch(updateAvatar(responseData.data.avatar))
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        } 
    }

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 opacity-95 p-4 flex items-center justify-center'>
            <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
                <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
                    <IoClose size={20}/>
                </button>
                <div className='w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
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
                <form onSubmit={handleSubmit}>
                    <label htmlFor="uploadProfile">
                        <div className='border border-primary-200 
                        hover:bg-primary-200 px-4 py-1 rounded text-sm my-2 cursor-pointer'>
                            {
                                loading ? "Loading..." : "Upload"
                            }
                        </div>
                        <input onChange={handleUploadAvatarImage} type='file' id='uploadProfile' className='hidden'/>
                    </label>
                </form>
            </div>
    </section>
  )
}

export default UserProfileAvatartEdit
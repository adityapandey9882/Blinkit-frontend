import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { RxExternalLink } from "react-icons/rx";
import isAdmin from '../utils/isAdmin'


const UserMenu = ({close}) => {
    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async()=>{
      try {
        const response = await Axios({
          ...SummaryApi.logout
        })

        if(response.data.success){
          if(close){
            close()
          }
          dispatch(logout())
          localStorage.clear()
          toast.success(response.data.message)
          navigate('/')
        }
      } catch(error) {
        AxiosToastError(error)
      }
    }

    const handleClose = ()=>{
      if(close){
        close()
      }
    }
  return (
    <div>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm flex items-center gap-2'>
          <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile} <span className='text font-semibold text-red-500'>{user.role === 'ADMIN'? "(Admin)" : ""}</span> </span>
          <Link onClick={handleClose} to={'/dashboard/profile'} className='hover:text-primary-200'>
            <RxExternalLink size={15}/>
          </Link>
        </div>
        <Divider/>
        <div className='text-sm grid gap-2'>

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/category"} className='p-2
                hover:bg-orange-200 py-1'>Category</Link>
                
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/subcategory"} className='p-2
                hover:bg-orange-200 py-1'>Sub Category</Link>           
                )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/upload-product"} className='p-2
                hover:bg-orange-200 py-1'>Upload Product </Link>
                )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleClose} to={"/dashboard/product"} className='p-2
                hover:bg-orange-200 py-1'>Product</Link>
                )
            }


            
            <Link onClick={handleClose} to={"/dashboard/myorder"} className='p-2
             hover:bg-orange-200 py-1'>My Order</Link>
           
            <Link onClick={handleClose} to={"/dashboard/address"} className='p-2
            hover:bg-orange-200 py-1'>Save Address</Link>

            <button onClick={handleLogout} className='text-left px-2
            hover:bg-orange-200 py-1'>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu
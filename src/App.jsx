import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails.js';
import { useEffect } from 'react';
import { setUserDetails } from './store/userSlice';
import { setAllCategory,setAllSubCategory,setLoadingCategory } from './store/productSlice.js';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios.js';
import SummaryApi from './common/SummaryApi.js';


function App() {
  const dispatch = useDispatch()

  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async()=>{
    try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
            ...SummaryApi.getCategory
        })   
        const { data : responseData } = response

        if(responseData.success){
          dispatch(setAllCategory(responseData.data))
        }

    } catch (error) {
        
    } finally{
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.getSubCategory
        })   
        const { data : responseData } = response

        if(responseData.success){
          dispatch(setAllSubCategory(responseData.data))
        }

    } catch (error) {
        
    } finally{
    }
  }

  useEffect(()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  },[])

  return (
    <>
      <Header/>
    <main className='min-h-[82vh]'>
      <Outlet/>
    </main>
      <Footer/>
      <Toaster/>
    </>
  )
}

export default App

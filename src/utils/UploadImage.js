import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'


const uploadImage = async(image)=>{   // if any any i want to upload in our react app just call it anywhere in app                
    try {
        const formData = new FormData()
        formData.append('image',image)

        const response = await Axios({
            ...SummaryApi.uploadImage,
            data : formData
        })
        console.log(response)

        return response

    } catch (error) {
        return error
    }
}

export default uploadImage
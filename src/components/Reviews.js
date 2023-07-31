import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef ,db} from './firbase/firebase'; 
import { addDoc ,doc,updateDoc,getDocs, query ,where} from 'firebase/firestore';
import { TailSpin,ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const Reviews = ({id,prevRating,userRated}) => {
    const useAppstate = useContext(Appstate);
    const navigate = useNavigate();
    const [rating,setRating] = useState(0);
    const [loading ,setLoading] = useState(false);
    const [reviewsLoading,SetReviewsLoading] = useState(false);
    const [form,setForm] = useState("");
    const [data,setData] = useState([]);
    const [newAdded,setNewAdded] = useState(0);

    const sendReview = async ()=>{
        setLoading(true);
        try{
            if(useAppstate.login){
            await addDoc(reviewsRef,{
                movieid:id,
                name:useAppstate.userName,
                rating: rating,
                thought :form,
                timestamp:new Date().getTime()
            })
            const ref = doc (db,"movies",id)
            await updateDoc(ref,{
                rating: prevRating + rating,
                rated: userRated + 1
            })
            setRating(0)
            setForm("");
            setNewAdded( newAdded + 1);
            swal({
                title:"Review Sent",
                icon:"success",
                buttons:false,
                timer:3000
            })
        }else{
            navigate('/login');
        }
        }catch(error){
            swal({
                title:"error.message",
                icon:"error",
                buttons:false,
                timer:3000
            })
        }
        setLoading(false)
    }

useEffect (()=>{
    async function getData(){
        SetReviewsLoading(true);
        setData([]);
        let quer = query(reviewsRef , where('movieid', '==' , id ))
        const querySnapshot = await getDocs(quer);
        querySnapshot.forEach((doc)=>{
            setData((prev)=>[...prev,doc.data()])
        })
        SetReviewsLoading(false);
    }
    getData();
},[newAdded])
  return (
    <div className='mt-4 border-t-2 border-gray-700 w-full'>
        <ReactStars 
            size={30}
            half={true}
            value={rating}
            onChange={(rate)=>setRating(rate)}
        />
      <input  value={form}
       onChange={(e)=>setForm(e.target.value)} 
       placeholder='Share Your thoughts' className='w-full p-2 outline-none bg-gray-600 ' />

      <button onClick={sendReview} className='bg-green-600 w-full p-2 flex justify-center'>{loading?<TailSpin height={20} color='White'/> :'Share'}</button>
      {
        reviewsLoading ? <div className=' mt-6 flex justify-center'> <ThreeDots height={10} color='White' /></div>:
        <div className='mt-4 '>
            {data.map((e,i)=>{
                return(
                    <div key={i} className='border-b border-gray-600 p-2 w-full mt-2'>
                        <div className='flex items-center'> 
                           <p className='text-blue-500'>{e.name}</p>
                           <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                        </div>   
                        <ReactStars 
                            size={15}
                            half={true}
                            value={e.rating} 
                            edit={false}
                            />
                        <p>{e.thought}</p>
                    </div>
                )
            })

            }
        </div>
      }
    </div>
  )
}

export default Reviews

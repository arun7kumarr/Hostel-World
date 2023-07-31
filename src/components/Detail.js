import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { db } from './firbase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { ThreeCircles } from 'react-loader-spinner'
import Reviews from './Reviews'

const Detail = () => {
    const {id} = useParams();
    const[data,setData] = useState({
        title:"",
        year:"",
        description:"",
        image:"",
        rating: 0,
        rated:0
    });

    const [loading,setloading] = useState(false);

    useEffect(()=>{
        async function getData(){
            setloading(true);
            const _doc = doc(db,"movies",id);
            const _data = await getDoc(_doc);
            setData(_data.data());
            setloading(false);
        }
        getData();
    },[])
  return (
    <div className='p-4 flex flex-col md:flex-row items-center md:items-start  justify-center mt-4 w-full'>
        {loading?<div className='flex w-full justify-center items-center h-96'><ThreeCircles height={50} color='white'/></div> :
        <>
      <img src={data.image} className='h-96 block md:sticky top-24' alt="" />
      <div className='md:ml-4 ml-0  w-full md:w-1/2'>
        <h1 className='text-3xl font-bold text-gray-400'>{data.title}<span className='text-xl'> ({data.year})</span> </h1>
        <ReactStars 
        size={20}
        half={true}
        value={(data.rating)/(data.rated)} 
        edit={false}
        />
        <p>{data.description}</p>
        <Reviews id={id} prevRating={data.rating} userRated={data.rated}></Reviews>
      </div>
      </>
      }
    </div>
  )
}

export default Detail

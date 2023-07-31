import { getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import ReactStars from "react-stars"
import { moviesref } from './firbase/firebase';
import { Link } from 'react-router-dom';

 //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwh5YMY3HZJmuca-PaswAnUstylwvPN4q7aLYvWkF7_rZH4aUkevSdo4c8AI4ySyP9mnA&usqp=CAU"
       
        //     img: "https://cdn.wallpapersafari.com/71/79/ABPkK1.jpg"

const Cards = () => {
    const [data,setData] = useState([]);

const [loading,setloading] = useState(true);

    useEffect(() =>{
        async function getData(){
            setloading(true);
            setData([]);
            const _data = await getDocs(moviesref);
            _data.forEach((doc)=>{
                setData((prv)=>[...prv,{...(doc.data()),id:doc.id}])
            })
            setloading(false);
        }
        getData();
    },[])

  return (
    <div className='flex flex-wrap justify-between p-3 mt-4'>
        {loading?<div className="w-full flex justify-center items-center h-96"> <TailSpin height={40} color='White'  /></div>:
      data.map((e,i)=>{
        return (
      
       <Link to={`/detail/${e.id}`} > <div key={i} className='card shadow-lg p-2 hover:-translate-y-3 font-medium cursor-pointer mt-6 transition-all duration-500'>
        <img  className ='h-60 md:72' src={e.image} alt="" />
        <h1><span className='text-gray-500'>Name:</span> {e.title}</h1>
        <h1 className='flex items-center'><span className='text-gray-500 mr-1'>Rating:</span> 
        <ReactStars 
        size={20}
        half={true}
        value={e.rating/e.rated} 
        edit={false}
        /></h1>
        <h1><span className='text-gray-500'>Fees:</span> {e.year}./Rs</h1>
      </div></Link>
        );
      })
    }
    </div>
  )
}

export default Cards

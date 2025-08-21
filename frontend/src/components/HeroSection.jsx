import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {
    const [query, setQuery] = useState("");   // To get Searched text
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p className='max-w-5xl mx-auto text-purple-900' >Welcome to JobPortal , the No.1 job search platform trusted by thousands of professionals and freshers alike. Whether you’re looking for your very first role, aiming for a career switch, or targeting your dream company, we connect you with the best opportunities.</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full p-3'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] h-12 w-12">
                        <Search className='h-5 w-5 ' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
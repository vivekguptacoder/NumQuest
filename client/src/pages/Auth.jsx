import { useState } from "react"
import Signin from "../components/Signin"
import Signup from '../components/Signup'
import Loader from "../components/Loader"

export default function Auth(){

    const [isSignin, setIsSignin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    if(isLoading){
        return (
            <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center bg-zinc-800 bg-gradient-to-b from-[#124E66]">
                <Loader />
            </div>
        )
    }
    
    return(
        <>
            <div className="h-screen w-screen bg-zinc-800 text-white tracking-widest flex justify-center items-center md:p-16">
                <div className="w-full h-full md:w-3/4 lg:w-2/4 md:h-3/4 bg-gradient-to-b from-[#124E66] md:rounded-full md:p-8">
                    {isSignin ? <Signin onClick={setIsSignin} setIsLoading={setIsLoading} /> : <Signup onClick={setIsSignin} setIsLoading={setIsLoading}/> }
                </div>
            </div>
            <div className="text-white tracking-widest absolute top-5 right-5">
                <p className="font-bold">For demo User</p>
                <p>Username - Utkarsh</p>
                <p>Password - utk</p>
            </div>
        </>
    )
}
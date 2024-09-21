'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

function SignupPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try{
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)

            console.log("Signup Success", response.data)

            router.push('/login')



        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(error: any) {
            console.log("Signup failed")
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    }, [user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black w-full">
        <h1 className="text-white text-6xl mb-10">Signup</h1>
        <hr/>
        <div className="flex flex-col">
            <label htmlFor="username" className="w-full">
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50'>
                    Username <sup className='text-pink-200'>*</sup>
                </p>
                <input
                    type="text"
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="Username"
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                />
            </label>
            <label htmlFor="email" className="w-full">
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50'>
                    Email <sup className='text-pink-200'>*</sup>
                </p>
                <input
                    type="text"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="Email"
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                />
            </label>
            <label htmlFor="password" className="w-full">
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-slate-50'>
                    Password <sup className='text-pink-200'>*</sup>
                </p>
                <input
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="Password"
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                />
            </label>
            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 mt-1 text-slate-100"
            >
                {
                    loading ? "Registering..." : "Signup"
                }
            </button>

        
            <p className="text-slate-100">Already Registered? <Link className="text-blue-400" href="/login">Login</Link></p>
     
        </div>
        
        


    </div>
  )
}

export default SignupPage
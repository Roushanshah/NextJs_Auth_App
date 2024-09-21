'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    //const router = useRouter()

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token})

            setVerified(true)
            setError(false)
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        // const {query} = router;
        // const urlToken = query.token
        setError(false)
        const urlToken = window.location.search.split("=")[1]

        setToken(urlToken || "")

    },[])

    useEffect(() => {
        setError(false)
        if(token.length > 0){
            verifyUserEmail()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-slate-50">
        <h1 className="text-8xl">Verify Email</h1>
        {verified && (
                <div className="flex flex-col items-center justify-center mt-16 gap-4">
                    <h2 className="text-2xl mt-4">Email Verified Successfully</h2>
                    <Link href="/login"
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 mt-1 text-slate-100"
                    >
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div className="flex flex-col items-center justify-center mt-16 gap-4">
                    <h2 className="rounded-md p-2 mt-4 text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
            )}
    </div>
  )
}

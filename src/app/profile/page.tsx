'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

function ProfilePage() {

    const router = useRouter()
    const [data, setData] = useState("nothing")

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res)

        setData(res.data.data._id)
    }

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Successfully")
            router.push("/login")
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }
    } 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-slate-50">
        <h1>
            Profile
        </h1>
        <hr/>
        <h2>
            {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>
                {data}
            </Link>}
        </h2>
        <hr/>
        <button
        onClick={logout}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 mt-4 text-slate-100"
        >
            Logout
        </button>
    </div>
  )
}

export default ProfilePage
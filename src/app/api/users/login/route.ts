import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json()
        const { email, password} = reqBody

        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({error: "User does not exists"}, {status: 400})
        }

        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword) {
            return NextResponse.json({error: "Check your credentials"}, {status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json({
            message: "Logged In Successfully",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
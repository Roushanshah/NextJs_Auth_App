import { connect } from '@/dbConfig/dbConfig'
import { sendMail } from '@/helpers/mailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
    try{

        const reqBody = await request.json()
        const {username, email, password} = reqBody

        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        await sendMail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
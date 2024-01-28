import prisma from "@/config/prisma";
import { NextResponse } from "next/server";

export async function GET (request:Request){
    try {
        const getdata=await prisma.post.findMany()
        return NextResponse.json(getdata)
    } catch (error) {
        return NextResponse.json({message:"GET Error",error},{status:501})
    }
}

export async function POST (request:Request){
    try {
        const {nom,prenom,sexe} = await request.json()
        const postdata = await prisma.post.create({
            data:{nom,prenom,sexe}
        })
        return NextResponse.json(postdata)
    } catch (error) {
        return NextResponse.json({message:"POST ERROR",error},{status:501})
    }
}
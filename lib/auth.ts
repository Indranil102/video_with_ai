import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions:NextAuthOptions={
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password" },
                
            },  

            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Email and password are required.");
                }

                try {
                    await connectToDatabase()
                   const user= await User.findOne({email:credentials.email})

                   if(!user){
                    throw new Error("No user found with this email.");
                   }
                  const isValid= await bcrypt.compare(
                    credentials.password,
                    user.password
                   )

                   if(!isValid){
                    throw new Error("Invalid Password.");
                   }
                    
                   return{
                    id:user._id.toString(),
                    email:user.email,
                    
                   }
                   
                } catch (error) {
                    console.error("Authorization Error", error);
                    throw error;
                    
                }
            } // Close authorize method
        }) // Close CredentialsProvider
    ] // Close providers array
} // Close authOptions object
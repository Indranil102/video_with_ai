"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router= useRouter()

    const handleSubmit= async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords do not match")
            return
        }

        try {
          const res=  await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

         const data= await res.json();

         if(!res.ok){
            throw new Error(data.error || 'Registration failed');
         }
            console.log(data);
            router.push('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error(error)
        }

    }
  return (
    <div>RegisterPage</div>
  )
}

export default RegisterPage
"use client"

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { set } from "mongoose";
import { useRef, useState } from "react";

interface fileUploadProps{
    onSuccess:(res:any)=>void
    onProgress?:(progress:number)=>void
    fileType?: "image" | "video" | "file";
     
}

const Fileupload = ({onSuccess,onProgress,fileType}:fileUploadProps) => {
    
   const [uploading , setUploading] = useState(false);
   const [error, setError] = useState<string,null>(null);
   
   const validateFile= (file:File)=>{

    if(fileType=== "video"){
        if(!file.type.startsWith("video/")){
            setError("Please upload a valid video file");
    }

   }

   if(file.size > 100 * 1024 * 1024){ 
        setError("File size exceeds 100 MB limit");
   }

   return true;
}
   
const handelChange =async (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];
    if(!file || !validateFile(file)){
        return;
    }
    setUploading(true);
    setError(null);

    try {
       const authRes= await fetch("/api/auth/imagekit-auth")
       const atuh= await authRes.json(); 

       await upload({
         expire,
                token: auth.token,
                signature: atuh.signature,
                publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
                file,
                fileName: file.name, 
                expire: auth.expire,
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                // Abort signal to allow cancellation of the upload if needed.
                abortSignal: abortController.signal,
       })
    } catch (error) {
        
    }

    return (
        <>
            
            <input type="file" accept={
                fileType === "video"
                ? "video/*" 
                : "image/*"}
                onChange={handleFileChange}
             
            />

            {
                uploading && <p>Uploading...</p>
            }
         
            
        </>
    );
};

export default Fileupload;
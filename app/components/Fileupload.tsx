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
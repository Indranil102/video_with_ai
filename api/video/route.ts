import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const videos = (await Video.find({}).sort({ createdAt: -1 })).lean();

    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch videos." },
      { status: 500 }
    );
  }
}

export async function POST(){
    try {
      const session=await  getServerSession(authOptions)

      if(!session){
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );

       
      }
      await  connectToDatabase(request: NextRequest);
       const body: IVideo= await request.json()
       if(
        !body.title ||
        !body.description ||
        !body.videoUrl ||
        !body.thumbnailUrl
       ){
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
          );
       }

       const videoData={
        ...body,
        controls: body?.controls ?? true,
        Transformation:{
            height:1920,
    width:1080, 
    quality:body.transformation?.quality ?? 100, // Default quality to 80 if not provided;
        }
       }
      const newVideo= await Video.create(videoData)

      return NextResponse.json(newVideo, { status: 201 });
    } catch (error) {
        return NextResponse.json(
          { error: "Failed to create video." },
          { status: 500 }
        );  
        
    }
}

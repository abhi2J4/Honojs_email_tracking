import { Hono } from "hono";

import {getConnInfo} from "hono/bun"
import Track from "../model/track.model";
import {promises as fs} from "fs"

const app = new Hono()

let imageBuffer : Buffer;
(async () =>{
    try {
        imageBuffer = await fs.readFile(__dirname  + '/assets/image.png')
    } catch (error) {
        console.log(error);
    }
})();

app.get ('/track-mail/:id',async(c)=>{
    const id = c.req.param("id");

    const userIP =
     c.req.raw.headers.get('true-client') || 
     c.req.raw.headers.get("cf-connecting-ip") ||
      getConnInfo(c).remote.address|| 
       "0.0.0.0";

    // check
    if(!id) return c.json({error:"tracking id is required"})
        try {
            const track = await Track.findOne({trackingId:id})
            if(!track)return c.json({error:"tracking id not found"})

// check if user already opened the email
if (!track.userIPs.includes(userIP)){
    track.userIPs.push(userIP)
    track.opens++
    await track.save();
}

return new Response(imageBuffer,{
    headers:{
        "Content-Type":"image/png",
        "content-length":imageBuffer.length.toString()
    }
});

// image send response
        } catch (error) {
            console.log(error)
            return c.json({error:"faild to track email"})
        }
})

export default app; 
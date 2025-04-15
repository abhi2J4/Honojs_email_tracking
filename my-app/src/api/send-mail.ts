import { Hono } from "hono";
import {v4 as uuid} from "uuid"
import Track from "../model/track.model";
import { sendMail } from "../utils/sendMail";

const app = new Hono()

app.post("/send-mail",async(c)=>{
    const {emails,password} = await c.req.json();

    //checks
    if(!emails || !password) return c.json({error:"Emails and password are required"})

         //password validation
        if(password !== Bun.env.PASSSWORD )return c.json({error:"WRONG PASSWORD"})

            //tracking id ,data store => db
  
            const trackingId = uuid();

            try {   
                await Track.create({trackingId})
                await sendMail(emails,trackingId)

                return c.json({
                    trackingId:trackingId,
                    message:"email sent successfully"
                })
                //mail sending ----> sendgrid
            } catch (error) {
                console.log(error)
                return c.json({error :"Faild to send email"})
            }
})

export default app 
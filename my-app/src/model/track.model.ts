
import { model, Schema } from "mongoose";


interface ITrack {
    trackingId:string;
    opens:number;
    userIPs:string[];
}
const trackSchema = new Schema<ITrack>({
   trackingId:{
    type:String,
    required: true
   },
   opens:{
    type:Number,
    default:0
   },
   userIPs:{
    type:[String],
    default:[]
   }

    
})
//if you are running it on edge ,thoda sa different sa syntax hoga  export karne ka

const Track = model<ITrack>("Track",trackSchema);
export default Track; 
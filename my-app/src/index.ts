import { Hono } from 'hono'
import {cors} from 'hono/cors'
import { dbConnect } from './config/db.config';
 import trackMailRoute from "./api/track-mail"
import getMailstatusRoute from "./api/get-mail-status"
import sendMailRoute from "./api/send-mail";

const app = new Hono()

//middlewares
app.use(cors());
//routes

app.route('/api',sendMailRoute);
app.route('/status',getMailstatusRoute); 
app.route('/track',trackMailRoute); 

dbConnect();

export default app

import express from 'express'
import mongoose from 'mongoose'
import { urlShort, getOriginalUrl } from "./Controllers/url.js";


const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({extended:true}))

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/",
    {
      dbName: "url-shortener",
    }
  )
  .then(() => console.log("Mongodb Connected"))
  .catch((error) => console.log(error));


  app.get('/',(req,res)=>{
    res.render("server.ejs",{shortUrl:null})
  })

  // handle url submission
  app.post("/shorten", urlShort);

  // redirect to original url using short url
  app.get("/:shortCode", getOriginalUrl);


app.listen(port,()=>console.log(`Server is running on port ${port}`))
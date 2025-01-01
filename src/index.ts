import express from "express";
import prisma from "./DB/db.config";
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from "swagger-jsdoc";
import router from "./routes/routes";
import cookieParser from 'cookie-parser'

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use("/api/v1", router);

const options = {
  definition:{
    openapi:"3.0.0",
    info:{
      title:"Entrix API",
      version:'1.0.0',
      description:'A event management API'
    },
    servers:[
      {
        url:'http://localhost:3000'
      }
    ]
  },
  apis:["./routes/*.js"]
}


const specs  = swaggerJSDoc(options)
app.use('/api/docs',swaggerUI.serve,swaggerUI.setup(specs))

app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server is serving");
});

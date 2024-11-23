import express from 'express'
import { SwaggerUiOptions } from 'swagger-ui-express'

const app = express()

const PORT = 300

app.listen(PORT,()=>{
    console.log('running')
})


const user = require('./models/users')
const client = require('./models/client')
const cookieParser = require('cookie-parser')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const express = require("express");
//creates application to run entire server
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,{
useUnifiedTopology: true,
useNewUrlParser: true,
useCreateIndex:true, 
}, ()=>{console.log('connected to Database')});

//middleware to access user input
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json())


//app runs on port 4000
const PORT = 4000;
app.use(cors());
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);


});
//Routers to be required
const userRouter = require('./routes/signup')

//importing route
const authRoute = require('./routes/auth')
const privRoute = require('./routes/private')

//route middlewares
app.use('/api/user',authRoute)
app.use('/api/priv',privRoute)
// //use middlewares 
// app.use(express.json());
// app.use(cookieParser());
// //adds '/api' from all the routes that come from user router
// app.use('/api',userRouter)
// app.use("/api",routes)
// app.use((req,res,next)=>{
//   req.on('data',chunk =>{
//     console.log(chunk)
//   })
//   next()
// })

// app.get('/test', (req,res)=>{
//   res.send('hello world ')
// })





// creating a server 
// const http = require('http')
// const {Server} = require('socket.io')
// const server = http.createServer(app)

// const io = new Server (server,{
//   cors:{
//     origin:['http://localhost:19006']
//   }
// })

// io.on('connection', (socket) =>{
//   console.log('user connected',socket.id)

//   socket.on('disconnect',()=>{
//     console.log('User disconnected', socket.id)
//   })

//   socket.on('join_room',(data)=>{
//     socket.join(data)
//     console.log('user with id',socket.id,'joined room ',data)
//   })

//   socket.on('send_message', (data)=>{
//     socket.to(data.room).emit('receive_message',data)
//   })


// })

const {instrument} = require('@socket.io/admin-ui')
const io = require('socket.io')(3000,{//creatin a server at port 3000
  cors:{//cors needed to avoid cors related errors
    origin: ['http://localhost:19006','https://admin.socket.io']//origin is the local host our client is connected to 
    
  }
})

io.on('connection',socket =>{//function that runs every time that a client connects 
  console.log('You connected with' + socket.id)//outputting id of every person that joins 

  socket.on('send-message',(message,room)=>{//listening for send-message event 
    if (room ===  ''){//if room field is left empty
      socket.broadcast.emit('receive-message', message)//broadcast message to everyone
    }else{
      socket.to(room).emit('receive-message',message)//sending message to everyone in the room 
    }
  })
  socket.on('join-room',(room,cb) =>{
    socket.join(room)
    cb('Joined',room)
  })
})

instrument(io,{auth:false})
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);




// const port = 3000
// io.on("connection", socket => {
//   console.log("a user connected :D");
//   socket.on("chat message", msg => {
//     console.log(msg);
//     io.emit("chat message", msg);
//   });
// });

// server.listen(port, () => console.log("server running on port:" + port));

//publishable key
const PUBLISHABLE_KEY = 'pk_test_51Kxe4nHawKxdIkWuaxhqZA4KQNxMyv5dB39BkZEmzZCS1hZIshFnOmFfYnh3yMsoDzdjxP6xach2J0IkpvXmUBSp00EhbUdmu6'
//secret key
const SECRET_KEY = 'sk_test_51Kxe4nHawKxdIkWuCb1QcJQEWylIMhOTXEs2ZmSnUfcla2L3TUovr1BZzqcSm5aAYl3QscWDGvjYARgs7sLEeISq00IbnwPH38'
const Stripe = require('stripe')
const stripe = Stripe(SECRET_KEY, {apiVersion:'2020-08-27'})//set up of strip and added the version as option so format is constant 

app.post('/create-payment-intent', async(req,res)=>{
  try{
    const paymentIntent = await stripe.paymentIntents.create({
      amount:1099,
      currency:'usd',//currency is dollars
      //omnly will accept payments by card
      payment_method_type :['card']//this is the default but can be changed later on 
    })

    const clientSecret = paymentIntent.client_secret //saving payment intent in this variable
    res.json({
      clientSecret:clientSecret//saves client secret as client secret 
    })
  }catch(error){//catch an error if error exists 
    console.log(error.message)//outputs error message
    res.json({
      error: error.message//sends response as json 
    })

  }
})
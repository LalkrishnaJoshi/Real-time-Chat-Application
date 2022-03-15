//this is a node server that will handle the socketIO connections
//this server will be listening to incoming events
//this  event names are custom like variable names

const io = require('socket.io')(5000, {
    cors:{
        origin:'*',
    }
});
// const io = require('socket.io')(8000, {
//     cors: {
//       origin: '*',
//     }
//   });
const users={}

io.on('connection',socket=>{
        //if new users join let other users connected know!! {it is programmer defined event}
        socket.on('new-user-joined',name=>{
            // console.log("user joined" , name)
            users[socket.id]=name;
            socket.broadcast.emit('user-joined',name);  //user-joined is an event that we are emitting to every except the new-user who has joined
        });

        //if someone sends text , broadcast it to other people {it is also programmer defined event}
        socket.on('send',text=>{
            socket.broadcast.emit('recieve',{text:text,name: users[socket.id]});
        });

        //if someone left the chat ,let other people know{it is built in event}
        socket.on('disconnect',text=>{
             socket.broadcast.emit('left',users[socket.id])
             delete users[socket.id]
        })
});


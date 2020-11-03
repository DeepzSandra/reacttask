import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8081/');

function connect(cb) {
  // listen for any messages coming through
  // of type 'chat' and then trigger the 
  // callback function with said message
  socket.on('connect', (message) => {
    // console.log the message for posterity
    console.log(message)
    // trigger the callback passed in when
    // our App component calls connect
    cb(message);
  })
  
}
function socketEmit(data, cb) {
  // listen for any messages coming through
  // of type 'chat' and then trigger the 
  // callback function with said message
  console.log(data,"9999999999999")
  socket.emit("message", data);
}
function socketRec(data, cb) {
  console.log(data, "dddddddsss")
  socket.on(data.fname, (message) => {
    // console.log the message for posterity
    console.log(message)
    // trigger the callback passed in when
    // our App component calls connect
    cb(message);
  })
}

export { connect, socketEmit, socketRec }
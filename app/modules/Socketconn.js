import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:8081");
class Socketconn {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  
  static connect() {
      socket.on('connect', () => {
        console.log(socket.id); // 'G5p5...'
      });
  }
  static emit(eventname, data, callback) {
    //  alert(socket.id);
      socket.emit(eventname, data, function() {
          var args = arguments;
          callback.apply(socket, args);
      });
  }
  static disconnect() {
      socket.disconnect();
  }
  static on(eventname, callback) {
      socket.emit(eventname, function() {
          var args = arguments;
          callback.apply(socket, args);
      });
  }
}

export default Socketconn;
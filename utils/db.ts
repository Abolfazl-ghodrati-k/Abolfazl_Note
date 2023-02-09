import mongoose from "mongoose";

var connection: {
  isConnected: mongoose.ConnectionStates | boolean;
};

async function connect() {
  // try {
  //   if (connection.isConnected) {
  //     return;
  //   }
  //   if (mongoose.connections.length > 0) {
  //     connection.isConnected = mongoose.connections[0].readyState;
  //     if (connection.isConnected == 1) {
  //       return;
  //     }
  //     await mongoose.disconnect();
  //   }
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGODB_URI+'/test');
  //   connection.isConnected = db.connections[0].readyState;
  //   return { isConnected: true, message: "Connected Successfully" };
  // } catch (error) {
  //   return { isConnected: false, message: error };
  // }
  return db;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      // console.log('not disconnected');
    }
  }
}

const db = { connect, disconnect };
export default db;

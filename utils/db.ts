import mongoose from "mongoose";

type Connection = {
  isConnected: mongoose.ConnectionStates | boolean;
};

var connection: Connection = {
  isConnected: false,
};

async function connect() {
  if (connection?.isConnected) {
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected == 1) {
      return;
    }
    await mongoose.disconnect();
  }
  mongoose.set("strictQuery", true);
  var db = await mongoose.connect(process.env.MONGODB_URI);
  connection.isConnected = db.connections[0].readyState;
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

import { connect } from "mongoose";

export async function connectDB(url) {
  return connect(url);
}
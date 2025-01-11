import { queryClient } from "@/main";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on('notification', () => {
  queryClient.invalidateQueries(["notifications"])
})

export default socket;
import { queryClient } from "@/main";
import { io } from "socket.io-client";

const basePath = import.meta.env.VITE_API_BASE_PATH;
const socket = io(basePath);

socket.on("notification", () => {
  queryClient.invalidateQueries(["notifications"]);
});

export default socket;

import Board from "../models/board.js";

const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join board room
    socket.on("join_board", (boardId) => {
      socket.join(boardId);
    });

    // Send full board update
    socket.on("update_board", async ({ boardId, board }) => {
      try {
        await Board.findByIdAndUpdate(boardId, board);
        // Emit to all clients in the room including sender
        io.to(boardId).emit("board_updated", board);
      } catch (err) {
        console.error("Error updating board:", err);
        socket.emit("error", { msg: "Failed to update board" });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default initSocket;
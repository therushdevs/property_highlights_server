import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database";
import propertyHighlightRoutes from "./controllers/PropertyHighlightController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Server!!" });
});
app.use("/api/property_highlights", propertyHighlightRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// export default app;

import express from "express";
import productRoutes from "./router/productRouter.js";
import userRoutes from "./router/userRouter.js";
import { expressjwt } from "express-jwt";
import { errorHandler } from "./middleware/errorMiddleware.js";
const app = express();

app.use(express.json());

const jwtMiddleware = expressjwt({
  secret: "secret123",
  algorithms: ["HS256"],
}).unless({
  path: ["/auth/login", "/auth/register", { url: "/items", methods: ["GET"] }],
});

app.use(jwtMiddleware);
app.use(productRoutes);
app.use(userRoutes);
app.use(errorHandler);
export default app;

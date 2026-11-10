import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import config from "./shared/config/index.js";
import frontendRoutes from "./frontend/routes/index.js";
import adminRoutes from "./admin/routes/index.js";
import {
  notFoundHandler,
  errorHandler,
} from "./shared/middlewares/error.middleware.js";

const app = express();

// Security
app.use(helmet());


const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
];


// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
if (config.env !== "test") {
  app.use(morgan("dev"));
}

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Static files
app.use("/uploads", (req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use("/uploads", express.static(config.uploadDir));

// Routes
app.use("/api", frontendRoutes);
app.use("/api/backend", adminRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/health", (c) => {
  return c.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8082,
      },
      (info) => {
        console.log(`Payment service is running on port 8082`);
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

import Fastify from "fastify";
import { clerkPlugin } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware";

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
  return reply.send({
    message: "Order service is authenticated.",
    userId: request.userId,
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 8081 });
    console.log("Order service is running on port 8081");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();

import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})

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

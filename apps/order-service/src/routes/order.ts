import { FastifyInstance } from "fastify";
import { orders, userOrder } from "../controller/orderController";
import { shouldBeAdmin, shouldBeUser } from "../middleware/authMiddleware";

const orderRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/user-orders", { preHandler: shouldBeUser }, userOrder);
  fastify.get("/orders", { preHandler: shouldBeAdmin }, orders);
};

export default orderRoutes;

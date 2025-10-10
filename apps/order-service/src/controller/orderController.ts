import { FastifyReply, FastifyRequest } from "fastify";
import { Order } from "@repo/order-db";

export const userOrder = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const orders = await Order.find({
    userId: request.userId,
  });

  console.log("userId : ", request.userId);

  return reply.send(orders);
};

export const orders = async (request: FastifyRequest, reply: FastifyReply) => {
  const orders = await Order.find();
  return reply.send(orders);
};

import { auth } from "@clerk/nextjs/server";
import React from "react";

const TestPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();
  console.log(token);

  const resProduct = await fetch("http://localhost:8080/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataProduct = await resProduct.json();
  console.log("dataProduct >>>", dataProduct);

  const resOrder = await fetch("http://localhost:8081/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataOrder = await resOrder.json();
  console.log("dataOrder >>>", dataOrder);

  const resPayment = await fetch("http://localhost:8082/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataPayment = await resPayment.json();
  console.log("dataPayment >>>", dataPayment);

  return <div>TestPage</div>;
};

export default TestPage;

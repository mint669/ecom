import stripe from "./strip";

export const createStripeProduct = async (item) => {
  try {
    const res = await stripe.products.create({
      id: item.id,
      name: item.name,
      default_price_data: {
        currency: "USD",
        unit_amount: item.price * 100,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getStripeProduct = async (productId: number) => {
  try {
    const res = await stripe.prices.list({
      product: "123",
    });
    return res.data[0]?.unit_amount;
  } catch (error) {
    console.log(error);
  }
};

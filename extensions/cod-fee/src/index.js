// Shopify Functions logic placeholder
export function run(input, settings) {
  const paymentMethod = input.cart.paymentMethod;
  const shippingCountry = input.cart.deliveryGroups[0].deliveryAddress.countryCode;

  let fee = 0;
  if (paymentMethod === "cash_on_delivery") {
    fee = shippingCountry === "HU" ? 300 : 0.99;
  }

  return {
    operations: [
      {
        addLineItem: {
          title: shippingCountry === "HU" ? "Utánvét díj" : "COD Fee",
          price: {
            amount: fee,
            currencyCode: input.cart.buyerIdentity.currency,
          },
        },
      },
    ],
  };
}

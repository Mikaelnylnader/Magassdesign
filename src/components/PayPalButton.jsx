import { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

export default function PayPalButton({ amount, onSuccess }) {
  const [{ isPending }] = usePayPalScriptReducer();

  const handleCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
            currency_code: "USD"
          }
        }
      ]
    });
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      onSuccess(details);
    });
  };

  if (isPending) {
    return <div className="text-white text-center">Loading PayPal...</div>;
  }

  return (
    <PayPalButtons
      style={{
        layout: "horizontal",
        height: 48,
        color: "gold"
      }}
      createOrder={handleCreateOrder}
      onApprove={handleApprove}
    />
  );
} 
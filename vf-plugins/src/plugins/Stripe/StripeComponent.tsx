import React, {useState, useEffect} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (elements == null) {
//       return;
//     }

//     // Trigger form validation and wallet collection
//     const {error: submitError} = await elements.submit();
//     if (submitError) {
//       // Show error to your customer
//       setErrorMessage(submitError.message);
//       return;
//     }

//     // Create the PaymentIntent and obtain clientSecret from your server endpoint
//     const res = await fetch('http://localhost:3001/create-intent', {
//       method: 'POST',
//       body: JSON.stringify({"amount":"10000"}),
//     });

//     const {clientSecret} = await res.json();
//     console.log(clientSecret);
//     const {error} = await stripe.confirmPayment({
//       //`Elements` instance that was used to create the Payment Element
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: 'complete',
//       },
//       redirect: 'if_required',
//     });

//     if (error) {
//       // This point will only be reached if there is an immediate error when
//       // confirming the payment. Show error to your customer (for example, payment
//       // details incomplete)
//       setErrorMessage(error.message);
//     } else {
//       // Your customer will be redirected to your `return_url`. For some payment
//       // methods like iDEAL, your customer will be redirected to an intermediate
//       // site first to authorize the payment, then redirected to the `return_url`.
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button type="submit" disabled={!stripe || !elements}>
//         Pay
//       </button>
//       {/* Show error message to your customers */}
//       {errorMessage && <div>{errorMessage}</div>}
//     </form>
//   );
// };

// const stripePromise = loadStripe('pk_test_51NZKXVLyiC7YMOHRLifBoncMGcs9e0lTAvFKsDqgRuaqGxVIDdNOQ9LsKglqLSGihHJ5iEeZjFV70bLPVuUJIjBw00OPWNFIgG');

// const options = {
//   mode: 'payment',
//   amount: 1099,
//   currency: 'usd',
//   // Fully customizable with appearance API.
//   appearance: {
//     /*...*/
//   },
// };

// export const VFStripe: React.FC = ({ ...props }) => {
//   return (
//     <Elements stripe={stripePromise} options={options}>
//     <CheckoutForm />
//   </Elements>
//   );
// }

export const VFStripe: React.FC = ({ ...props }) => {
  // const [botCode, setBotCode] = useState("");

  // useEffect(() => {
  //   fetch("./stripe.js")
  //     .then((response) => response.text())
  //     .then((data) => setBotCode(data))
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <iframe
    
      src='http://localhost:5173/'
      // srcDoc={`<html><body><script>${botCode}</script></body></html>`}
      width="100%"
      height="500px"
    />
  );
}


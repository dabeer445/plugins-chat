import React, { useState } from "react";

export const Uploader = () => {
  // Define a state variable to store the count
  const [count, setCount] = useState(0);

  // Define a function to increment the count
  const increment = () => {
    setCount(count + 1);
  };

  // Return the JSX element for the button
  return (
    <button onClick={increment}>
      {count}
    </button>
  );
};

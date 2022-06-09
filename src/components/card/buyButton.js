import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";

export default function BuyButton(props) {
  const subProduct = JSON.parse(props.subProductStr);
  const [count, setCount] = useState(props.count);

  return (
    <Button variant="outlined" color="secondary">
      购买
    </Button>
  );
}

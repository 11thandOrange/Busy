import { useState, useEffect } from "react";

const useToast = (fetcher) => {
  const [showToast, setShowToast] = useState(false);

  const onDismiss = () => {
    setShowToast(false);
  };

  useEffect(() => {
    if (fetcher && fetcher.state === "idle" && fetcher.data) {
      setShowToast(true);
    }
  }, [fetcher.state]);

  return { showToast, onDismiss };
};

export default useToast;

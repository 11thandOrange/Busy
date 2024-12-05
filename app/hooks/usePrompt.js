import { useEffect } from "react";

import { useBlocker } from "@remix-run/react";
const usePrompt = () => {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname,
  );

  return blocker;
};

export default usePrompt;

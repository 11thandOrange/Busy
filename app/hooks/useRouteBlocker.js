import { useEffect, useState } from "react";

import {
  unstable_usePrompt,
  useBeforeUnload,
  useBlocker,
} from "@remix-run/react";
const useRouteBlocker = (hasChanged) => {
  const [preventRouteLeave, setPreventRouteLeave] = useState(false);
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasChanged && currentLocation.pathname !== nextLocation.pathname,
  );

  useBeforeUnload((event) => {
    console.log("event is here ", navigate);

    if (hasChanged) {
      event.preventDefault();
      setPreventRouteLeave(true);
    } else {
      setPreventRouteLeave(false);
    }
  });
  return preventRouteLeave;
};

export default useRouteBlocker;

import { useEffect, useState } from "react";
import { hasChanges } from "../utils/clientFunctions";

export function useSettingsChanged(settingsState, prevSettingsState) {
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    setHasChanged(hasChanges(prevSettingsState, settingsState));
  }, [settingsState, prevSettingsState]);

  return hasChanged;
}

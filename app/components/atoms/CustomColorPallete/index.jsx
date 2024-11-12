import {
  Button,
  Popover,
  ActionList,
  ColorPicker,
  hsbToHex,
  Text,
  TextField,
  hexToRgb,
  rgbToHsb,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";

import "./CustomColorPallete.css";
import useDebounce from "../../../hooks/useDebounce";
function CustomColorPallete({
  colorHeading,
  onColorChange = () => {},
  initialColor,
}) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );
  const [color, setColor] = useState(
    rgbToHsb(hexToRgb(initialColor || "#fffff")),
  );
  const debouncedColor = useDebounce(color, 500);
  const activator = (
    <div
      onClick={togglePopoverActive}
      style={{
        backgroundColor: hsbToHex(color),
        width: "36px",
        height: "36px",
        display: "block",
        borderRadius: "10px",
        border: "1px solid #ccc",
      }}
    ></div>
  );
  useEffect(() => {
    if (debouncedColor) {
      onColorChange(hsbToHex(debouncedColor));
    }
  }, [debouncedColor]);
  return (
    <div className="color-pallete-container">
      <div className="color-header">
        <Text variant="bodyMd" as="span">
          {colorHeading}
        </Text>
      </div>
      <div className="custom-color-pallete">
        <div style={{ height: "36px" }}>
          <Popover
            active={popoverActive}
            activator={activator}
            autofocusTarget="first-node"
            onClose={togglePopoverActive}
          >
            <ColorPicker
              onChange={(color) => {
                setColor(color);
              }}
              color={color}
            />
            ;
          </Popover>
        </div>

        <input
          className="color-input"
          type="text"
          value={hsbToHex(color)}
          readOnly
        />
      </div>
    </div>
  );
}

export default CustomColorPallete;

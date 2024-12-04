import {
    Box,
    Card,
    Page,
    Text,
    BlockStack,
    InlineGrid,
    TextField,
    Button,
    Checkbox,
  } from "@shopify/polaris";

  import { useLoaderData, Form, useFetcher } from "@remix-run/react";
import CustomColorPallete from "../../atoms/CustomColorPallete";
import InputWithSelector from "../../atoms/InputWithSelector";
import CustomTextField from "../../atoms/CustomTextField";
import { useEffect, useRef, useState } from "react";
import ManageDataChange from "../ManageDataChange";
import ToastBar from "../../atoms/Toast";
import "./style.css";

  
const CustomizationCartNotice = ({cartSettings}) => {
  const fetcher = useFetcher();

  const INITIAL_STATE = {
    backgroundColor: '#fff5cd',
    textColor: '#222222',
    primaryText: '',
    secondaryText: '',
    showCountdownTimer: false,
    countdownTimer: 0,
    hideTheFireIcon: false,
    marginTop: 0,
    marginTopUnit: 'px',
    marginBottom: 0,
    marginBottomUnit: 'px'
  }

  const oldState = useRef(INITIAL_STATE)

  const [cartNoticeCustomization, setCartNoticeCustomization] = useState(INITIAL_STATE);
  const [showToast, setShowToast] = useState(false);

  const handleCartNoticeCustomizationChange = (value, key) => {
      setCartNoticeCustomization(prevState => ({
          ...prevState,
          [key] : value
      }))
  }
  
  const handleSaveSettingsData = () => {
    fetcher.submit(
      {
        primary_message: cartNoticeCustomization?.primaryText,
        secondary_message: cartNoticeCustomization?.secondaryText,
        show_countdown: cartNoticeCustomization?.showCountdownTimer,
        countdown_timer: cartNoticeCustomization?.countdownTimer,
        fire_icon: cartNoticeCustomization?.hideTheFireIcon,
        backgroundColor: cartNoticeCustomization?.backgroundColor,
        textColor: cartNoticeCustomization?.textColor,
        general_setting: JSON.stringify({
          marginTop: cartNoticeCustomization?.marginTop,
          marginTopUnit: cartNoticeCustomization?.marginTopUnit,
          marginBottom: cartNoticeCustomization?.marginBottom,
          marginBottomUnit: cartNoticeCustomization?.marginBottomUnit,
        })
      },
      { method: "POST", action: "/apps/cartNotice" },
    );
  }

  const handleDiscardChanges = () => {
    setCartNoticeCustomization(oldState.current)
  }

  const onDismiss = () => {
    setShowToast(false);
  };

  useEffect(() => {
    let general_setting;
    if (cartSettings && cartSettings?.general_setting) {
      general_setting = JSON.parse(cartSettings.general_setting);
    }
    let data = {
        primaryText: cartSettings?.primary_message,
        secondaryText: cartSettings?.secondary_message,
        showCountdownTimer: cartSettings?.showCountdown,
        countdownTimer: cartSettings?.countdown_timer,
        hideTheFireIcon: cartSettings?.fire_icon,
        backgroundColor: cartSettings?.backgroundColor,
        textColor: cartSettings?.textColor,
        marginTop: general_setting?.marginTop,
        marginTopUnit: general_setting?.marginTopUnit,
        marginBottom: general_setting?.marginBottom,
        marginBottomUnit: general_setting?.marginBottomUnit,        
    };
    setCartNoticeCustomization(data);
    oldState.current = data;
  }, [cartSettings]);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setShowToast(true);
    }
  }, [fetcher.state]);

  return (
    <div className="cartNoticeContainer">
 <Page>
      <ToastBar onDismiss={onDismiss} show={showToast} message="Customization saved" />
      <ManageDataChange
        newState={cartNoticeCustomization}
        prevState={oldState.current}
        handleSaveChanges={handleSaveSettingsData}
        handleDiscardChanges={handleDiscardChanges}
        fetcherState={fetcher.state}
      />
      <ui-title-bar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
          
              <BlockStack gap="400">
                
                
              <CustomColorPallete
                colorHeading={"Background color"}
                onColorChange={(color) => {
                    handleCartNoticeCustomizationChange(color, 'backgroundColor')
                }}
                initialColor={cartNoticeCustomization?.backgroundColor}
              />
              <CustomColorPallete
                colorHeading={"Text color"}
                onColorChange={(color) => {
                    handleCartNoticeCustomizationChange(color, 'textColor')
                }}
                initialColor={cartNoticeCustomization?.textColor}
              />
              </BlockStack>
              <TextField
                  label="Primary text"
                  name="primaryMessage"
                  value={cartNoticeCustomization?.primaryText}
                  onChange={(value) => {
                    handleCartNoticeCustomizationChange(value, 'primaryText')
                  }}
                />
              <TextField
                  label="Secondary text"
                  name="secondaryMessage"
                  value={cartNoticeCustomization?.secondaryText}
                  onChange={(value) => {
                    handleCartNoticeCustomizationChange(value, 'secondaryText')
                  }}
                />
                <div>
                    <Checkbox
                        label="Show countdown timer"
                        helpText="This will include a {{ counter }} tag in the Secondary text. You can reposition the countdown timer anywhere in the Secondary text by moving the tag."
                        checked={cartNoticeCustomization?.showCountdownTimer}
                        onChange={(value) => {
                            setCartNoticeCustomization(prevState => ({
                              ...prevState,
                              showCountdownTimer: value,
                              countdownTimer: 0
                          }))
                        }}
                    />
                    {cartNoticeCustomization?.showCountdownTimer ? <CustomTextField
                        type="number"
                        label={"Countdown timer"}
                        helpText={
                        "The number of minutes until the Cart Notice bar is shown from the moment the visitor opens the cart page. Default is 10 minutes"
                        }
                        value={cartNoticeCustomization?.countdownTimer}
                        onValueChange={(value) => {
                          handleCartNoticeCustomizationChange(value, 'countdownTimer')
                        }}
                        min={0}
                    /> : null}
                    <Checkbox
                        label="Hide the fire icon"
                        checked={cartNoticeCustomization?.hideTheFireIcon}
                        onChange={(value) => {
                            handleCartNoticeCustomizationChange(value, 'hideTheFireIcon')
                        }}
                    />
                </div>
                <div className="input-selector-container">
                <span>Margin</span>
                <InputWithSelector
                    inputType="number"
                    title="Top"
                    inputValue={cartNoticeCustomization?.marginTop}
                    unitValue={cartNoticeCustomization?.marginTopUnit}
                    onValueChange={(value, unit) => {
                      
                        setCartNoticeCustomization(prevState => ({
                            ...prevState,
                            marginTop: value,
                            marginTopUnit: unit
                        }))
                    }}
                />
                <InputWithSelector
                    inputType="number"
                    title="Bottom"
                    inputValue={cartNoticeCustomization?.marginBottom}
                    unitValue={cartNoticeCustomization?.marginBottomUnit}
                    onValueChange={(value, unit) => {
                        setCartNoticeCustomization(prevState => ({
                            ...prevState,
                            marginBottom: value,
                            marginBottomUnit: unit
                        }))
                    }}
                />
                </div>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
    </div>
   
  )
}

export default CustomizationCartNotice
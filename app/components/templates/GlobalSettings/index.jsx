import { Page, Card, Select, Checkbox, RadioButton, TextField, Layout } from '@shopify/polaris';
import { useRef, useState } from 'react';
import './style.css'
import SettingSection from './SettingSection';
import { useFetcher } from '@remix-run/react';
import ManageDataChange from '../ManageDataChange';

const GlobalSettings = ({settings = {}}) => {
  const fetcher = useFetcher();

  const oldSettingRef = useRef({
    language: "English",
    lazyLoadImages : false,
    allowSupportEdit : false,
    theme : "light",
    customCSS : "",
    customJSFirst: "",
    customJSLast: "",
    customJSHook: "",
  })

  const [customization, setCustomization] = useState({
    language: "English",
    lazyLoadImages : false,
    allowSupportEdit : false,
    theme : "light",
    customCSS : "",
    customJSFirst: "",
    customJSLast: "",
    customJSHook: "",
  })

  const updateCustomization = (field, value) => {
    setCustomization(prevState => ({
      ...prevState,
      [field]: value
    }))
  }

  const handleSaveSettingsData = () => {
    fetcher.submit(
      {
        admin_language: customization.language,
        lazy_load_images: customization.lazyLoadImages,
        change_setting: customization.allowSupportEdit,
        color_theme: customization.theme,
        global_customizations: JSON.stringify({
          customCSS: customization.customCSS,
          customJSFirst: customization.customJSFirst,
          customJSLast: customization.customJSLast,
          customJSHook: customization.customJSHook
        })
      },
      { method: "POST", action: "/settings" }
    );
  }

  const handleDiscardChanges = () => {
    setCustomization(oldSettingRef.current)
  }

  useState(() => {
    let data = {
      language: settings.admin_language,
      lazyLoadImages : settings.lazy_load_images,
      allowSupportEdit : settings.change_setting,
      theme : settings.color_theme,
      customCSS : settings.global_customizations?.customCSS,
      customJSFirst: settings.global_customizations?.customJSFirst,
      customJSLast: settings.global_customizations?.customJSLast,
      customJSHook: settings.global_customizations?.customJSHook,
    }
    setCustomization(data);
    oldSettingRef.current = data;
  }, [settings])


  return (
    <Page>
      <ManageDataChange newState={customization} prevState={oldSettingRef.current} handleSaveChanges={handleSaveSettingsData} handleDiscardChanges={handleDiscardChanges}/>
      <Layout>
        {/* Admin language section */}
        <SettingSection heading={"Admin Language"}>
          <Select
            label="Change language"
            options={[
              { label: 'English', value: 'English' },
            ]}
            value={customization.language}
            onChange={(value) => updateCustomization('language', value)}
          />
        </SettingSection>

        {/* Settings section */}
        <SettingSection heading={"Settings"}>        
          <Checkbox
            label="Lazy Load Images"
            helpText="Load images when the visitor scrolls, to speed up the initial page load. This affects all modules that show images: Product Reviews, Product Bundles, Recently Viewed, Related Products."
            checked={customization.lazyLoadImages}
            onChange={(value) => updateCustomization('lazyLoadImages',value)}
          />
          <Checkbox
            label="Allow the BusyBuddy Customer Support team to edit my settings."
            checked={customization.allowSupportEdit}
            onChange={(value) => updateCustomization('allowSupportEdit', value)}
          />
        </SettingSection>

        {/* Storefront color theme section */}
        <SettingSection heading={"Storefront color theme"} subHeading={"Controls the default color settings of the BusyBuddy widgets displayed on your store, so the text and background provide the necessary contrast for reading."}>
          <>
            <RadioButton
              label="Light theme"
              helpText="Default colors for background will generally be white and text will be dark."
              checked={customization.theme === 'light'}
              id="lightTheme"
              name="theme"
              onChange={() => updateCustomization('theme','light')}
            />
            <RadioButton
              label="Dark theme"
              helpText="Default colors for background will generally be dark and text will be white."
              checked={customization.theme === 'dark'}
              id="darkTheme"
              name="theme"
              onChange={() => updateCustomization('theme','dark')}
            />
          </>
        </SettingSection>

        {/* Global Customizations section */}
        <SettingSection heading={"Global Customizations"}>
          <div className="setting-customization">      
            <TextField
              label="Custom CSS"
              value={customization.customCSS}
              onChange={(value) => updateCustomization('customCSS', value)}
              multiline={4}
            />
            <TextField
              label="Custom JS First - runs at the beginning of BusyBuddy."
              value={customization.customJSFirst}
              onChange={(value) => updateCustomization('customJSFirst', value)}
              multiline={4}
            />
            <TextField
              label="Custom JS Last - runs at the end of BusyBuddy."
              value={customization.customJSLast}
              onChange={(value) => updateCustomization('customJSLast', value)}
              multiline={4}
            />
            <TextField
              label="Custom JS Hooks"
              value={customization.customJSHook}
              onChange={(value) => updateCustomization('customJSHook', value)}
              multiline={4}
            />
          </div>
        </SettingSection>
      </Layout>
    </Page>
  );
}

export default GlobalSettings
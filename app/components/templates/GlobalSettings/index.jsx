import { Page, Card, Select, Checkbox, RadioButton, TextField, Layout } from '@shopify/polaris';
import { useState } from 'react';
import './style.css'
import SettingSection from './SettingSection';
import { useFetcher } from '@remix-run/react';

const GlobalSettings = () => {
  const fetcher = useFetcher();
  const handleSaveSettings = () => {
    fetcher.submit(
      {
        widgetId: widgetId,
      },
      { method: "POST", action: "/settings" }
    );
  }
  const [language, setLanguage] = useState('English');
  const [lazyLoadImages, setLazyLoadImages] = useState(true);
  const [allowSupportEdit, setAllowSupportEdit] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [customization, setCustomization] = useState({
    customCSS : "",
    customJSFirst: "",
    customJSLast: "",
    customJSHook: "",
  })
  const [customCSS, setCustomCSS] = useState('');
  const [customJS, setCustomJS] = useState('');

  const updateCustomization = (field, value) => {
    setCustomization(prevState => ({
      ...prevState,
      [field]: value
    }))
  }

  return (
    <Page>
      <Layout>
        {/* Admin language section */}
        <SettingSection heading={"Admin Language"}>
          <Select
            label="Change language"
            options={[
              { label: 'English', value: 'English' },
            ]}
            value={language}
            onChange={(value) => setLanguage(value)}
          />
        </SettingSection>

        {/* Settings section */}
        <SettingSection heading={"Settings"}>        
          <Checkbox
            label="Lazy Load Images"
            helpText="Load images when the visitor scrolls, to speed up the initial page load. This affects all modules that show images: Product Reviews, Product Bundles, Recently Viewed, Related Products."
            checked={lazyLoadImages}
            onChange={(value) => setLazyLoadImages(value)}
          />
          <Checkbox
            label="Allow the BusyBuddy Customer Support team to edit my settings."
            checked={allowSupportEdit}
            onChange={(value) => setAllowSupportEdit(value)}
          />
        </SettingSection>

        {/* Storefront color theme section */}
        <SettingSection heading={"Storefront color theme"} subHeading={"Controls the default color settings of the BusyBuddy widgets displayed on your store, so the text and background provide the necessary contrast for reading."}>
          <>
            <RadioButton
              label="Light theme"
              helpText="Default colors for background will generally be white and text will be dark."
              checked={theme === 'light'}
              id="lightTheme"
              name="theme"
              onChange={() => setTheme('light')}
            />
            <RadioButton
              label="Dark theme"
              helpText="Default colors for background will generally be dark and text will be white."
              checked={theme === 'dark'}
              id="darkTheme"
              name="theme"
              onChange={() => setTheme('dark')}
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
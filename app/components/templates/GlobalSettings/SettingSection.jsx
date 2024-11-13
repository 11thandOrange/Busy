import { Card, Layout } from '@shopify/polaris'
import React from 'react'

const SettingSection = ({children, heading, subHeading}) => {
  return (
    <Layout.Section>
        <div className="setting-section">
            <div className="setting-left-section">
                <div className='heading'>{heading}</div>
                <div className='sub-heading'>{subHeading}</div>
            </div>
            <div className='content'>
                <Card>
                    {children}
                </Card>
            </div>
        </div>
    </Layout.Section>
  )
}

export default SettingSection
import { Tooltip } from '@shopify/polaris'
import React from 'react'

const TooltipHOC = ({children, content}) => {
  return (
    <Tooltip content={content} dismissOnMouseOut>
        {children}
    </Tooltip>
  )
}

export default TooltipHOC
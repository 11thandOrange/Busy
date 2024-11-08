import React from 'react'
import Settings from '../../components/templates/Settings'
import { ANNOUNCEMENT_BAR_TYPES } from '../../constants/announcementBarConfig'

const route = () => {
  return (  
    <div>
       
    <Settings announcementBarType={ANNOUNCEMENT_BAR_TYPES.TEXT}></Settings>
    </div>
  )
}

export default route
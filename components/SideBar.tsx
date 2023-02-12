import React from 'react'
import styles from './Components.module.css'

type Props = {
    showSidebar: boolean
}

function SideBar({showSidebar}: Props) {
  return (
    <div className={showSidebar ? styles.sidebar_container_closed : styles.sidebar_container_opened}>
        <div className={styles.sidebar_wrapper}>

        </div>
    </div>
  )
}

export default SideBar
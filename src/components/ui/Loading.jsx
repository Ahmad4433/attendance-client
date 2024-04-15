import React from 'react'
import {CircularProgress} from '@mui/material'
import style from './loading.module.css'
const Loading = () => {
  return (
    <div className={style.main} >
      <CircularProgress/>
    </div>
  )
}

export default Loading

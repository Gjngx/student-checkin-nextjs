import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import Style from '@/styles/admin.module.css'

function IsLoading() {
  return (
    <div className={Style.loading} >
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
  )
}

export default IsLoading
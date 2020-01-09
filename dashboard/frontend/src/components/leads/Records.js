import React, { Fragment, Component } from 'react'
import RecordsHeader from './RecordsHeader'
import ModalNewBatch from '../cards/ModalNewBatch'

import Stores from './Stores'

export default function Records() {
    return (
        <Fragment>
            <div style={{ paddingTop: '10px', margin: '0' }}>
                <RecordsHeader />
                <ModalNewBatch />
                <Stores />
            </div>
        </Fragment>
    )
}

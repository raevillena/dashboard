import React, { Component, Fragment } from 'react'
import RecordsHeader from './RecordsHeader'
import ModalNewBatch from '../cards/ModalNewBatch'

import Stores from './Stores'


export class Records extends Component {
    render() {
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
}

export default Records

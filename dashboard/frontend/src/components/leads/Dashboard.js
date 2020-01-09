import React, { Fragment } from 'react'

import AutoGrid from '../cards/AutoGrid';

export default function Dashboard() {

  return (
    <Fragment>
      <div style={{ paddingTop: '10px', margin: '0' }}>
        <AutoGrid />
      </div>
    </Fragment>
  )
}

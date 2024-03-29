import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getOngoing } from "../../actions/functions";
import { Redirect } from 'react-router-dom'
import DashboardGrid from '../cards/DashboardGrid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMessage } from '../../actions/messages'

export class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.props.getOngoing()
  }
  static propTypes = {
    getOngoing: PropTypes.func.isRequired,
    records: PropTypes.array.isRequired,
  }

  render() {
    const rec = this.props.records
    if (rec && rec.constructor === Array && rec.length === 0) {
      this.props.createMessage({ recordsInfo: 'No Active Distillation Batch' })
      return <Redirect to="/records" />
    }
    else if (rec[0] === "noActive") {
      return (
        <Fragment>
          <div className="d-flex justify-content-center align-middle" style={{ paddingTop: '10px', margin: '0' }}>
            <CircularProgress />
          </div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <div style={{ paddingTop: '10px', margin: '0' }}>
            <DashboardGrid />
          </div>
        </Fragment>
      )
    }
  }
}

const mapStateToProps = state => ({
  records: state.ongoing.records
})

export default connect(mapStateToProps, { getOngoing, createMessage })(Dashboard)


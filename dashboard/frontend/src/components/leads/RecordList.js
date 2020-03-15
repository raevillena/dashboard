import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress';
import { getRecords, deleteRecord, setStart, setEnd } from '../../actions/functions'

export class RecordList extends Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    getRecords: PropTypes.func.isRequired,
    deleteRecord: PropTypes.func.isRequired,
    setStart: PropTypes.func.isRequired,
    setEnd: PropTypes.func.isRequired
  }

  computeduration = (microsec) => {
    if (microsec) {
      const min = parseInt(microsec) / 60000
      if (Math.floor(min) < 60) {
        return `${Math.floor(min)}mins`
      } else {
        return `${Math.floor(min / 60)}Hrs ${Math.floor(min % 60)}mins`
      }
    } else {
      return '0mins'
    }
  }

  handledate = (timestamp) => {
    if (timestamp) {
      return new Date(parseInt(timestamp)).toLocaleTimeString("en-US")
    } else {
      return '0mins'
    }
  }

  componentDidMount() {
    this.props.getRecords()
  }
  render() {
    const rec = this.props.records
    if (rec && rec.constructor === Array && rec.length === 0) {
      return (
        <Fragment>
          <div className="d-flex justify-content-center align-middle">
            <h2>No Record Added Yet</h2>
          </div>
        </Fragment>
      )
    } else if (rec[0] === "noRecord") {
      return (
        <Fragment>
          <div className="d-flex justify-content-center align-middle" style={{ paddingTop: '10px', margin: '0' }}>
            <CircularProgress />
          </div>
        </Fragment>
      )
    }
    else {
      return (
        <Fragment>
          <h2>Records</h2>
          <div key="records-table" className="table-responsive">
            <table className="table table-stripped m-auto">
              <thead className="thead-light">
                <tr>
                  <th>Record ID</th>
                  <th>Start</th>
                  <th>Duration</th>
                  <th>End</th>
                  <th>Ethanol Volume</th>
                  <th>Status</th>
                  <th />
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.records.map(record => (
                  <tr key={record.recordID}>
                    <td>{record.recordID}</td>
                    <td>{this.handledate(record.start)}</td>
                    <td>{this.computeduration(record.duration)}</td>
                    <td>{this.handledate(record.end)}</td>
                    <td>{record.output_volume}</td>
                    <td>{record.status}</td>
                    <td> <button onClick={this.props.deleteRecord.bind(this, record.recordID)} className="btn btn-danger btn-sm"> Delete</button></td>
                    <td> <button onClick={this.props.setStart.bind(this, record.recordID, 'Active')} className="btn btn-success btn-sm" disabled={record.status === 'Active' || record.status === 'Finished'}> Start</button></td>
                    <td> <button onClick={this.props.setEnd.bind(this, record.recordID, record.start, 'Finished')} className="btn btn-success btn-sm" disabled={record.status === 'Finished' || record.status === ''}> End</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Fragment>
      )
    }
  }
}


const mapStateToProps = state => ({
  records: state.records.records
})

export default connect(mapStateToProps, { getRecords, deleteRecord, setStart, setEnd })(RecordList)

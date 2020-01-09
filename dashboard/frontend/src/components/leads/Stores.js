import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getStores, deleteStore } from '../../actions/functions'

export class Stores extends Component {
  static propTypes = {
    records: PropTypes.array.isRequired,
    getStores: PropTypes.func.isRequired,
    deleteStore: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getStores()
  }
  render() {
    return (
      <Fragment>
        <h2>Records</h2>
        <div className="table-responsive">
          <table className="table table-stripped m-auto">
            <thead className="thead-light">
              <tr>
                <th>Batch ID</th>
                <th>Start</th>
                <th>Duration</th>
                <th>End</th>
                <th>Ethanol Volume</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.records.map(record => (
                <tr key={record.recordID}>
                  <td>{record.recordID}</td>
                  <td>{record.start}</td>
                  <td>{record.duration}</td>
                  <td>{record.end}</td>
                  <td>{record.output_volume}</td>
                  <td>{record.status}</td>
                  <td> <button onClick={this.props.deleteStore.bind(this, record.recordID)} className="btn btn-danger btn-sm"> Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    )
  }
}


const mapStateToProps = state => ({
  records: state.records.records
})

export default connect(mapStateToProps, { getStores, deleteStore })(Stores)

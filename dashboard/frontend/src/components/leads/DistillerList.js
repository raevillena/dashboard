import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress';
import { getDistillers, deleteDistiller } from '../../actions/functions'

export class DistillerList extends Component {
    static propTypes = {
        distillers: PropTypes.array.isRequired,
        getDistillers: PropTypes.func.isRequired,
        deleteDistiller: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getDistillers()
    }
    render() {
        const dis = this.props.distillers
        if (dis && dis.constructor === Array && dis.length === 0) {
            return (
                <Fragment>
                    <div className="d-flex justify-content-center align-middle">
                        <h2>No Distiller Added Yet</h2>
                    </div>
                </Fragment>
            )
        } else if (dis[0] === "noDistiller") {
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
                    <h2>Distiller List</h2>
                    <div className="table-responsive">
                        <table className="table table-stripped m-auto">
                            <thead className="thead-light">
                                <tr key="distiller-table">
                                    <th>Distiller ID</th>
                                    <th>Name</th>
                                    <th>Capacity</th>
                                    <th>Payload Topic</th>
                                    <th>Description</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.distillers.map(distiller => (
                                    <tr key={distiller.id}>
                                        <td>{distiller.id}</td>
                                        <td>{distiller.name}</td>
                                        <td>{distiller.capacity}</td>
                                        <td>{distiller.topic}</td>
                                        <td>{distiller.description}</td>
                                        <td> <button onClick={this.props.deleteDistiller.bind(this, distiller.id)} className="btn btn-danger btn-sm"> Delete</button></td>
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
    distillers: state.records.distillers
})

export default connect(mapStateToProps, { getDistillers, deleteDistiller })(DistillerList)

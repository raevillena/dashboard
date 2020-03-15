//import react components
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
//import ui progress component
import CircularProgress from '@material-ui/core/CircularProgress';
//import record functions
import { getDistillers, deleteDistiller } from '../../actions/functions'
//import action for add button
import ModalNewDistiller from '../cards/ModalNewDistiller'
//import material table component
import MaterialTable, { MTableToolbar } from 'material-table';
//import icons
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DeleteIcon from '@material-ui/icons/Delete';

export class DistillersTable extends Component {
  state = {
    columns: [
      { title: 'Distiller ID', field: 'id' },
      { title: 'Name', field: 'name' },
      { title: 'Capacity', field: 'capacity' },
      { title: 'Payload Topic', field: 'topic' },
      { title: 'Description', field: 'description' },
    ],
  }
  static propTypes = {
    distillers: PropTypes.array.isRequired,
    getDistillers: PropTypes.func.isRequired,
    deleteDistiller: PropTypes.func.isRequired
  }

  componentDidMount() {
    if (this.props.distillers[0] === "noDistiller") {
      this.props.getDistillers()
    }
  }

  render() {
    const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
      DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
      ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
      Start: forwardRef((props, ref) => <PlayArrowIcon {...props} ref={ref} />),
      End: forwardRef((props, ref) => <StopIcon {...props} ref={ref} />),
    }

    const rec = this.props.distillers
    if (rec && rec.constructor === Array && rec.length === 0) {
      return (
        <Fragment>
          <div className="d-flex justify-content-center align-middle">
            <h2>No Distiller Added Yet</h2>
          </div>
        </Fragment>
      )
    } else if (rec[0] === "noDistiller") {
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
          <MaterialTable
            icons={tableIcons}
            title="Distiller List"
            columns={this.state.columns}
            data={this.props.distillers}
            components={{
              Toolbar: props => (
                <div style={{ paddingLeft: 5 }}>
                  <MTableToolbar {...props} />
                  <ModalNewDistiller />
                </div>
              )
            }}
            options={{
              pageSizeOptions: [5, 10, 20, 50, { value: rec.length, label: "All" }]
            }}
            actions={[
              {
                icon: () => <div style={{ paddingLeft: 30, paddingRight: 30 }}><DeleteIcon /></div>,
                tooltip: 'Remove Distiller',
                onClick: (event, rowData) => this.props.deleteDistiller(rowData.id),
                //disabled: rowData.status == "Finished"
              },

            ]}
          />
        </Fragment>
      )
    }
  }
}


const mapStateToProps = state => ({
  distillers: state.records.distillers,
})

export default connect(mapStateToProps, { getDistillers, deleteDistiller })(DistillersTable)

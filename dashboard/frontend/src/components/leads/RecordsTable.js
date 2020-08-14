//import react components
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
//import ui progress component
import CircularProgress from '@material-ui/core/CircularProgress';
//import record functions
import { getRecords, deleteRecord, setStart, setEnd } from '../../actions/functions'
//import action for add button
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import ModalNewBatch from '../cards/ModalNewBatch'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import RecordFormUpdateBatch from './RecordFormUpdateBatch'
import RecordsViewChartComponent from './RecordsViewChartComponent'
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
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';



const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  paper: {
    textAlign: 'center',
  },
});

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '80%',
      maxWidth: '85%',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 300,
      maxWidth: 400,
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: 400,
      maxWidth: 500,
    },
    backgroundColor: 'white',
    //border: '2px solid #000',
    boxShadow: '3px 4px 16px -8px rgba(0,0,0,0.75)',
    padding: '10px',
  },
  paper2: {
    [theme.breakpoints.down('sm')]: {
      minWidth: '80%',
      maxWidth: '85%',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '70%',
      maxWidth: '75%',
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '70%',
      maxWidth: '75%',
    },
    backgroundColor: 'white',
    //border: '2px solid #000',
    boxShadow: '3px 4px 16px -8px rgba(0,0,0,0.75)',
    paddingTop: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
});

export class RecordsTable extends Component {
  state = {
    columns: [
      { title: 'Batch ID', field: 'recordID' },
      { title: 'Description', field: 'sap_remarks' },
      { title: 'Start', field: 'start', render: rowData => this.handledate(rowData.start) },
      { title: 'Duration', field: 'duration', render: rowData => this.computeduration(rowData.duration) },
      { title: 'End', field: 'end', render: rowData => this.handledate(rowData.end) },
      { title: 'Volume', field: 'output_volume' },
      { title: 'Status', field: 'status', defaultSort: 'asc' },
    ],
    openDownload: false,
    openView: false,
    openEdit: false,
    updateData: null

  }
  static propTypes = {
    records: PropTypes.array.isRequired,
    ongoing: PropTypes.array.isRequired,
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

  handleOpen = (mode, data) => {
    if (mode === "edit") {
      this.setState({ openEdit: true, updateData: data })
    } else if (mode === "view") {
      this.setState({ openView: true, updateData: data })
    }
  }
  handleClose = (mode) => {
    if (mode === "edit") {
      this.setState({ openEdit: false })
    } else if (mode === "view") {
      this.setState({ openView: false })
    }
  }

  componentDidMount() {
    if (this.props.records[0] === "noRecord") {
      this.props.getRecords()
    }
  }

  render() {
    const { classes } = this.props
    const { openEdit, openView, openDownload, updateData } = this.state
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
        null
      )
    }
    else {
      return (
        <MuiThemeProvider theme={theme}>
          <Fragment>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openEdit}
              onClose={() => this.handleClose('edit')}
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openEdit}>
                <div className={classes.paper}>
                  <h3>Batch Data</h3>
                  <RecordFormUpdateBatch updateData={updateData} />
                  <Button onClick={() => this.handleClose('edit')} color="primary">
                    Cancel
                  </Button>
                </div>
              </Fade>
            </Modal>
          </Fragment>
          <Fragment>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openView}
              onClose={() => this.handleClose('view')}
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openView}>
                <div className={classes.paper2}>
                  <h3>Batch Data</h3>
                  <RecordsViewChartComponent record={updateData} cancel={this.handleClose.bind(this)} />
                </div>
              </Fade>
            </Modal>
          </Fragment>
          <Fragment>
            <MaterialTable
              icons={tableIcons}
              title="Distillation Records"
              columns={this.state.columns}
              data={this.props.records}
              components={{
                Toolbar: props => (
                  <div style={{ paddingLeft: 5 }}>
                    <MTableToolbar {...props} />
                    <ModalNewBatch />
                  </div>
                )
              }}
              options={{
                pageSizeOptions: [5, 10, 20, 50, { value: rec.length, label: "All" }]
              }}
              actions={[
                rowData => ({
                  icon: () => <PlayArrowIcon />,
                  tooltip: 'Start Distillation',
                  onClick: (event, rowData) => this.props.setStart(rowData.recordID, 'Active'),
                  disabled: rowData.status == "Finished" || rowData.start ? true : false || this.props.ongoing.length > 0 ? true : false
                }),
                rowData => ({
                  icon: () => <StopIcon />,
                  tooltip: 'End Distillation',
                  onClick: (event, rowData) => this.props.setEnd(rowData.recordID, rowData.start, 'Finished'),
                  disabled: rowData.status == "Finished" || rowData.end ? true : false || rowData.start == ""
                }),
                rowData => ({
                  icon: () => <VisibilityIcon />,
                  tooltip: 'View Data',
                  onClick: (event, rowData) => this.handleOpen('view', { id: rowData.recordID, name: rowData.sap_remarks }),
                  disabled: rowData.status == "Active" || rowData.start == ""
                }),
                rowData => ({
                  icon: () => <EditIcon />,
                  tooltip: 'Edit Data',
                  onClick: (event, rowData) => this.handleOpen('edit', rowData),
                  disabled: rowData.status == "Active" || rowData.start == ""
                }),
                rowData => ({
                  icon: () => <DeleteIcon />,
                  tooltip: 'Delete Record',
                  onClick: (event, rowData) => this.props.deleteRecord(rowData.recordID),
                  disabled: rowData.status == "Finished"
                })
              ]}
            />
          </Fragment>
        </MuiThemeProvider>
      )
    }
  }
}


const mapStateToProps = state => ({
  records: state.records.records,
  ongoing: state.ongoing.records
})

export default connect(mapStateToProps, { getRecords, deleteRecord, setStart, setEnd })(withStyles(styles)(RecordsTable))

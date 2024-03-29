import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import SimpleCardSapOverview from './SimpleCardSapOverview';

const styles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '30%',
        backgroundColor: 'white',
        //border: '2px solid #000',
        boxShadow: '3px 4px 16px -8px rgba(0,0,0,0.75)',
        padding: '10px',
    },
};

function ModalViewSap(props) {
    const { classes } = props;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button type="button" variant="outlined" color="primary" onClick={handleOpen}>
                View Sap Specifications
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <SimpleCardSapOverview />
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

ModalViewSap.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(ModalViewSap)

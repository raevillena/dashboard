import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import DistillerFormNew from '../leads/DistillerFormNew';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { mdiPlusCircle } from '@mdi/js';

const useStyles = makeStyles(theme => ({
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
}));

function ModalNewDistiller(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton aria-label="New Batch" onClick={handleOpen} size="medium">
                <SvgIcon><path d={mdiPlusCircle} /></SvgIcon>New
            </IconButton>
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
                        <h3>Distiller Device</h3>
                        <DistillerFormNew />
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}


export default ModalNewDistiller

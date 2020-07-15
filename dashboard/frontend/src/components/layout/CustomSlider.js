import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { appbarColor } from '../constants/colors'

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';


export const CustomSlider = withStyles({
    root: {
        color: appbarColor,
        height: 10,
        padding: '25px 0',
        top:2
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        boxShadow: iOSBoxShadow,
        marginTop: -7,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
            },
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 7px)',
        top: -22,
        '& *': {
            background: 'transparent',
            color: '#000',
        },
    },
    track: {
        height: 10,
    },
    rail: {
        height: 10,
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    mark: {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        marginTop: -3,
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
})(Slider);
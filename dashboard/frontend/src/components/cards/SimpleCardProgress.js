import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Progress } from 'react-sweet-progress'
import "react-sweet-progress/lib/style.css"


const styles = {
    card: {
        minWidth: 300,
        maxWidth: 400,
        minHeight: 250,
        maxHeight: 250,
        marginRight: '15px',

        boxShadow: '3px 4px 16px -8px rgba(0,0,0,0.75)'
    },
    title: {
        fontSize: 14,
        paddingRight: '400px'
    },
    pos: {
        marginRight: '15px',
        marginBottom: '15px',
    },
};
export class SimpleCardProgress extends Component {

    render() {
        const { classes, progress } = this.props
        let status

        if (progress >= 0 && progress <= 30) {
            status = 'error'
        } else if (progress >= 31 && progress <= 50) {
            status = 'active'
        } else if (progress >= 51 && progress <= 99) {
            status = 'default'
        } else if (progress == 100) {
            status = 'success'
        } else {
            status = 'default'
        }

        return (
            <div>
                <Card className={classes.card} >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Progress
            </Typography>
                    </CardContent>
                    <div className="d-flex justify-content-center">
                        <Progress

                            theme={
                                {
                                    error: {//red
                                        symbol: progress + '%',
                                        trailColor: 'pink',
                                        color: '#dd5454'
                                    },
                                    default: {//blue
                                        symbol: progress + '%',
                                        trailColor: '#efefef',
                                        color: '#45a4e8'
                                    },
                                    active: {//yellow
                                        symbol: progress + '%',
                                        trailColor: '#f4e8be',
                                        color: '#f7b531'
                                    },
                                    success: {//green
                                        symbol: progress + '%',
                                        trailColor: 'lime',
                                        color: 'green'
                                    }
                                }
                            }
                            type="circle"
                            status={status}
                            strokeWidth={13}
                            width={160}
                            percent={progress}
                        />
                    </div>
                </Card>
            </div>
        )
    }
}

SimpleCardProgress.propTypes = {
    classes: PropTypes.object.isRequired,
    progress: PropTypes.number
};
const mapStateToProps = state => ({
    progress: state.payload.progress
})

export default connect(mapStateToProps, {})(withStyles(styles)(SimpleCardProgress))

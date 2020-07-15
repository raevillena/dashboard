import React, { Component, Fragment } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Bar } from 'react-chartjs-2'
import "hammerjs";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCondenserData } from "../../actions/functions";

export class ConsumptionBarChart extends Component {
    static propTypes = {
        timeData: PropTypes.array.isRequired,
        ongoing: PropTypes.array.isRequired,
        condenserData: PropTypes.array.isRequired,
        kettleData: PropTypes.array.isRequired,
        getCondenserData: PropTypes.func.isRequired,

    };

    render() {
        var data = {
            labels: ['8 am', '9 am', '10 am', '11 am', '12 am', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm'],//[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            datasets: [
                {
                    label: "Condenser",
                    data: [200, 333, 212, 123, 132, 244, 234, 111, 222, 213],//[{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }],
                    fill: false,
                    borderWidth: 1.5,
                    borderColor: 'rgba(32, 232, 119, 1)',
                    backgroundColor: 'rgba(32, 232, 119, 1)',
                    pointRadius: 0,
                    pointHoverRadius: 5,
                },
            ]
        };

        var options = {
            beginAtZero: true,
            responsive: true,
            maintainAspectRatio: false,
            //animation: false,
            animation: {
                duration: 0,
                easing: 'easeOutExpo'
            },
            tooltips: {
                position: 'nearest',
                mode: 'index',
                intersect: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            },
        };
        return (
            <Fragment>
                <div>
                    <Bar data={data} height={200} options={options} ref={(reference) => this.lineReference = reference} />
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    timeData: state.payload.timeData,
    condenserData: state.payload.condenserData,
    kettleData: state.payload.kettleData,
    ongoing: state.ongoing.records
})

export default connect(mapStateToProps, { getCondenserData })(ConsumptionBarChart)
import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addStore } from "../../actions/functions";


export class FormNewBatch extends Component {
  state = {
    sap_brix: 0,
    sap_volume: 0,
    sap_origin: "",
    sap_fermentation: 0,
    sap_date_collected: ""
  };

  static propTypes = {
    addStore: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { sap_brix, sap_volume, sap_origin, sap_fermentation, sap_date_collected } = this.state;
    const record = { sap_brix, sap_volume, sap_origin, sap_fermentation, sap_date_collected };
    this.props.addStore(record);
    this.setState({
      sap_brix: 0,
      sap_volume: 0,
      origin: "",
      sap_fermentation: 0,
      sap_date_collected: ""
    });
  };

  render() {
    const {
      sap_brix,
      sap_volume,
      sap_origin,
      sap_fermentation,
      sap_date_collected
    } = this.state;
    return (
      <div className="card card-body mt-4 mb-4" style={{ marginTop: '16px' }}>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Brix</label>
            <input
              className="form-control"
              type="text"
              name="sap_brix"
              onChange={this.onChange}
              value={sap_brix}
            />
          </div>
          <div className="form-group">
            <label>Volume</label>
            <textarea
              className="form-control"
              type="text"
              name="sap_volume"
              onChange={this.onChange}
              value={sap_volume}
            />
          </div>
          <div className="form-group">
            <label>Origin</label>
            <textarea
              className="form-control"
              type="text"
              name="sap_origin"
              onChange={this.onChange}
              value={sap_origin}
            />
          </div>
          <div className="form-group">
            <label>Duration of Fermentation</label>
            <textarea
              className="form-control"
              type="text"
              name="sap_fermentation"
              onChange={this.onChange}
              value={sap_fermentation}
            />
          </div>
          <div className="form-group">
            <label>Date Collected</label>
            <textarea
              className="form-control"
              type="text"
              name="sap_date_collected"
              onChange={this.onChange}
              value={sap_date_collected}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addStore })(FormNewBatch)

import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./UserDashboardNoPackage.css";

export default class HeaderCardsNoPackage extends Component {
  constructor(props) {
    super(props);

    this.onNavigate = this.onNavigate.bind(this);

    this.state = {
      response: "",
    };
  }

  componentDidMount() {
    //reset the state after 9 seconds
    this.interval = setInterval(() => this.setState({ response: "" }), 4000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onNavigate(e) {
    this.setState({
      response: "You must select a gym package to activate this feature",
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 col-xl-12">
          {this.state.response ? (
            <p
              style={{
                padding: "10px",
                color: "white",
                backgroundColor: "red",
                fontFamily: "Tahoma, Geneva, sans-serif",
              }}
              className="text-center"
            >
              {this.state.response}
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="col-md-6 col-xl-3 mb-4 headerDumbell ">
          <Link
            to="#"
            onClick={this.onNavigate}
            style={{ textDecoration: "none" }}
          >
            <div className=" card shadow border-left-primary py-2">
              <div className="card-body headerOptions">
                <div className="row align-items-center no-gutters">
                  <div className="col mr-2">
                    <div className="text-uppercase text-primary font-weight-bold text-md mb-1">
                      <span>Workout Tracker</span>
                    </div>
                    <div className="text-dark font-weight-bold text-xs mb-0">
                      <span>Track Your Burned Calories</span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dumbbell fa-2x headericonDumbell"></i>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-xl-3 mb-4 headerMeal">
          <Link
            to="#"
            onClick={this.onNavigate}
            style={{ textDecoration: "none" }}
          >
            <div className="card shadow border-left-success py-2">
              <div className="card-body headerOptions">
                <div className="row align-items-center no-gutters">
                  <div className="col mr-2">
                    <div className="text-uppercase text-success font-weight-bold text-md mb-1">
                      <span>Meal Tracker</span>
                    </div>
                    <div className="text-dark font-weight-bold text-xs mb-0">
                      <span>Track The Calories For Your Foods </span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-utensils fa-2x iconheaderMeal"></i>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-xl-3 mb-4 headerRequest">
          <Link
            to="#"
            onClick={this.onNavigate}
            style={{ textDecoration: "none" }}
          >
            <div className="card shadow border-left-info py-2">
              <div className="card-body headerOptions">
                <div className="row align-items-center no-gutters">
                  <div className="col mr-2">
                    <div className="text-uppercase text-info font-weight-bold text-md mb-1">
                      <span>Request</span>
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="text-dark font-weight-bold text-xs mb-0 mr-3">
                          <span>A Plan From Your Instructor</span>
                        </div>
                      </div>
                      <div className="col"></div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-bullhorn fa-2x iconheaderRequest"></i>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-6 col-xl-3 mb-4 headerShopping">
          <Link to="/Shop" style={{ textDecoration: "none" }}>
            <div className="card shadow border-left-warning py-2">
              <div className="card-body headerOptions">
                <div className="row align-items-center no-gutters">
                  <div className="col mr-2">
                    <div className="text-uppercase text-warning font-weight-bold text-md mb-1">
                      <span>Shopping</span>
                    </div>
                    <div className="text-dark font-weight-bold text-xs mb-0">
                      <span>Buy Everything You Need </span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-shopping-cart fa-2x iconheaderShopping"></i>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

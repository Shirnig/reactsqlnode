import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import NavBar from "./NavBar";
import {authenticate, fetchVacations} from "../Actions";
const _ = require('lodash');

class FollowChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        if(this.props.isAuthenticated === false){
            this.props.history.push('/login')
        }
        if (this.props.vacations.length > 0) {
            const user = this.props.vacations[0].metadata[0][0];
            return (
                <div className="container-fluid">
                    <div className="row">
                        <NavBar user={user} chartMode={true} pushHome={()=>this.props.history.push('/home')}/>
                    </div>
                    <div className="container" style={{marginTop: "54px"}}>
                        <Bar
                            data={this.state.data}
                            width={70}
                            height={30}
                            options={{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            stepSize: 1,
                                        },
                                        gridLines: {
                                            display: true
                                        }
                                    }],
                                    xAxes: [{
                                        gridLines: {
                                            display: false
                                        }
                                    }]
                                }
                            }}
                        />
                    </div>
                </div>)
        }
        else {
            return null
        }
    }


    componentDidMount() {
        this.props.authenticate();
        axios.get(`http://localhost:4000/vacations/chart`).then(({data}) => {
            const labels = _.map(data, function(v){return v.destination + ' , ID:' + v.id});
            const count = _.map(data, 'count(*)');
            const length = count.length;
            const backgroundColor = _.times(length, () => {
                return 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + 0.5 + ')';
        });

            this.setState({
                data: {
                    labels: labels,
                    datasets: [{
                        label: '# of Followers Per Company',
                        data: count,
                        backgroundColor: backgroundColor
                    }]
                }
            })
        })

    }
}


const mapDispatchToProps = dispatch => {
    return {
        authenticate: () => dispatch(authenticate())
    }
};


const mapStateToProps = state => {
    return {
        vacations: state.vacations,
        isAuthenticated: state.isAuthenticated
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(FollowChart)

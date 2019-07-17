import React from "react";
import {connect} from "react-redux";
import {fetchVacations, updateFollow, updateUnfollow, deleteVacation, authenticate} from "../Actions";
import VacationDetails from "./VacationDetails";
import WarningBox from "./WarningBox";
import NavBar from "./NavBar";
import VacationsCards from "./VacationsCards";

const _ = require('lodash');


class HomeUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVacationId: null,
            showVacationModal: false,
            currentVacation: {},
            addMode: false,
            showWarning: false
        }
    }



    followVac(vacationID, status){
        this.props.updateFollow(vacationID, status);
    }


    unFollowVac(vacationID, status){
        this.props.updateUnfollow(vacationID, status);
    }

    onClickDelete(){
        this.props.deleteVacation(this.state.currentVacationId)
    }


    render() {
        if(this.props.isAuthenticated === false){
            this.props.history.push('/login')
        }
            if (this.props.vacations.length > 0) {
                const vacations = this.props.vacations[0].data;
                const user = this.props.vacations[0].metadata[0][0];
                console.log('render home', vacations);
                return (<>

                        {this.state.showVacationModal ?
                            <VacationDetails show={this.state.showVacationModal} setShow={(value)=>{this.setState(value)}} vacation={this.state.currentVacation}
                                             mode={this.state.addMode} vacationId={this.state.currentVacationId}/> : null}

                        {this.state.showWarning ?
                            <WarningBox deleteVac={()=>this.onClickDelete()} showWarning={this.state.showWarning}
                                            setShowWarning={(value)=>{this.setState(value)}}/> : null}

                            <div className="container-fluid">
                                <div className="row">
                                <NavBar user={user} pushChart={()=>this.props.history.push('/chart')} setFatherState={(update)=>{this.setState(update)}}/>
                                </div>
                                <VacationsCards user={user} vacations={vacations} setFatherState={(update)=>{this.setState(update)}}
                                                followVac={(vacationID, status)=>this.followVac(vacationID, status)}
                                                unFollowVac={(vacationID, status)=>this.unFollowVac(vacationID, status)}/>
                            </div>
                        </>)
                }
                else{
                    return null
                }
            }



    componentDidMount() {
        this.props.authenticate();
        this.props.fetchVacations();
    }


}


const mapDispatchToProps = dispatch => {
    return {
        fetchVacations: () => dispatch(fetchVacations()),
        updateFollow: (vacationId, status) => dispatch(updateFollow(vacationId, status)),
        updateUnfollow: (vacationId, status) => dispatch(updateUnfollow(vacationId, status)),
        deleteVacation: (vacationId) => dispatch(deleteVacation(vacationId)),
        authenticate: () => dispatch(authenticate())
    }
};


const mapStateToProps = state => {
    return {
        vacations: state.vacations,
        isAuthenticated: state.isAuthenticated
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(HomeUsers);

import React from "react";
import styled from "styled-components";

const moment = require('moment');



export default function VacationsCards({user,vacations,setFatherState,followVac,unFollowVac}){

    function updateFollowing(isFollow, vacationID, status){
        if(isFollow === 'unfollow'){
            followVac(vacationID, status)
        }
        else if(isFollow === 'follow') {
            unFollowVac(vacationID, status)
        }
    }


    if(vacations.length === 0) {
        return null
    }
    return(
        <CardStyled className="container-fluid">
                <div className="container" style={{marginTop: "54px"}}>
                    <div className="row">
                        {vacations.map((row, idx) =>
                            <div className="col-4" key={idx}>
                                <div className="card card-custom bg-white border-white border-0">
                                    <div className="card-custom-img" style={{backgroundImage: `url(${`../uploads/${row.img_url}`})`
                                    }}></div>
                                    <div className="card-body">
                                        <h4 className="card-title">{row.destination}</h4>
                                        {!user['is_admin'] ? row.is_follow ? <span><i className="fas fa-star fa-lg" title="unfollow vacation" onClick={()=>updateFollowing('follow', row.id, null)}/>
                                <i className="far fa-star fa-lg d-none"  title="follow vacation" onClick={()=>updateFollowing('unfollow', row.id, true)}/></span>
                                            :<span><i className="far fa-star fa-lg" title="follow vacation" onClick={()=>updateFollowing('unfollow', row.id, true)}/>
                                <i className="fas fa-star fa-lg d-none"  title="unfollow vacation" onClick={()=>updateFollowing('follow', row.id, null)}/></span>
                                            : null}

                                        <p className="card-text">{moment.unix(row.from_date).format('LL')} - {moment.unix(row.to_date).format('LL')}</p>
                                        <p className="card-text description">{row.description}</p>
                                        <p className="card-text price">Special Offer: {row.price}$</p>
                                    </div>
                                    <div className="card-footer">
                                        {user['is_admin'] ? <span className="footer">
                                            <i className="fas fa-edit fa-lg" onClick={()=>{setFatherState({
                                                showVacationModal: true,
                                                currentVacation: row,
                                                currentVacationId: row.id,
                                                addMode:false})}}/>
                                            <i className="far fa-trash-alt fa-lg" onClick={()=>{setFatherState({
                                                currentVacationId: row.id,
                                                showWarning: true})}}/>
                                        </span> : null}
                                    </div>
                                </div>
                            </div>)}
                    </div>
                </div>
            </CardStyled>
    )
}

const CardStyled = styled.div`

  .container-fluid {
    padding: 0px !important;
  }

  .card-custom {
  overflow: hidden;
  height: 500px;
  box-shadow: 0 0 15px rgba(10, 10, 10, 0.3);
  margin-bottom: 12px;
}

.card-custom-img {
  height: 200px;
  min-height: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-color: inherit;
}

/* First border-left-width setting is a fallback */
.card-custom-img::after {
  position: absolute;
  content: '';
  top: 161px;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-top-width: 40px;
  border-right-width: 0;
  border-bottom-width: 0;
  border-left-width: 545px;
  border-left-width: calc(575px - 5vw);
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: inherit;
}


.description {
  height: 100px;
  overflow-y: auto;
  ::-webkit-scrollbar
{
	width: 3px;
	background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
	-webkit-box-shadow: inset 0 0 1px rgba(0,0,0,.3);
	background-color: #555;
}
}

.price {
  position: absolute;
  bottom: 65px;
}

.far, .fas {
 cursor: pointer;
}

.fa-star {
 position: absolute;
 top: 227px;
 right: 40px;
}

.footer {
 float: right;
}

.fa-edit {
  margin-right: 3px;
}
`;


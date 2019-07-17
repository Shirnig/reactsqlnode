import React from "react";
import styled from "styled-components";

export default function NavBar({user,pushChart,pushHome,setFatherState,chartMode}){
    return (<NavBarStyled>
                <ul id="menu-bar">
                    <li className="username">Welcome {user['user_name']}</li>

                    {chartMode ? <li className="home" onClick={()=>pushHome()}><i className="fas fa-home fa-lg" title="vacations"/></li>
                        : user['is_admin'] ? <li className="chart" onClick={()=>pushChart()}>
                                <i className="fas fa-chart-bar fa-lg" title="chart"/></li>
                            : null}

                    {chartMode ? null: user['is_admin'] ? <li className="add" onClick={()=>{
                        setFatherState({
                            showVacationModal: true,
                            currentVacation: {},
                            addMode: true
                        })}}><i className="fas fa-plus-square fa-lg" title="add vacation"/></li> : null}
                </ul>
        </NavBarStyled>
    )
}



const NavBarStyled = styled.div`
   #menu-bar {
  width: 100%;
  margin: 0px 0px 0px 0px;
  padding: 6px 6px 4px 6px;
  height: 40px;
  line-height: 100%;
  //border-radius: 0px;
  //-webkit-border-radius: 8px;
  //-moz-border-radius: 8px;
  box-shadow: 2px 2px 3px #666666;
  -webkit-box-shadow: 2px 2px 3px #666666;
  -moz-box-shadow: 2px 2px 3px #666666;
  background: #44528B;
  border: solid 1px #6D6D6D;
  position:fixed;
  z-index:999;
 }
 
 #menu-bar li {
  margin: 0px 0px 6px 0px;
  position: relative;
  list-style: none;
  font-weight: normal;
  font-family: verdana, sans-serif;
  font-style: normal;
  font-size: 12px;
  color: #FBFFF7;
  text-decoration: none;
  display: block;
}

.username {
  float: left;
  padding: 6px 20px 6px 20px;
}

.add, .chart, .home {
  float: right;
  padding: 6px 20px 6px 0px;
  cursor: pointer;
}
`;


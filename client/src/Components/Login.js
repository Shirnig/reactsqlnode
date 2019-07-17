import React from "react";
import {authenticate, login} from "../Actions";
import {connect} from "react-redux";
import styled, {createGlobalStyle} from "styled-components";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onChange(field, value) {
        this.setState({
            [field]: value
        })
    }

    onClick() {
        this.props.login(this.state);
        this.setState({
            username: '',
            password: ''
        })
    }

    onClickRegister() {
        this.props.history.push('/sign-up/');
    }

    render() {
        if(this.props.isAuthenticated === true){
            this.props.history.push('/home/')
        }
         return (<LoginStyled>
                  <GlobalStyle/>
                    <div className="login">
                        <h1>Login</h1>
                        <input type="text" value={this.state.username} placeholder="Username" required="required"
                               onChange={({target}) => this.onChange('username', target.value)}/><br/>
                        <input type="password" value={this.state.password} placeholder="Password" required="required"
                               onChange={({target}) => this.onChange('password', target.value)}/><br/>
                        <button className="btn btn-primary btn-block btn-large" onClick={() => this.onClick()}>Login
                        </button>
                        <button className="btn btn-primary btn-block btn-large"
                                onClick={() => this.onClickRegister()}>Registration
                        </button>
                    </div>
                </LoginStyled>)
    }


    componentDidMount(){
        this.props.authenticate();
    }
}


const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(login(user)),
        authenticate: () => dispatch(authenticate()),
    }
};


const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);


const GlobalStyle = createGlobalStyle`
  * { 
      -webkit-box-sizing:border-box; 
      -moz-box-sizing:border-box; 
      -ms-box-sizing:border-box; 
      -o-box-sizing:border-box; 
      box-sizing:border-box; }


  html { 
    width: 100%; 
    height:100%; 
    overflow:hidden; 
  }

  body {
    width: 100%;
    height: 100%;
    background-image: url("https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #61dafb;
  }
`;

const LoginStyled = styled.div`
.btn { display: inline-block; *display: inline; *zoom: 1; padding: 4px 10px 4px; margin-bottom: 0; font-size: 13px; line-height: 18px; color: #333333; text-align: center;text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75); vertical-align: middle;  -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; cursor: pointer; *margin-left: .3em; }
.btn-large { padding: 9px 14px; font-size: 15px; line-height: normal; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; }
.btn:hover { color: #333333; text-decoration: none; border-color: #007bff}
.btn-primary, .btn-primary:hover { text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); color: #ffffff; border-color: #44528B}
.btn-primary.active { color: rgba(255, 255, 255, 0.75); }
.btn-primary { background-color: #44528B; text-shadow: 1px 1px 1px rgba(0,0,0,0.4);}
.btn-primary:hover, .btn-primary:active, .btn-primary.active, .btn-primary.disabled, .btn-primary[disabled] { filter: none; background-color: #4a77d4; }
.btn-block { width: 100%; display:block; }


.login { 
	position: absolute;
	top: 40%;
	left: 50%;
	margin: -150px 0 0 -150px;
	width:300px;
	height:300px;
}
.login h1 { 
  color: #fff; 
  text-shadow: 0 0 10px rgba(0,0,0,0.3); 
  letter-spacing:1px; 
  text-align:center; 
}

input { 
	width: 100%; 
	margin-bottom: 10px; 
	background: white;
	outline: none;
	padding: 10px;
	font-size: 13px;
	color: black;
	text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
	border: 1px solid rgba(0,0,0,0.3);
	border-radius: 4px;
	box-shadow: inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2);
	-webkit-transition: box-shadow .5s ease;
	-moz-transition: box-shadow .5s ease;
	-o-transition: box-shadow .5s ease;
	-ms-transition: box-shadow .5s ease;
	transition: box-shadow .5s ease;
}
input:focus { 
  box-shadow: inset 0 -5px 45px rgba(100,100,100,0.4), 0 1px 1px rgba(255,255,255,0.2);
}
    
`;

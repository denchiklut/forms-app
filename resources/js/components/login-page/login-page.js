import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import GoogleAuth from '../google-auth'
import './login-page.scss'

class LoginPage extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.auth.isSignedIn) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div className="loginPage">
                <div>
                    <img
                        src="https://avatars0.githubusercontent.com/u/7378196?s=280&v=4"
                        width={300}
                        alt="google"
                    />
                </div>

                <h3>Tap login button to logged in</h3>

                <p>
                    Это временная авторизация, пока нет авторизации в ЛК Reffection!
                </p>
                <div className="myBtn">
                    <GoogleAuth> Log in </GoogleAuth>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {auth}
}

LoginPage.propTypes = {
    auth:  PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(LoginPage);

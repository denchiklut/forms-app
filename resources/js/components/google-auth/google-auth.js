import React, {Component} from 'react'
import VerifiedUser from "@material-ui/icons/VerifiedUser"
import AccountCircle from "@material-ui/icons/AccountCircle"
import IconButton from "@material-ui/core/IconButton"
import { connect } from 'react-redux'
import {signIn, signOut} from '../../actions/auth/google'

class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '526406641065-dhd8ns8af28hqc2c6e082bof6qvhp786.apps.googleusercontent.com',
                scope: 'profile email'
            }).then(()=> {
                this.auth = window.gapi.auth2.getAuthInstance()

                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = (isSignedIn) => {
       if (isSignedIn) {
           const profile = {
               userId: this.auth.currentUser.get().getBasicProfile().getId(),
               email:  this.auth.currentUser.get().getBasicProfile().getEmail(),
               avatar: this.auth.currentUser.get().getBasicProfile().getImageUrl(),
               name:   this.auth.currentUser.get().getBasicProfile().getName(),
           }
           this.props.signIn(profile)
       }else {
           this.props.signOut()
       }
    }

    onSignedInCLick = () => {
        this.auth.signIn()
    }

    onSignedOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if(this.props.isSignedIn) {
            return(
                <div
                    onClick={this.onSignedOutClick}
                >
                    {this.props.children}
                    <IconButton
                        color="inherit"
                    >
                        <VerifiedUser />
                    </IconButton>
                </div>

            )
        } else {
            return (
                <div
                    onClick={this.onSignedInCLick}
                >
                    {this.props.children}
                    <IconButton
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </div>

            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);

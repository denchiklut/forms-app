import React, {Component} from 'react'
import Dialog from "@material-ui/core/Dialog"
import AppBar from '@material-ui/core/AppBar'
import PropTypes from "prop-types"
import Toolbar from "@material-ui/core/Toolbar"
import withMobileDialog from '@material-ui/core/withMobileDialog'

import ObjectForm from "../object-form";
import './add-object.scss'



class AddObject extends Component {
    render() {
        const { fullScreen } = this.props;

        return (
            <div>
                <Dialog
                    fullWidth  = { true }
                    maxWidth   = { false }
                    fullScreen = { fullScreen }
                    open={this.props.isOpen}
                    aria-labelledby="draggable-dialog-title"
                    className="addObject"

                >
                    <AppBar position="static"  style={{background: 'linear-gradient(45deg, #7221f3 30%, #d321f3 90%)'}}>
                        <Toolbar>
                            <h2>Создание обьекта</h2>
                        </Toolbar>
                    </AppBar>

                    <div className="form">
                        <ObjectForm {...this.props} />
                    </div>
                </Dialog>
            </div>
        );
    }
}
AddObject.propTypes = { fullScreen: PropTypes.bool.isRequired };
export default withMobileDialog()(AddObject);

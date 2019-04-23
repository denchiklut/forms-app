import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


class AddBackup extends Component {
    state = {
        backupDesc: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.backupDesc)
    }
    render() {
        return (
            <Dialog
                open={this.props.isOpen}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Сделать backup</DialogTitle>
                <form>
                <DialogContent>
                    <DialogContentText>
                        Пожалуйста впишите ниже комментарий к бэкапу, это необходимо
                        для более точной идентификации.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        fullWidth
                        id="name"
                        type="text"
                        margin="dense"
                        label="Описание"
                        value={this.state.backupDesc}
                        onChange={(e) => this.setState({backupDesc: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        );
    }
}

export default AddBackup;

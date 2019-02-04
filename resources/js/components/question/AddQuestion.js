import React, {Component} from 'react';
import { Editor } from '@tinymce/tinymce-react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {compose} from "recompose";
import {connect} from 'react-redux';

const styles = {
    card: {
        background: "#929292",
        boxShadow:  "0px -1px 1px 1px #485cbd75"
    },
};

class AddQuestion extends Component {

    componentWillMount() {}

    render() {
        const { classes } = this.props;

        if (Object.keys(this.props.question).length === 0) {
            return(<p>Select</p>)
        }

        return (
            <div>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardContent style={{padding :0}}>
                            <AppBar position="static">
                                <Toolbar variant="dense">
                                    <Typography variant="h6" color="inherit">
                                        {this.props.question.val}
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <Editor
                                style={{width: '100%'}}
                                apiKey='njxv7t3qzqkd3a7tmtvc697vlwm5aixy0mu356hxoguyzmc1'
                                value={this.props.question.val}
                                onEditorChange={this.handleEditorChange}
                                init={{
                                    plugins: 'save',
                                    toolbar: 'save undo redo | bold italic | alignleft aligncenter alignright '
                                }}
                            />
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        question: state.activeQuestion,
    }
}

AddQuestion.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default compose(withStyles(styles), connect(mapStateToProps))(AddQuestion);


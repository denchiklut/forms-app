import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react'
import Sortable from './Sortable/index';
import GrafD3 from './GrafD3';

import {
    Button,
    Card,
    CardActions, CardMenu,
    CardTitle,
    Cell, FABButton,
    Grid, Header, Icon,
    IconButton, Navigation,
} from "react-mdl";


class Example extends Component {
    handleEditorChange = (e) => {
        console.log('Content was updated:', e.target.getContent());
    }
    render() {
        return (
            <div style={{margin: 'auto'}}>
                <Grid style={{margin: 'auto', padding: 0}}>
                    <Cell col={3} style={{margin: '0'}}>
                       <Sortable />
                    </Cell>
                    <Cell col={9}>
                        {/*<Header style={{backgroundColor: 'rgb(95, 96, 103)'}} title={<span><span style={{ color: '#ddd'}}>Панель управления / </span><strong>Название проекта</strong></span>}>*/}
                            {/*<FABButton colored ripple mini style={{margin: "0 10px"}}>*/}
                                {/*<Icon name="add" />*/}
                            {/*</FABButton>*/}

                            {/*<FABButton colored ripple mini style={{margin: "0 10px"}}>*/}
                                {/*<Icon name="file_copy" />*/}
                            {/*</FABButton>*/}

                            {/*<FABButton colored ripple mini style={{margin: "0 10px"}}>*/}
                                {/*<Icon name="delete" />*/}
                            {/*</FABButton>*/}
                        {/*</Header>*/}


                        <GrafD3 />

                        {/*<Card shadow={0} style={{width: '100%', margin: 'auto'}}>*/}
                            {/*<CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Welcome</CardTitle>*/}
                            {/*<Editor*/}
                                {/*style={{width: '100%'}}*/}
                                {/*apiKey='njxv7t3qzqkd3a7tmtvc697vlwm5aixy0mu356hxoguyzmc1'*/}
                                {/*initialValue="This is the initial content of the editor!"*/}
                                {/*init={{*/}
                                    {/*plugins: 'link image code save',*/}
                                    {/*toolbar: 'save undo redo | bold italic | alignleft aligncenter alignright | code'*/}
                                {/*}}*/}
                                {/*onChange={this.handleEditorChange}*/}
                            {/*/>*/}
                            {/*<CardActions border>*/}
                                {/*<Button colored>Get Started</Button>*/}
                            {/*</CardActions>*/}
                            {/*<CardMenu style={{color: '#fff'}}>*/}
                                {/*<IconButton name="share" />*/}
                            {/*</CardMenu>*/}
                        {/*</Card>*/}
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default Example



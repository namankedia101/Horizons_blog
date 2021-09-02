import { Container, Typography } from '@material-ui/core';
import React from 'react';

const Detail = ({post}) => {
    return (
        <Container>
            <Typography variant="h1">{post.title}</Typography>
            <Typography variant="h4">{post.message}</Typography>
        </Container>
    )
}

export default Detail

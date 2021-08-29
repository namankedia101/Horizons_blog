import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import useStyles from "./styles";
import moment from "moment";

const Post = ({post}) => {
    const classes = useStyles();

    return (
    <Card className={classes.root} elevation={4}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant="h2">
            {post.title.substring(0,10)+ "..."}
          </Typography>
          <Typography className={classes.date} variant="subtitle1" color="textSecondary">
            Published on: {moment(post.createdAt).format('DD/MM/YYYY')}
          </Typography>
        </CardContent>
      </div>
      <CardContent className={classes.message}>
          <Typography color="textSecondary">
            {post.message.substring(0,100)+ "..."}
          </Typography>
        </CardContent>
      <CardMedia
        className={classes.cover}
        image={post.selectedFile}
        title="Live from space album cover"
      />
    </Card>
  );
}

export default Post

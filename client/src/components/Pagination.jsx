import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import useStyles from "./styles";

import { getPosts } from "../actions/posts";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch,page]);

  return (
     <Pagination
      classes={{ ul: classes.ul}}
      count={numberOfPages}
      page={Number(page)||1}
      style={{color:"#808080"}}
      renderItem={(item) => (   
          <PaginationItem component={Link} to={`/posts?page=${item.page}` } {...item}  />   
      )}
    />
  );
};

export default Paginate;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Image1 from './image1.jpeg';
import { CreateOutlined, ThumbUpOutlined } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import MultilineTextFields from "./multilineTextField";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 200,
  },
  action: {
    padding: 16
  },
  icon: {
    onHover: red
  },
  fab: {
    margin: theme.spacing(2),
  },
}));

function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={Image1}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.action}>
        <Tooltip title="喜欢">
          <IconButton aria-label="like">
            <ThumbUpOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="评论">
          <IconButton aria-label="say">
            <CreateOutlined />
          </IconButton>
        </Tooltip>
      </CardActions>
      <MultilineTextFields/>
    </Card>
  );
}

export default ImgMediaCard;
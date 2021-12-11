import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Button from '@mui/material/Button';
import Logo from "./logo.png"
import ImageListItem from '@mui/material/ImageListItem';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import GitHubIcon from '@mui/icons-material/GitHub';


const useStyles = makeStyles((theme) => ({
    marginTop: {
      marginTop: theme.spacing(14)
    },
    inputOuter: {
      marginTop: theme.spacing(3),
    },
    inputOuterError: {
      marginTop: theme.spacing(0),
    },
    inputOuter1: {
      marginTop: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(0),
    },
    inputEndAdornment: {
      minWidth: '8ch'
    },
    primaryColor: {
      color: "#2196F3",
    },
    secondaryColor: {
      color: "#FE6B8B",
    },
    root: {
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    cardSize: {
        with: 600,
    },
    cardContentSize: {
        with: 300,
    },
    cardImageSize: {
        padding: 0,
    }
  }));

export default function MediaControlCard() {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Card className={classes.cardSize} sx={{ display: 'flex'}}>
        <Box p={10} sx={{ display: 'flex'}}>
            <CardContent className={classes.cardContentSize} sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center"  }}>
                <Typography component="div">
                    <Button style={{textTransform: 'none'}} loadingPosition="start" startIcon={<GitHubIcon />} href="#text-buttons" variant="outlined">
                        GitHub 登录
                    </Button>
                </Typography>
            </CardContent>
        </Box>
        <Box p={1} className={classes.cardImageSize} sx={{display: "flex", padding: 0 }}>
            <CardMedia
                component="img"
                with="300"
                height="300"
                image={Logo}
                alt="Live from space album cover"
            />
        </Box>
    </Card>
  );
}

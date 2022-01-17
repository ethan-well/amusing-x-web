import * as React from 'react';
import {useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import { RequestData } from './submit';

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

export default function OAuthLoginCard() {
  const theme = useTheme();
  const classes = useStyles();

  const [oauthUrl, setOAuthUrl] = useState("");

  const oAuthInfoCallback = (resp) => {
    setOAuthUrl(resp.result.complete_path)
  }

  useEffect(() => {
    RequestData(`${process.env.REACT_APP_EUROPA_OAUTH_INFO}?provider=github&service=amusingx`, oAuthInfoCallback)
  }, []);

  return (
    <Card className={classes.cardSize} sx={{ display: 'flex'}}>
        <Box p={10} sx={{ display: 'flex'}}>
            <CardContent className={classes.cardContentSize} sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center"  }}>
                <Typography component="div">
                    <Button style={{textTransform: 'none'}} startIcon={<GitHubIcon />} href={oauthUrl} variant="outlined">
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
                // image={Logo}
                src={process.env.PUBLIC_URL + "/logo.png"}
                alt="Live from space album cover"
            />
        </Box>
    </Card>
  );
}

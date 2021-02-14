import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import Slide from "@material-ui/core/Slide";
import Hidden from '@material-ui/core/Hidden';

import axios from "axios";

import MyLocation from "./assets/undraw_my_location_f9pr.svg";
import Traveling from "./assets/undraw_Traveling_re_weve.svg";
import MyCurrentLocation from "./assets/undraw_my_current_location_om7g.svg";

class App extends Component {
  state = {
    countryCode: [],
    code: 91,
    mobileNumber: 0,
    phChaser: {},
  };

  InvalidChars = [".", "-", "e", "+", "E"];

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const resp = await axios.get(
      `${process.env.REACT_APP_HTTP_LINK}/PyCountriesCode`
    );
    const data = await resp.data.figures;
    this.setState({ countryCode: data });
  };

  onInput = ({ target: { name, value } }) =>
    this.setState({ [name]: value, phChaser: {} });

  onClick = async () => {
    const { code, mobileNumber } = this.state;
    const resp = await axios.get(
      `${process.env.REACT_APP_HTTP_LINK}/PhChaser`,
      {
        params: { CODE: code, PHONE: mobileNumber },
      }
    );
    const data = await resp.data;
    this.setState({ phChaser: data });
  };

  render() {
    const { classes } = this.props;

    const { countryCode, code, mobileNumber, phChaser } = this.state;

    const checked = true;

    return (
      <>
        <CssBaseline />
        <Container fixed>
          <Box display="flex">
            <Slide
              direction="left"
              in={checked}
              timeout={4000}
              mountOnEnter
              unmountOnExit
            >
              <Box flexGrow={1} className={classes.myLocationBox}>
                <img className={classes.myLocation} src={MyLocation} />
              </Box>
            </Slide>
            <Grow in={checked} timeout={5000}>
              <Box
                display="flex"
                flexDirection="column"
                className={classes.travelBox}
              >
                <Box>
                  <img className={classes.traveling} src={Traveling} />
                </Box>
                <Box>
                  <FormControl className={classes.formSelect}>
                    <InputLabel id="demo-simple-select-required-label">
                      Code
                    </InputLabel>
                    <Select
                      name="code"
                      defaultValue={code}
                      onChange={this.onInput}
                    >
                      {countryCode.map((c, i) => (
                        <MenuItem key={i} value={c}>
                          {c}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Country Code</FormHelperText>
                  </FormControl>
                  <FormControl className={classes.formInput}>
                    <InputLabel>Mobile number</InputLabel>
                    <Input
                      fullWidth
                      name="mobileNumber"
                      type="number"
                      onKeyDown={(e) =>
                        this.InvalidChars.includes(e.key) && e.preventDefault()
                      }
                      onInput={this.onInput}
                    />
                    <FormHelperText id="my-helper-text">
                      We'll never share your number.
                    </FormHelperText>
                  </FormControl>
                  <IconButton
                    color="primary"
                    onClick={this.onClick}
                    className={classes.formSubmit}
                    disabled={mobileNumber.length === 10 ? false : true}
                  >
                    <DoubleArrowIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grow>
          </Box>
          <Box display="flex" className={classes.cardBox}>
            <Slide
              direction="down"
              in={checked}
              timeout={4000}
              mountOnEnter
              unmountOnExit
            >
              <Box className={classes.myCurrentLocationBox}>
                <img
                  className={classes.myCurrentLocation}
                  src={MyCurrentLocation}
                />
              </Box>
            </Slide>
            <Fade in={checked} timeout={5000}>
              <Box flexGrow={1}>
                <Card className={classes.card} variant="outlined">
                  <CardContent>
                    {Object.keys(phChaser).length === 0 ? (
                      <Typography className={classes.title} variant="overline">
                        locate some spot
                      </Typography>
                    ) : (
                      <>
                        <Typography
                          className={classes.title}
                          variant="overline"
                        >
                          country: {phChaser.country} <br />
                          country code: {phChaser.country_code} <br />
                          national number: {phChaser.national_number} <br />
                          service provider: {phChaser.service_provider}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </Fade>
          </Box>
        </Container>
      </>
    );
  }
}

const useStyles = (theme) => ({
  myLocation: {
    marginLeft: theme.spacing(5),
    width: 250,
    height: 350,
  },
  myLocationBox: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  travelBox: {
    margin: theme.spacing(2, 5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(0),
    },
  },
  traveling: {
    width: 150,
    height: 200,
    [theme.breakpoints.down("sm")]: {
      width: 350,
      height: 130,
      marginTop: theme.spacing(3),
    },
  },
  formSelect: {
    marginRight: theme.spacing(2),
  },
  formSubmit: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1),
    },
  },
  myCurrentLocation: {
    marginRight: theme.spacing(15),
    width: 300,
    height: 300,
  },
  myCurrentLocationBox: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  card: {
    background: "linear-gradient(45deg, #191970 30%, #A9A9A9 90%)",
    borderRadius: 3,
    border: 0,
    height: 170,
    width: 300,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    margin: theme.spacing(5, 5),
    [theme.breakpoints.down("sm")]: {
      width: 355,
      height: 170,
      margin: theme.spacing(3, 0),
    },
  },
  cardBox: {
    [theme.breakpoints.down("lg")]: {
      alignItems: "flex-end",
      flexDirection: "row-reverse",
    },
  },
  title: {
    fontSize: 13,
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
    },
  },
});

export default withStyles(useStyles, { withTheme: true })(App);

/* eslint-disable no-unused-vars */
import {
  AppBar,
  Button,
  Card,
  Container,
  FormGroup,
  Icon,
  Input,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

function MissingFromC() {
  const [data, setData] = useState({
    name: "",
    family_name: "",
    found: "",
    whereabouts: "",
    evacuated: "",
    id_last: "",

    error: false,
    successmsg: false,
    loading: false,
    NavigateToReferrer: false,
  });
  function handleChange(evt) {
    const { value } = evt.target;
    setData({ ...data, [evt.target.name]: value });
  }

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "white",
        width: "20rem",
      }}
      className="App"
    >
      <Typography variant="h5">טופס נעדר חדש</Typography>
      <br />
      <form>
        <TextField
          value={data.name}
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="שם פרטי"
          variant="outlined"
          name="name"
          onChange={handleChange}
        />
        <br />
        <TextField
          value={data.family_name}
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="שם משפחה"
          name="family_name"
          onChange={handleChange}
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          value={data.found}
          type="text"
          name="found"
          select
          label="נמצא"
          onChange={handleChange}
          variant="outlined"
        >
          <MenuItem value={""}>בחר</MenuItem>
          <MenuItem value={false}>נעדר</MenuItem>
          <MenuItem value={true}>נמצא</MenuItem>
        </TextField>
        <br />
        <TextField
          value={data.whereabouts}
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="whereabouts"
          label="מיקום"
          onChange={handleChange}
          variant="outlined"
        />
        <br />
        <TextField
          value={data.evacuated}
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="evacuated"
          label="חולץ"
          onChange={handleChange}
          variant="outlined"
          select
        >
          <MenuItem value={""}>בחר</MenuItem>
          <MenuItem value={false}>לא ידוע</MenuItem>
          <MenuItem value={true}>חולץ</MenuItem>
        </TextField>
        <br />
        <TextField
          name="id_last"
          value={data.id_last}
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="4 ספרות אחרונות של תז"
          onChange={handleChange}
          variant="outlined"
        />

        <br />
        <br />
        <Button variant="contained" color="primary">
          שלח
        </Button>
      </form>
    </div>
  );
}

export default MissingFromC;

import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import MissingFromC from "./MissingFromC";

const columns = [
  //   { field: "id", headerName: "מספר סידורי", width: 90 },
  {
    field: "name",
    headerName: "שם פרטי",
    width: 150,
    // editable: true,
  },
  {
    field: "family_name",
    headerName: "שם משפחה",
    width: 150,
    // editable: true,
  },
  {
    field: "found",
    headerName: "נמצא",
    type: "boolean",
    width: 110,
    editable: true,
  },
  {
    field: "whereabouts",
    headerName: "מיקום",
    width: 110,
    editable: true,
  },
  {
    field: "evacuated",
    headerName: "חולץ",
    type: "boolean",
    width: 110,
    editable: true,
  },
  {
    field: "id_last",
    headerName: " 4 ספרות אחרונות של תז",
    // type: "number",
    width: 200,
    // editable: true,
  },
];

function App() {
  const [missingFromDB, setMissingFromDB] = useState([]);
  const [toAddFile, setToAddFile] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getAll`)
      .then((response) => {
        console.log(response.data);
        setMissingFromDB(response.data);
      })
      .catch((error) => {
        console.log(error);
        setMissingFromDB([]);
      });
  }, []);
  const addFile = () => (
    <Dialog
      px={5}
      open={toAddFile}
      onClose={() => setToAddFile(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        variant="gradient"
        bgColor="mekatnar"
        coloredShadow="mekatnar"
        borderRadius="l"
      >
        <DialogContent>
          <MissingFromC />
        </DialogContent>
      </Box>
    </Dialog>
  );
  const rows = missingFromDB.map((m) => ({
    // id: m.id,
    name: m.name,
    family_name: m.family_name,
    found: m.found,
    whereabouts: m.whereabouts,
    evacuated: m.evacuated,
    id_last: m.id_last,
  }));
  const table = () => (
    <>
      <div
        style={{
          textAlign: "center",
          color: "white",
          backgroundColor: "white",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "black",
            backgroundColor: "white",
          }}
        >
          טבלת נעדרים
        </h1>
        <div
          style={{
            textAlign: "center",
            color: "white",
            backgroundColor: "white",
          }}
        >
          <Box sx={{ textAlign: "left", height: "3rem", width: "100%" }}>
            <IconButton
              color="primary"
              aria-label="הוסף נעדר"
              onClick={() => setToAddFile(true)}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Box sx={{ height: "15rem", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              sx={{ "--DataGrid-overlayHeight": "300px" }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 50,
                  },
                },
              }}
              pageSizeOptions={[50]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </div>
    </>
  );
  return (
    <>
      {table()}
      {addFile()}
    </>
  );
}

export default App;

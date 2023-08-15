import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "insight", headerName: "Insight", flex: 2 },
    { field: "sector", headerName: "Sector", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    { field: "pestle", headerName: "PESTLE", flex: 1 },
    { field: "source", headerName: "Source", flex: 1 },
    { field: "published", headerName: "Published", flex: 1 },
    { field: "url", headerName: "URL", flex: 1 },
  ];

  useEffect(() => {
    fetch("https://visualization-dashboard-sesb.onrender.com/api/data")
      .then((response) => response.json())
      .then((data) => {
        const rowsWithId = data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));
        setData(rowsWithId);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box m="20px">
      <Header
        title="INSIGHTS"
        subtitle="List of Insights for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Contacts;

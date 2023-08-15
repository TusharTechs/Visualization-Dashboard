import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
    },
    {
      field: "sector",
      headerName: "Sector",
      flex: 1,
    },
    {
      field: "relevance",
      headerName: "Relevance",
      flex: 1,
      renderCell: ({ row: { relevance } }) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={
            relevance === 2
              ? colors.yellow[500]
              : relevance === 3 || relevance === 4
              ? colors.greenAccent[500]
              : colors.red[500]
          }
        >
          {relevance === 2
            ? "Low"
            : relevance === 3 || relevance === 4
            ? "Moderate"
            : "High"}
        </Box>
      ),
    },
    {
      field: "likelihood",
      headerName: "Likelihood",
      flex: 1,
      renderCell: ({ row: { likelihood } }) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={
            likelihood === 2
              ? colors.yellow[500]
              : likelihood === 3 || likelihood === 4
              ? colors.greenAccent[500]
              : colors.red[500]
          }
        >
          {likelihood === 2
            ? "Low"
            : likelihood === 3 || likelihood === 4
            ? "Moderate"
            : "High"}
        </Box>
      ),
    },
    {
      field: "intensity",
      headerName: "Intensity",
      flex: 1,
      renderCell: ({ row: { intensity } }) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={
            intensity <= 10
              ? colors.yellow[500]
              : intensity > 10 && intensity <= 20
              ? colors.greenAccent[500]
              : colors.red[500]
          }
        >
          {intensity <= 10
            ? "Low"
            : intensity > 10 && intensity <= 20
            ? "Moderate"
            : "High"}
        </Box>
      ),
    },
  ];

  useEffect(() => {
    // Fetch data from /api/data
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (row) => row.country && row.region && row.sector
        );

        const rowsWithId = filteredData.map((row, index) => ({
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
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataGrid checkboxSelection rows={data} columns={columns} />
        )}
      </Box>
    </Box>
  );
};

export default Team;

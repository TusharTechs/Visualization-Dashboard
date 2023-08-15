import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Invoices = () => {
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
      field: "intensity",
      headerName: "Intensity",
      type: "number",
      flex: 1,
    },
    {
      field: "likelihood",
      headerName: "Likelihood",
      type: "number",
      flex: 1,
    },
    {
      field: "relevance",
      headerName: "Relevance",
      type: "number",
      flex: 1,
    },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => {
        const rowsWithId = data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));

        const filteredRows = rowsWithId.filter(
          (row) => row.country && row.region
        );

        setData(filteredRows);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="ECONOMIC TRENDS" subtitle="List of Economic Trends" />
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

export default Invoices;

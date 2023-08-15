import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import StoreIcon from "@mui/icons-material/Store";
import SubjectIcon from "@mui/icons-material/Subject";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const insightData = {
    sector: "Energy",
    topic: "gas",
    insight: "Annual Energy Outlook",
    region: "Northern America",
    country: "United States of America",
    relevance: 2,
    title:
      "U.S. natural gas consumption is expected to increase during much of the projection period.",
    likelihood: 3,
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Insight Data */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding="20px"
          borderRadius="10px"
        >
          <EmailIcon
            sx={{ color: colors.greenAccent[600], fontSize: "48px" }}
          />
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {insightData.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              margin: "10px 0",
            }}
          >
            {insightData.insight}
          </Typography>
        </Box>

        {/* Sector Data */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <StoreIcon
            sx={{ color: colors.greenAccent[600], fontSize: "48px" }}
          />
          <Typography variant="h6">{insightData.sector}</Typography>
          <Typography variant="body1">Sector</Typography>
          <Typography variant="body2">{`Relevance: ${insightData.relevance}%`}</Typography>
        </Box>

        {/* Topic Data */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <SubjectIcon
            sx={{ color: colors.greenAccent[600], fontSize: "48px" }}
          />
          <Typography variant="h6">{insightData.topic}</Typography>
          <Typography variant="body1">Topic</Typography>
          <Typography variant="body2">{`Likelihood: ${insightData.likelihood}%`}</Typography>
        </Box>

        {/* Region Data */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <LocationOnIcon
            sx={{ color: colors.greenAccent[600], fontSize: "48px" }}
          />
          <Typography variant="h6">{insightData.region}</Typography>
          <Typography variant="body1">Region</Typography>
          <Typography variant="body2">{`Relevance: ${insightData.relevance}%`}</Typography>
        </Box>
      </Box>

      {/* ROW 2 */}
      <Box
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
      >
        <Box
          mt="25px"
          p="0 30px"
          display="flex "
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <IconButton>
              <DownloadOutlinedIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Insights
            </Typography>
          </Box>
        </Box>
        <Box height="550px" width="100%" m="0px 0 0 0">
          <BarChart isDashboard={true} />
        </Box>
      </Box>

      {/* ROW 3 */}
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        p="30px"
      ></Box>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
      >
        <Box height="600px" width="100%" mt="-20px">
          <LineChart />
        </Box>
      </Box>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        p="30px"
      ></Box>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
      >
        <Box height="400px" width="100%" mt="-20px" >
          <PieChart />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

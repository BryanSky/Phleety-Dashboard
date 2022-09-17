import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  const [pricingStrategy, setPricingStrategy] = useState();
  const [unplannedMaintenance, setUnplannedMaintenance] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/getMetrics?page=cost")
      .then(response => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then(data => {
        console.log(data.data);
        setPricingStrategy(data.data[0]);
        setPricingStrategy(data.data[1]);
      })
  },[]);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Transportation cost"
              subheader=""
              chartLabels={[
                '1T',
                '2T',
                '5T',
                '10T',
                '15T',
                '20T',
                '25T',
              ]}
              chartData={[
                {
                  name: 'Price by weight',
                  type: 'area',
                  fill: 'gradient',
                  data: [13, 16, 22, 27, 30, 32, 37],
                },
                {
                  name: 'Price by dimensions',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 42, 41, 41, 38, 35, 32],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Probability of unplanned maintenance"
              chartData={[
                { label: 'High', value: 4344 },
                { label: 'Medium', value: 5435 },
                { label: 'Low', value: 1443 },
              ]}
              chartColors={[
                theme.palette.chart.red[0],
                theme.palette.chart.yellow[0],
                theme.palette.chart.violet[0],
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

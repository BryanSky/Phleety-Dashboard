import { useEffect, useState } from 'react';
// material
import { Container, Grid, Stack, Typography } from '@mui/material';
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import {
  AppConversionRates,
  AppCurrentSubject,
  AppCurrentVisits, AppNewsUpdate, AppOrderTimeline, AppTasks, AppTrafficBySite,
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const theme = useTheme();


  const [fuelConsmptionPerDriver, setFuelConsmptionPerDriver] = useState();
  const [totalEmmissions, setTotalEmmissions] = useState();
  const [emmissionsByMonat, setEmissionenByMonat] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/getMetrics?page=environment")
      .then(response => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then(data => {
        setFuelConsmptionPerDriver(data.data[0]);
        setTotalEmmissions(data.data[1]);
        setEmissionenByMonat(data.data[2]);
      })
  },[]);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={6}>
            <AppConversionRates
              title="Fuel consuption by driver"
              subheader=""
              chartData={[
                { label: 'Best', value: 0.3 },
                { label: 'Average', value: 0.8 },
                { label: 'Worst', value: 1.3 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppWebsiteVisits
              title="CO2 emissions"
              subheader="(-30%) last 6 days"
              chartLabels={[
                '09/16/2022',
                '09/15/2022',
                '09/14/2022',
                '09/13/2022',
                '09/12/2022',
                '09/11/2022',
                '09/10/2022',
                '09/09/2022',
              ]}
              chartData={[
                {
                  name: 'All vehicles',
                  type: 'column',
                  fill: 'solid',
                  data: [37, 27, 23, 21, 22, 13, 22, 11],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="CO2 emissions / km" total={0.7178} icon={'ant-design:cloud'} />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
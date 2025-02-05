// material-ui
import {
  Button,
  CardMedia,
  Link,
  Stack,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl,
  Divider
} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from 'react';
import * as amplitude from '@amplitude/analytics-browser';
import { useNavigate } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';

// assets
import avatar from 'assets/images/users/avatar-group.png';



export default function NavCard() {
  const navigate = useNavigate();


  useEffect(() => {
    // Component did mount
    console.log('NavCard mounted');

    let url = 'https://gs.amplitude.com';
    amplitude.add(window.engagement.plugin({ serverUrl: url }));
    amplitude.init('412b587e95de8b568e53d727a1964b2', 'nino@commandbar.com',{ "autocapture": true });
    amplitude.track('Amplify: Page Viewed');

    window.engagement.boot({
      user: {
        user_id: 'ninooooonin',
        device_id: '60201901-fbfa-4cd9-a0c0-5dd67d17aab9',
        user_properties: {
          email: 'nino+amplitude@commandbar.com'
        }
      },
      integrations: [
      {
        track: (event) => {
          console.log(event)
          window.engagement.trigger(event);
        }
      }
      ]
    });

    const identifyEvent = new amplitude.Identify();
    identifyEvent.set('isActive', 'true');
    amplitude.identify(identifyEvent);
    
    window.engagement.setRouter((newUrl) => navigate(newUrl));

    // window.engagement.addIntegration({
    //   track: (event) => {
    //     // window.engagement.trigger(event);
    //   }
    // })

    return () => {
      // Component will unmount
      console.log('NavCard unmounted');
    };
  }, []);

  return (
    <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
      <Stack alignItems="center" spacing={2.5}>
        <CardMedia component="img" image={avatar} sx={{ width: 112 }} />
        <Stack alignItems="center">
          <Typography variant="h5">Environment Setup</Typography>
        </Stack>
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="local-key-input">Local API Key</InputLabel>
          <OutlinedInput id="local-key-input" label="Local API Key" placeholder="Enter your API Key" />
        </FormControl>
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="staging-key-input">Staging API Key</InputLabel>
          <OutlinedInput id="staging-key-input" label="Staging API Key" placeholder="Enter your API Key" />
        </FormControl>
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="prod-key-input">Production API Key</InputLabel>
          <OutlinedInput id="prod-key-input" label="Production API Key" placeholder="Enter your API Key" />
        </FormControl>
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="select-api">Select Active API</InputLabel>
          <Select id="select-api" label="Select Active API" defaultValue="local">
            <MenuItem value="local">Local</MenuItem>
            <MenuItem value="staging">Staging</MenuItem>
            <MenuItem value="prod">Production</MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ mt: 2, width: '100%' }} />
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="end-user-settings">End-user Settings</InputLabel>
          <OutlinedInput id="end-user-settings" label="End-user Settings" placeholder="test-base-user" />
        </FormControl>
        <Button variant="contained" color="primary" sx={{ mt: 2, width: '100%' }}>
          Boot with ID
        </Button>

        <Divider sx={{ mt: 2, width: '100%' }} />
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="select-local-sdk">Local SDK Integration</InputLabel>
          <Select id="select-local-sdk" label="Select Local SDK" defaultValue="amplitude">
            <MenuItem value="amplitude">Amplitude</MenuItem>
            <MenuItem value="none">None</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </MainCard>
  );
}

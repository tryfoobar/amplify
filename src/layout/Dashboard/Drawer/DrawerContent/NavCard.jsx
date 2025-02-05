import {
  Button,
  CardMedia,
  Stack,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl,
  Divider
} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Alert, AlertTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import * as amplitude from '@amplitude/analytics-browser';
import { useNavigate } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';

// assets
import avatar from 'assets/images/users/avatar-group.png';

// Utils
import { 
  getLocalAPIKey, 
  setLocalAPIKey,
  getLocalStagingAPIKey,
  setLocalStagingAPIKey,
  getLocalProdAPIKey,
  setLocalProdAPIKey,
  getLocalUserSlug,
  setLocalUserSlug,
  getLocalSDKKey,
  setLocalSDKKey,
  getLocalActiveAPI,
  setLocalActiveAPI
} from 'utils/localStorage';

export default function NavCard() {
  const navigate = useNavigate();

  const [activeAPI, setActiveAPI] = useState(getLocalActiveAPI());
  const [localKey, setLocalKey] = useState(getLocalAPIKey());
  const [stagingKey, setStagingKey] = useState(getLocalStagingAPIKey());
  const [prodKey, setProdKey] = useState(getLocalProdAPIKey());
  const [userSlug, setUserSlug] = useState(getLocalUserSlug());
  const [localSDK, setLocalSDK] = useState(getLocalSDKKey());

  useEffect(() => {
    // Component did mount

    const analyticsHost = localSDK === 'staging' ? 'https://api.stag2.amplitude.com/2/httpapi' : undefined;
    let decideHost = 'https://gs.amplitude.com';
    if (activeAPI === 'local') {
      decideHost = 'http://localhost:10001';
    } else if (activeAPI === 'staging') {
      decideHost = 'https://gs.stag2.amplitude.com';
    } else if (activeAPI === 'prod-eu') {
      decideHost = 'https://gs.eu.amplitude.com';
    }

    const activeAPIKey = activeAPI === 'local' ? localKey : stagingKey;
    
    console.log('Active API Key:', activeAPI);
    console.log('activeAPIKey API Key:', activeAPIKey);

    if (localSDK === 'none') {
      window.engagement.init(activeAPIKey, { serverUrl: decideHost, options: { logLevel: 4 } });
      window.engagement.boot({
        user: {
          user_id: userSlug,
          device_id: '60201901-fbfa-4cd9-a0c0-5dd67d17aab9',
          user_properties: { foo: 'bar' }
        }
      });
    } else if (localSDK === 'amplitude') {
      amplitude.add(window.engagement.plugin({ serverUrl: decideHost }));
      // amplitude.add((window.engagement as ProxySDK).plugin({ serverUrl: decideHost }));
      amplitude.init(activeAPIKey, userSlug, { serverUrl: analyticsHost, logLevel: 4 });
      const identifyEvent = new amplitude.Identify();
      identifyEvent.set('foo', 'bar');
      amplitude.identify(identifyEvent);
    }
        
    // let url = 'https://gs.amplitude.com';
    // amplitude.add(window.engagement.plugin({ serverUrl: url }));

    // // Engagement QA - G&S Plus
    // amplitude.init('460416694432445836f367cb4fb5c6ea', 'nino@commandbar.com',{ "autocapture": true });
    // amplitude.track('Amplify: Page Viewed');

    // window.engagement.boot({
    //   user: {
    //     user_id: 'ninooooonin',
    //     device_id: '60201901-fbfa-4cd9-a0c0-5dd67d17aab9',
    //     user_properties: {
    //       email: 'nino+amplitude@commandbar.com'
    //     }
    //   },
    //   integrations: [
    //   {
    //     track: (event) => {
    //       console.log(event)
    //       window.engagement.trigger(event);
    //     }
    //   }
    //   ]
    // });

    // const identifyEvent = new amplitude.Identify();
    // identifyEvent.set('isActive', 'true');
    // amplitude.identify(identifyEvent);
    
    // window.engagement.setRouter((newUrl) => navigate(newUrl));

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'localKey':
        setLocalAPIKey(value);
        setLocalKey(value, getLocalAPIKey());
        break;
      case 'stagingKey':
        setLocalStagingAPIKey(value);
        setStagingKey(value, getLocalStagingAPIKey());
        break;
      case 'prodKey':
        setLocalProdAPIKey(value);
        setProdKey(value, getLocalProdAPIKey());
        break;
      case 'userSlug':
        setLocalUserSlug(value);
        setUserSlug(value, getLocalUserSlug());
        break;
      case 'activeAPI':
        setLocalActiveAPI(value);
        setActiveAPI(value, getLocalActiveAPI());
        break;
      case 'localSDK':
        setLocalSDKKey(value);
        setLocalSDK(value, getLocalSDKKey());
        break;
      default:
        break;
    }
  };

  const onBootWithID = () => {
    window.location.reload();
  }

  const generateMeaningfulUserSlug = () => {
    const prefix = 'test-user';
    const randomString = Math.random().toString(36).substring(2, 10);
    handleInputChange({ target: { name: 'userSlug', value: `${prefix}-${randomString}` } });
}

  return (
    <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
      <Stack alignItems="center" spacing={2.5}>
        <CardMedia component="img" image={avatar} sx={{ width: 85 }} />
        <Stack alignItems="center">
          <Typography variant="h5">Environment Setup</Typography>
        </Stack>
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="localKey">Local API Key</InputLabel>
          <OutlinedInput id="localKey" name='localKey' label="Local API Key" 
            onChange={handleInputChange} value={localKey}
            placeholder="Enter your API Key" />
        </FormControl>
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="stagingKey">Staging API Key</InputLabel>
          <OutlinedInput id="stagingKey" name='stagingKey' label="Staging API Key" 
            onChange={handleInputChange} value={stagingKey} 
            placeholder="Enter your API Key" />
        </FormControl>
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="prodKey">Production API Key</InputLabel>
          <OutlinedInput id="prodKey" name='prodKey' label="Production API Key" 
            onChange={handleInputChange} value={prodKey} 
            placeholder="Enter your API Key" />
        </FormControl>
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="activeAPI">Active API</InputLabel>
          <Select id="activeAPI" name='activeAPI' label="Active API"
            onChange={handleInputChange} value={activeAPI}>
            <MenuItem value="local">Local</MenuItem>
            <MenuItem value="staging">Staging</MenuItem>
            <MenuItem value="prod">Production</MenuItem>
          </Select>
        </FormControl>
        <Divider sx={{ mt: 2, width: '100%' }} />
        <Typography variant="h6" sx={{ mt: 2, width: '100%' }}>
          End-user Settings
        </Typography>
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="userSlug">User Slug</InputLabel>
          <OutlinedInput id="userSlug" name="userSlug" label="User Slug" 
            onChange={handleInputChange} value={userSlug}
            placeholder="test-base-user" />
        </FormControl>
        <Button variant="contained" color="primary" sx={{ mt: 2, width: '100%' }}
          onClick={onBootWithID}>
          Boot with ID
        </Button>
        <Button variant="contained" color="primary" sx={{ mt: 2, width: '100%' }}
          onClick={generateMeaningfulUserSlug}>
          Generate Random User
        </Button>
        <Divider sx={{ mt: 2, width: '100%' }} />
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="localSDK">Local SDK Integration</InputLabel>
          <Select id="localSDK" name="localSDK" label="Select Local SDK"
            onChange={handleInputChange} value={localSDK}>
            <MenuItem value="amplitude">Amplitude</MenuItem>
            <MenuItem value="none">None</MenuItem>
          </Select>
        </FormControl>
        
        <Alert severity="error" icon={false} sx={{ mt: 2, width: '100%' }}>
          Reload the page to apply changes.
        </Alert>
      </Stack>
    </MainCard>
  );
}

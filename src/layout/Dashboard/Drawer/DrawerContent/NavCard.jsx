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
import { Alert } from '@mui/material';
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
    const analyticsHost = localSDK === 'staging' ? 'https://api.stag2.amplitude.com/2/httpapi' : undefined;

    const decideHostMap = {
      local: 'http://localhost:10001',
      staging: 'https://gs.stag2.amplitude.com',
      'prod-eu': 'https://gs.eu.amplitude.com',
      prod: 'https://gs.amplitude.com'
    };

    const decideHost = decideHostMap[activeAPI] || 'https://gs.amplitude.com';

    const activeAPIKeyMap = {
      local: localKey,
      staging: stagingKey,
      prod: prodKey
    };

    const activeAPIKey = activeAPIKeyMap[activeAPI] || prodKey;

    const engagementOptions = {
      serverUrl: decideHost,
      options: { logLevel: 4 }
    };

    const user = {
      user_id: userSlug,
      device_id: '60201901-fbfa-4cd9-a0c0-5dd67d17aab9',
      user_properties: { foo: 'bar' }
    };

    if (localSDK === 'none') {
      window.engagement.init(activeAPIKey, engagementOptions);
      window.engagement.boot({ user });
      console.log('Local SDK is not integrated', activeAPIKey, decideHost);
    } else if (localSDK === 'amplitude') {
      amplitude.add(window.engagement.plugin(engagementOptions));
      amplitude.init(activeAPIKey, userSlug, { serverUrl: analyticsHost, logLevel: 4 });
      
      const identifyEvent = new amplitude.Identify();
      identifyEvent.set('foo', 'bar');
      amplitude.identify(identifyEvent);

      console.log('Local SDK is integrated with Amplitude', activeAPIKey, decideHost);
    }

    // Engeagement SDK Router
    window.engagement.setRouter((newUrl) => navigate(newUrl));
        
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
    
    // window.engagement.addIntegration({
    //   track: (event) => {
    //     // window.engagement.trigger(event);
    //   }
    // })

    return () => {
      console.log('NavCard unmounted');
    };
  }, [activeAPI, localKey, stagingKey, prodKey, userSlug, localSDK, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const setters = {
      localKey: setLocalAPIKey,
      stagingKey: setLocalStagingAPIKey,
      prodKey: setLocalProdAPIKey,
      userSlug: setLocalUserSlug,
      activeAPI: setLocalActiveAPI,
      localSDK: setLocalSDKKey
    };
    setters[name](value);
    const stateSetters = {
      localKey: setLocalKey,
      stagingKey: setStagingKey,
      prodKey: setProdKey,
      userSlug: setUserSlug,
      activeAPI: setActiveAPI,
      localSDK: setLocalSDK
    };
    stateSetters[name](value);
  };

  const onBootWithID = () => {
    window.location.reload();
  }

  const generateMeaningfulUserSlug = () => {
    const prefix = 'test-user';
    const randomString = Math.random().toString(36).substring(2, 10);
    handleInputChange({ target: { name: 'userSlug', value: `${prefix}-${randomString}` } });
  }

  const renderInputField = (id, label, value) => (
    <FormControl key={id} sx={{ mt: 2, width: '100%' }}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput id={id} name={id} label={label} onChange={handleInputChange} value={value} placeholder={`Enter your ${label}`} />
    </FormControl>
  );

  return (
    <MainCard sx={{ bgcolor: 'grey.50', m: 3 }}>
      <Stack alignItems="center" spacing={2.5}>
        <CardMedia component="img" image={avatar} sx={{ width: 85 }} />
        <Typography variant="h5">Environment Setup</Typography>
        {[
          { id: 'localKey', label: 'Local API Key', value: localKey },
          { id: 'stagingKey', label: 'Staging API Key', value: stagingKey },
          { id: 'prodKey', label: 'Production API Key', value: prodKey },
          { id: 'userSlug', label: 'User Slug', value: userSlug }
        ].map(({ id, label, value }) => renderInputField(id, label, value))}
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="activeAPI">Active API</InputLabel>
          <Select id="activeAPI" name="activeAPI" label="Active API" onChange={handleInputChange} value={activeAPI}>
            {['local', 'staging', 'prod'].map(api => (
              <MenuItem key={api} value={api}>{api.charAt(0).toUpperCase() + api.slice(1)}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider sx={{ mt: 2, width: '100%' }} />
        <Button variant="contained" color="primary" sx={{ mt: 2, width: '100%' }} onClick={onBootWithID}>Boot with ID</Button>
        <Button variant="contained" color="primary" sx={{ mt: 2, width: '100%' }} onClick={generateMeaningfulUserSlug}>Generate Random User</Button>
        <Divider sx={{ mt: 2, width: '100%' }} />
        <FormControl sx={{ mt: 2, width: '100%' }}>
          <InputLabel htmlFor="localSDK">Local SDK Integration</InputLabel>
          <Select id="localSDK" name="localSDK" label="Select Local SDK" onChange={handleInputChange} value={localSDK}>
            {['amplitude', 'none'].map(sdk => (
              <MenuItem key={sdk} value={sdk}>{sdk.charAt(0).toUpperCase() + sdk.slice(1)}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Alert severity="error" icon={false} sx={{ mt: 2, width: '100%' }}>Reload the page to apply changes.</Alert>
      </Stack>
    </MainCard>
  );
}

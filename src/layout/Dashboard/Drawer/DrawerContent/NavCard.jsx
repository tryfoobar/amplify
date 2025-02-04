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

// project import
import MainCard from 'components/MainCard';

// assets
import avatar from 'assets/images/users/avatar-group.png';
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

export default function NavCard() {
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

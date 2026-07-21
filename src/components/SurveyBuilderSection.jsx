import { useRef, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// mui icons
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';

// ==============================|| DATA ||============================== //

const MENU_ITEMS = [
  'Move question',
  'Copy',
  'Replace from library',
  'Add page break',
  'Preview question',
  'Add note',
  'Hide question',
  'Delete',
  'Change Restriction'
];

const NAV_ROWS = [
  { page: 'Page 2' },
  { page: 'Page 3' }
];

// ==============================|| QUESTION CARD ||============================== //

function QuestionCard() {
  const moreRef = useRef(null);
  // open on load so it matches the mockup; the ⋯ button toggles it
  const [open, setOpen] = useState(true);

  return (
    <Paper
      variant="outlined"
      sx={{
        position: 'relative',
        p: 3,
        borderRadius: 2,
        borderColor: 'primary.main',
        borderWidth: 2,
        bgcolor: 'common.white'
      }}
    >
      <Stack direction="row" alignItems="flex-start" spacing={1.5}>
        <Checkbox size="small" sx={{ p: 0, mt: 0.25 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Q7
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 400, mb: 2.5 }}>
            This is a question I want hidden from the survey taking experience
          </Typography>
          <Stack spacing={1}>
            {[1, 2, 3].map((n) => (
              <Stack key={n} direction="row" alignItems="center" spacing={1}>
                <Radio size="small" disabled sx={{ p: 0 }} />
                <Typography variant="body1" color="text.secondary">
                  Click to write Choice {n}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <WarningAmberRoundedIcon sx={{ color: 'warning.main' }} />
          <IconButton
            ref={moreRef}
            size="small"
            onClick={() => setOpen((prev) => !prev)}
            sx={{ bgcolor: open ? 'grey.100' : 'transparent', borderRadius: 1 }}
          >
            <MoreHorizIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Menu
        anchorEl={moreRef.current}
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            elevation: 3,
            sx: { minWidth: 260, borderRadius: 2, py: 0.5 }
          }
        }}
      >
        {MENU_ITEMS.map((label) => (
          <MenuItem
            key={label}
            selected={label === 'Move question'}
            onClick={() => setOpen(false)}
            sx={{
              py: 1.25,
              px: 2,
              '&.Mui-selected': {
                bgcolor: 'primary.lighter',
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 1,
                mx: 1
              }
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
}

// ==============================|| NAVIGATION PANEL ||============================== //

function NavigationPanel() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Navigation
      </Typography>

      <Stack direction="row" sx={{ pb: 1 }}>
        <Typography variant="subtitle1" sx={{ flex: 2, fontWeight: 700 }}>
          Page
        </Typography>
        <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 700 }}>
          SPA
        </Typography>
        <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 700 }}>
          MPA
        </Typography>
      </Stack>
      <Divider />

      {NAV_ROWS.map((row) => (
        <Box key={row.page}>
          <Stack direction="row" alignItems="center" sx={{ py: 1.5 }}>
            <Typography variant="h5" sx={{ flex: 2, fontWeight: 400 }}>
              {row.page}
            </Typography>
            <Box sx={{ flex: 1 }}>
              <Link href="#" underline="hover" sx={{ color: 'primary.main', fontWeight: 500 }}>
                Go &rarr;
              </Link>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Link href="#" underline="hover" sx={{ color: 'warning.dark', fontWeight: 500 }}>
                Go &#8630;
              </Link>
            </Box>
          </Stack>
          <Divider />
        </Box>
      ))}

      <Box sx={{ mt: 2, p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          <Box component="span" sx={{ fontWeight: 700 }}>
            SPA
          </Box>{' '}
          = Single Page App (no reload) |{' '}
          <Box component="span" sx={{ fontWeight: 700 }}>
            MPA
          </Box>{' '}
          = Multi Page App (full reload)
        </Typography>
      </Box>
    </Box>
  );
}

// ==============================|| END USER API PANEL ||============================== //

function EndUserApiPanel() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        End User API
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Reload the page after making changes to these settings.
      </Typography>

      {/* Local */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Local
      </Typography>
      <Link
        href="#"
        underline="hover"
        sx={{ display: 'inline-flex', alignItems: 'center', color: 'primary.main', fontWeight: 500, mb: 3 }}
      >
        <AddIcon fontSize="small" sx={{ mr: 0.5 }} /> Add API key
      </Link>

      {/* Staging */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Staging
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
        <Switch defaultChecked color="success" />
        <TextField size="small" defaultValue="Staging" sx={{ flexGrow: 1, maxWidth: 220 }} />
      </Stack>
      <Link
        href="#"
        underline="hover"
        sx={{ display: 'inline-flex', alignItems: 'center', color: 'primary.main', fontWeight: 500 }}
      >
        <AddIcon fontSize="small" sx={{ mr: 0.5 }} /> Add API key
      </Link>
    </Box>
  );
}

// ==============================|| SURVEY BUILDER SECTION ||============================== //

export default function SurveyBuilderSection() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        background: 'linear-gradient(180deg, #d9f7ec 0%, #c9f2e3 100%)'
      }}
    >
      <Box sx={{ mb: 4 }}>
        <QuestionCard />
      </Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box sx={{ flex: 1 }}>
          <NavigationPanel />
        </Box>
        <Box sx={{ flex: 1 }}>
          <EndUserApiPanel />
        </Box>
      </Stack>
    </Box>
  );
}

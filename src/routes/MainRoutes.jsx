import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const ProjectsDefault = Loadable(lazy(() => import('pages/projects/index')));
const ReportsDefault = Loadable(lazy(() => import('pages/reports/index')));
const TeamsDefault = Loadable(lazy(() => import('pages/teams/index')));


const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/home',
      element: <DashboardDefault />
    },
    {
      path: 'projects',
      element: <ProjectsDefault />
    },
    {
      path: 'reports',
      element: <ReportsDefault />
    },
    {
      path: 'teams',
      element: <TeamsDefault />
    }
  ]
};

export default MainRoutes;

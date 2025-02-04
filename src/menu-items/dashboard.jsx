// assets
import { DashboardOutlined, ProjectOutlined, FileOutlined, TeamOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  ProjectOutlined,
  FileOutlined,
  TeamOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/home',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'projects',
      title: 'Projects',
      type: 'item',
      url: '/projects',
      icon: icons.ProjectOutlined,
      breadcrumbs: false
    },
    {
      id: 'reports',
      title: 'Reports',
      type: 'item',
      url: '/reports',
      icon: icons.FileOutlined,
      breadcrumbs: false
    },
    {
      id: 'teams',
      title: 'Teams',
      type: 'item',
      url: '/teams',
      icon: icons.TeamOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;

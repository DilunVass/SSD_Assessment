import { DashboardOutlined ,UsergroupDeleteOutlined, InboxOutlined, UserOutlined, CrownOutlined, SnippetsOutlined, UserAddOutlined, UsergroupAddOutlined, GiftOutlined} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const defaultNav = [{
  key: 'dashboards/default',
  path: `${APP_PREFIX_PATH}/dashboards/default`,
  title: 'Overview',
  breadcrumb: false,
  isGroupTitle: true,
  submenu: [
    {
      key: 'dashboards-default',
      path: `${APP_PREFIX_PATH}/dashboards/home`,
      title: 'Home',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
  ]
}]

const sectionNav = [{
  key: 'dashboards/default',
  title: 'Sections',
  breadcrumb: false,
  isGroupTitle: true,
  submenu: [
    {
      key: 'dashboards/course',
      path: `${APP_PREFIX_PATH}/dashboards/course/new`,
      title: 'Course',
      icon: UsergroupDeleteOutlined,
      breadcrumb: false,
      isGroupTitle: false,
      submenu: [
        {
          key: 'dashboards/course/newcourse',
          path: `${APP_PREFIX_PATH}/dashboards/course/new`,
          title: 'New Course',
          icon: UsergroupAddOutlined,
          breadcrumb: false,
          submenu: []
        },
      ]
    },
    {
      key: 'dashboards/BB',
      path: `${APP_PREFIX_PATH}/dashboards/home`,
      title: 'C',
      icon: UsergroupDeleteOutlined,
      breadcrumb: false,
      isGroupTitle: false,
      submenu: [
        {
          key: 'vieww',
          path: `${APP_PREFIX_PATH}/dashboards/home`,
          title: 'D',
          icon: UsergroupAddOutlined,
          breadcrumb: false,
          submenu: []
        },
      ]
    }
  ]
}]

const navigationConfig = [
  ...defaultNav,
  ...sectionNav
]

export default navigationConfig;

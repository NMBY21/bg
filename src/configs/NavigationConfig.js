import { DashboardOutlined,SkinOutlined,UserSwitchOutlined,UnlockOutlined,ZoomInOutlined,ApartmentOutlined,RobotOutlined,GroupOutlined,ConsoleSqlOutlined,FlagOutlined ,FileImageOutlined,SettingOutlined } from '@ant-design/icons';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'

const dashboardtree = [{
  key: 'dashboards.default',
  path: `${APP_PREFIX_PATH}/dashboards/default`,
  title: "Dashboard",
  icon: DashboardOutlined,
  breadcrumb: true,

  isGroupTitle: false,
  submenu: [ ]

}]



const configurationtree = [{
  key: 'settings',
  path: `${APP_PREFIX_PATH}/setting`,
  title: "System Configurations",
  icon: SettingOutlined,
  breadcrumb: true,

  isGroupTitle: false,
  submenu: [ ]

}]
const dashBoardNavTree = [{
  key: 'iam',
  path: `${APP_PREFIX_PATH}/users`,
  title: "ACCESS MANAGMENT",
  icon: UserSwitchOutlined,
  breadcrumb: false,
  isGroupTitle: false,
  submenu: [ 
    {
      key: 'users',
      path: `${APP_PREFIX_PATH}/users`,
      title: 'Users',
      icon: UserSwitchOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'client',
      path: `${APP_PREFIX_PATH}/client`,
      title: 'Clients',
      icon: RobotOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'role',
      path: `${APP_PREFIX_PATH}/role`,
      title: 'Roles',
      icon: UnlockOutlined ,
      breadcrumb: false,
      submenu: []
    }
  ]
}]


const masterDataTree = [
  
  {
  key: 'masterDataTree',
  path: `${APP_PREFIX_PATH}/masterDataTree`,
  title: "Master Datas",
  icon: ConsoleSqlOutlined,
  breadcrumb: true,
  isGroupTitle: false,
  submenu: [
    {
      key: 'medias',
      path: `${APP_PREFIX_PATH}/medias`,
      title: 'Medias',
      icon: FileImageOutlined,
      breadcrumb: false,
      submenu: []
    },  {
      key: 'brands',
      path: `${APP_PREFIX_PATH}/brands`,
      title: 'Brands',
      icon: FlagOutlined,
      breadcrumb: false,
      submenu: []
    },  {
      key: 'categories',
      path: `${APP_PREFIX_PATH}/categories`,
      title: 'Categories',
      icon: ApartmentOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'manufacturers',
      path: `${APP_PREFIX_PATH}/manufacturers`,
      title: 'Manufacturers',
      icon: GroupOutlined,
      breadcrumb: false,
      submenu: []
    }, {
      key: 'products',
      path: `${APP_PREFIX_PATH}/products/product-list`,
      title: 'Products',
      icon: SkinOutlined,
      breadcrumb: false,
      submenu: []
    }

  ]
}

]
const navigationConfig = [
  // ...dashboardtree,
  ...masterDataTree,
  ...configurationtree,
  ...dashBoardNavTree
]

export default navigationConfig;

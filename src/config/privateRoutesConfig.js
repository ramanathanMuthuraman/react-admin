import Roles from "./roles";
import UserManagement from "../pages/userManagement/UserManagement";
import FileManagement from "../pages/fileManagement/FileManagement";
import AlertManagement from "../pages/alertManagement/AlertManagement";
import ChangePassword from "../pages/changePassword/ChangePassword";
import {
  Home as HomeIcon,
  InsertDriveFile as InsertDriveFileIcon,
  Warning as WarningIcon,
} from "@material-ui/icons";

const routes = [
  {
    component: UserManagement,
    path: "/app/user",
    label: "User Management",
    permission: [Roles.SUPER_ADMIN],
    icon: HomeIcon,
    isSidebarLink: true,
  },
  {
    component: FileManagement,
    path: "/app/file",
    label: "File Management",
    exact: true,
    permission: [Roles.SUPER_ADMIN],
    icon: InsertDriveFileIcon,
    isSidebarLink: true,
  },
  {
    component: AlertManagement,
    path: "/app/alert",
    label: "Alert Management",
    permission: [Roles.SUPER_ADMIN],
    icon: WarningIcon,
    isSidebarLink: true,
  },
  {
    component: ChangePassword,
    path: "/app/change-password",
    label: "Change Password",
    permission: [Roles.SUPER_ADMIN, Roles.GUEST],
    isSidebarLink: false,
  },
];

export default routes;

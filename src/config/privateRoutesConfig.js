import Roles from "./roles";
import UserManagement from "../pages/userManagement/UserManagement";
import FileManagement from "../pages/fileManagement/FileManagement";
import AlertManagement from "../pages/alertManagement/AlertManagement";
import {
  Home as HomeIcon,
  InsertDriveFile as InsertDriveFileIcon,
  Warning as WarningIcon,
} from "@material-ui/icons";

const routes = [
  {
    component: UserManagement,
    path: "/app/user",
    label: "User management",
    permission: [Roles.SUPER_ADMIN],
    icon: HomeIcon,
  },
  {
    component: FileManagement,
    path: "/app/file",
    label: "File management",
    exact: true,
    permission: [Roles.SUPER_ADMIN],
    icon: InsertDriveFileIcon,
  },
  {
    component: AlertManagement,
    path: "/app/alert",
    label: "Alert Management",
    permission: [Roles.SUPER_ADMIN],
    icon: WarningIcon,
  },
];

export default routes;

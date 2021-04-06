import Roles from "./roles";
import UserManagement from "../pages/UserManagement/UserManagement";
import FileManagement from "../pages/fileManagement/FileManagement";
import {
  Home as HomeIcon,
  InsertDriveFile as InsertDriveFileIcon,
  BorderAll as TableIcon,
} from "@material-ui/icons";

const routes = [
  {
    component: UserManagement,
    path: "/app/user",
    label: "User management",
    exact: true,
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
    component: FileManagement,
    path: "/app/alert",
    label: "Alert",
    permission: [Roles.GUEST],
    icon: TableIcon,
  },
];

export default routes;

import Roles from "./roles";
import UserManagement from "../pages/userManagement/UserManagement";
import FileManagement from "../pages/fileManagement/FileManagement";
import AlertManagement from "../pages/alertManagement/AlertManagement";
import ChangePassword from "../pages/changePassword/ChangePassword";
import AlertManagementForUser from "../pages/alertManagementForUser/AlertManagementForUser";
import CRA from "../pages/cra/CRA";
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
    id: "UM",
    permission: [Roles.SUPER_ADMIN],
    icon: HomeIcon,
  },
  {
    component: FileManagement,
    path: "/app/file",
    label: "File Management",
    exact: true,
    id: "FM",
    permission: [Roles.SUPER_ADMIN],
    icon: InsertDriveFileIcon,
  },
  {
    component: AlertManagement,
    path: "/app/alert",
    label: "Alert Management",
    id: "AM",
    permission: [Roles.SUPER_ADMIN],
    icon: WarningIcon,
  },
  {
    component: AlertManagementForUser,
    path: "/app/alert",
    label: "Alert Management",
    id: "AM",
    permission: [Roles.USER],
    icon: WarningIcon,
  },
  {
    component: CRA,
    path: "/app/cra",
    label: "CRA",
    id: "CRA",
    permission: [Roles.USER],
    icon: WarningIcon,
  },
];

const otherRoutes = [
  {
    component: ChangePassword,
    path: "/app/change-password",
    label: "Change Password",
    permission: [Roles.SUPER_ADMIN, Roles.USER],
  },
];

export { otherRoutes };

export default routes;

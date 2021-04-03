import Roles from "./roles";
import Dashboard from "../pages/dashboard/Dashboard";
import Tables from "../pages/tables/Tables";
import { Home as HomeIcon, BorderAll as TableIcon } from "@material-ui/icons";

const routes = [
  {
    component: Dashboard,
    path: "/app/dashboard",
    label: "Dashboard",
    exact: true,
    permission: [Roles.SUPER_ADMIN],
    icon: HomeIcon,
  },
  {
    component: Tables,
    path: "/app/alert",
    label: "Alert",
    permission: [Roles.GUEST],
    icon: TableIcon,
  },
];

export default routes;

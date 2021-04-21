export function getAllowedRoutes(routes, role, modules) {
  const allowedRoutes = routes.filter(({ permission, id }) => {
    return permission.includes(role) && modules.includes(id);
  });

  return allowedRoutes;
}

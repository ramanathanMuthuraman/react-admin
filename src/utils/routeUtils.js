export function getAllowedRoutes(routes, role) {
  const allowedRoutes = routes.filter(({ permission }) => {
    return permission.includes(role);
  });

  return allowedRoutes;
}

Template.registerHelper("active", function (routeName) {
    // add a 'highlighting' class to the sidebar menu items if they match with the currentRoute
    var currentRoute = Router.current().route.getName();
    return currentRoute.indexOf(routeName) > -1 ? "body-sidebar-menu-item-is-active" : '';
});
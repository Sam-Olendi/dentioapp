/*
 ==========================================================================================
 LAYOUT CONFIGURATION
 // How to configure multiple layouts
 // http://stackoverflow.com/questions/28864942/meteor-use-2-different-layouts-ironrouter#
 ==========================================================================================
 */

Router.configure({
   dashboardTemplate: 'ApplicationLayout'
});


/*
 ======================
 ROUTE CONFIGURATION
 ======================
 */

Router.route('/', {
    layoutTemplate: 'ApplicationLayout',
    yieldRegions: {
        'appointments': { to: 'content' }
    },
    name: 'appointments'
});
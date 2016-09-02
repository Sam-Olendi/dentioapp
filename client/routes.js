/*
 ==========================================================================================
 LAYOUT CONFIGURATION
 // How to configure multiple layouts
 // http://stackoverflow.com/questions/28864942/meteor-use-2-different-layouts-ironrouter#
 ==========================================================================================
 */

Router.configure({
    dashboardTemplate: 'ApplicationLayout',
    generatorTemplate: 'GeneratorLayout',
    loginTemplate: 'LoginLayout'
});


/*
 ======================
 ROUTE CONFIGURATION
 ======================
 */

//Router.route('/login', {
//   layoutTemplate: 'LoginLayout'
//});

Router.route('/', {
    layoutTemplate: 'ApplicationLayout',
    yieldRegions: {
        'appointments': { to: 'content' }
    },
    name: 'appointments'
});

Router.route('/patients', {
    layoutTemplate: 'ApplicationLayout',
    yieldRegions: {
        'patients': { to: 'content' }
    },
    name: 'patients.all'
});

Router.route('/patients/:_id', {
    layoutTemplate: 'ApplicationLayout',
    yieldRegions: {
        'patientsSingle': { to: 'content' }
    },
    waitOn: function () {
        return Meteor.subscribe('patients.single', this.params._id);
    },
    data: function () {
        return Patients.findOne({_id: this.params._id});
    }
});

Router.route('/invoices', {
    layoutTemplate: 'ApplicationLayout',
    yieldRegions: {
        'invoices': { to: 'content' }
    },
    name: 'invoices'
});

Router.route('/services', {
    layoutTemplate: 'ApplicationLayout',
    yieldRegions: {
        'services': { to: 'content' }
    },
    name: 'services'
});

Router.route('/generator', {
    layoutTemplate: 'GeneratorLayout',
    yieldRegions: {
        'generations': { to: 'generator' }
    }
});

Router.route('/generator/invoice/new', {
    layoutTemplate: 'GeneratorLayout',
    yieldRegions: {
        'generationNew': { to: 'generator' }
    }
});

Router.route('/generator/invoice/:_id', {
   layoutTemplate: 'GeneratorLayout',
    yieldRegions: {
        'generationEdit': { to: 'generator' }
    }
});

AccountsTemplates.configure({
   defaultLayout: 'LoginLayout'
});

AccountsTemplates.configureRoute('signIn', {
    name: 'signIn',
    path: '/login',
    redirect: '/'
});

Router.plugin('ensureSignedIn', {
    except: ['signIn']
});
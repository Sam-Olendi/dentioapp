/*
Configuring useraccounts package to bend to my heavy-handed iron will
More details: https://github.com/meteor-useraccounts/core/blob/master/Guide.md#basic-customization
 */

var onUserLogout = function () {
    Router.go('/login');
};

AccountsTemplates.configure({
    confirmPassword: true,
    focusFirstInput: true,
    showLabels: true,
    showPlaceholders: true,
    homeRoutePath: '/',
    showValidating: true,
    continuousValidation: true,
    negativeValidation: true,
    positiveValidation: true,
    negativeFeedback: true,
    positiveFeedback: true,
    onLogoutHook: onUserLogout,
    texts: {
        inputIcons: {
            isValidating: 'icon-refresh',
            hasSuccess: 'icon-accept',
            hasError: 'icon-cancel'
        }
    }
});
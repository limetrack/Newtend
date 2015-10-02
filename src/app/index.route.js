(function () {
    'use strict';

    angular
        .module('node')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('contacts', {
                url: '/contact_card',
                templateUrl: 'app/components/contactCard/contact_card.html'
            });

        $urlRouterProvider.otherwise('/contact_card');
    }

})();

'use strict';

angular.module('app.site')
    .config(['$httpProvider', '$stateProvider', function ($httpProvider, $stateProvider) {
        $stateProvider
            .state('profile', {
                parent: 'site',
                url: '/profile',
                data: {
                    roles: ['user']
                },
                resolve: {
                    profile: ['$http', 'API',
                        function ($http, API) {
                            return $http.get(API.PROFILE)
                                .then(function (response) {
                                    return response.data;
                                });
                        }
                    ],
                    inventory: ['market',
                        function (market) {
                            return market.getInventory();
                        }
                    ],
                    account: ['market',
                        function (market) {
                            return market.getAccount();
                        }
                    ],
                    stocks: ['$stateParams', 'stock', 'inventory',
                        function ($stateParams, stock, inventory) {
                            var symbols = inventory.map(function (array) {
                                return array.symbol;
                            });

                            if (symbols.toString() == "")
                                return [];

                            return stock.getStock(symbols.toString());
                        }
                    ]
                },
                views: {
                    'content': {
                        templateUrl: 'app/site/profile/profile.html',
                        controller: 'SiteProfileController as profile'
                    }
                }
            });
    }]);

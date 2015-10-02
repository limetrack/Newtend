angular.module('node').service('ModalService', function ($modal, ContactsStore) {
    "use strict";
    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: '/app/components/modalWindow/modal.html'
    };

    var modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'OK',
        headerText: 'Proceed?',
        bodyText: 'Perform this action?',
        isExportDialog: true
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) {
            customModalDefaults = {};
        }
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.isImportedFileOk = customModalOptions.isExportDialog;
                $scope.content = customModalOptions.bodyText;

                $scope.modalOptions.ok = function (result) {
                    if (customModalOptions.isExportDialog) {
                        $scope.content = JSON.stringify(ContactsStore.contacts, "", 4);
                    } else {
                        try {
                            ContactsStore.contacts = angular.fromJson($scope.fileContent);
                            $modalInstance.close(result);
                        } catch (e) {
                            $scope.content = "Error!";
                            return false;
                        }
                    }
                };

                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };

                $scope.showContent = function ($fileContent) {
                    try {
                        $scope.fileContent = angular.fromJson($fileContent);
                        $scope.content = JSON.stringify($scope.fileContent, "", 4);
                        $scope.isImportedFileOk = true;
                    } catch (e) {
                        $scope.content = "Invalid file format!";
                        return false;
                    }
                };
            };
        }

        return $modal.open(tempModalDefaults).result;
    };
});

angular.module('node').controller('ContactsCtrl', function ($scope, $location, $timeout, ModalService, ContactsStore, DatePicker) {
    "use strict";
    
    $scope.storage = ContactsStore;    
    $scope.datePicker = DatePicker;
    
    $scope.orderProp = "";
    
    $scope.sort = function () {
        if ($scope.orderProp === "") {
            $scope.orderProp = "name";            
        } else {
            $scope.orderProp = "";
        }
    };

    $scope.resetContact = function () {
        $scope.storage.newContact = {
            name: "",
            date: "",
            gender: "Gender"
        };
    };
    
    $scope.showContact = function (contact) {
        $scope.storage.contacts.forEach(function(obj) {
            if (contact.name === obj.name) {
                $scope.storage.newContact = obj;
                $scope.validate();
            }
        });
    };

    $scope.addContact = function () {
        if ($scope.validate()) {
            return;
        } 
        
        var isExists = false;
        $scope.storage.contacts.forEach(function(obj, index){
            if ($scope.storage.newContact.name === obj.name) {
                isExists = true;
            }
        });
        
        if (isExists === true) {
            $scope.resetContact();
            return;
        }
        
        $scope.storage.contacts.push($scope.storage.newContact);
        $scope.resetContact();
    };
    
    $scope.isNameEmpty = false;
    $scope.isDateEmpty = false;
    $scope.isGenderEmpty = false;
    
    $scope.validate = function () {
        $scope.storage.newContact.name = $scope.storage.newContact.name.replace(/[^A-Za-z\s]/g, "");
        
        if ($scope.storage.newContact.name === "") {
            $scope.isNameEmpty = true;
        } else {
            $scope.isNameEmpty = false;    
        }
        if ($scope.storage.newContact.date === "") {
            $scope.isDateEmpty = true;    
        } else {
            $scope.isDateEmpty = false;    
        }
        if ($scope.storage.newContact.gender === "Gender") {
            $scope.isGenderEmpty = true;    
        } else {
            $scope.isGenderEmpty = false;
        }
        if ($scope.isNameEmpty || $scope.isDateEmpty || $scope.isGenderEmpty) {
            return true;    
        }
        return false;
    };
    
    $scope.removeContact = function (contact) {
        $scope.storage.contacts.forEach(function(obj, index) {
            if (contact.name === obj.name) {
               $scope.storage.contacts.splice(index, 1);
            }
        });
    };
    
    $scope.export = function () {
        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Export data',
            headerText: 'Export dialog',
            bodyText: "Let\'s try to export!",
            isExportDialog: true
        };

        ModalService.showModal({}, modalOptions).then(function (result) {
            console.log("modal");
        });    
    };
    
    $scope.import = function () {
        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Import',
            headerText: 'Import dialog',
            bodyText: "Open .json file",
            isExportDialog: false
        };

        ModalService.showModal({}, modalOptions).then(function (result) {
            console.log("modal");
        });    
    };
});

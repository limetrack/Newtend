angular.module('node').service('DatePicker', function () {
    "use strict";

    this.today = function () {
        this.storage.newContact.date = new Date();
    };
    //this.today();

    this.clear = function () {
        this.storage.newContact.date = null;
    };
    
    this.maxDate = new Date();

    this.open = function () {
        this.status.opened = true;
    };

    this.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    this.format = 'dd/MM/yyyy';

    this.status = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    this.events = [
        {
            date: tomorrow,
            status: 'full'
      },
        {
            date: afterTomorrow,
            status: 'partially'
      }
    ];

    this.getDayClass = function (date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < this.events.length; i++) {
                var currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return this.events[i].status;
                }
            }
        }

        return '';
    };
});

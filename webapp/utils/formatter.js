sap.ui.define([
], function () {
    'use strict';
    return {
        getStatusText: function (sValue) {
            switch (sValue) {
                case 'Available':
                    return "Success";
                case "Out of Stock":
                    return "Warning";
                case 'Discontinued':
                    return "Error";
            }
        }
    }

});
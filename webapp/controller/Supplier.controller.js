sap.ui.define([
    'capri/controller/BaseController',
    'sap/ui/core/routing/History'
], function (Controller, History) {
    'use strict';
    return Controller.extend("capri.controller.Supplier", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("supplier").attachMatched(this._mRouteChanges, this);
        },
        onBack: function () {
            let oHistory = History.getInstance();
            let sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("overview", true);
            }
        },
        _mRouteChanges: function (oEvent) {
            let sPath = `/suppliers/${oEvent.getParameter("arguments").suppId}`;
            this.getView().bindElement(sPath);
        }
    })

});
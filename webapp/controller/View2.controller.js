sap.ui.define([
    'capri/controller/BaseController',
    'sap/ui/core/routing/History',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function (Controller, History, Fragment, Filter, FilterOperator) {
    'use strict';
    return Controller.extend("capri.controller.View2", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("details").attachMatched(this._mRouteChanges, this);
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
        onItemPress: function (oEvent) {
            let sPath = oEvent.getParameter("listItem").getBindingContextPath();
            let sIndex = sPath.split('/')[sPath.split('/').length - 1];
            this.oRouter.navTo("supplier", {
                suppId: sIndex
            })
        },
        // oSuppliersList: null,
        // oCitiesList: null,
        // inputField: null,
        onFilter: function () {
            if (!this.oSuppliersList) {
                Fragment.load({
                    name: "capri.fragments.popup",
                    controller: this,
                    // id: "idSupplier",
                }).then(this._mShowFilters.bind(this));
            } else {
                this.oSuppliersList.open();
            }
        },
        onF4Help: function (oEvent) {
            debugger;
            this.inputField = oEvent.getSource();
            if (!this.oCitiesList) {
                Fragment.load({
                    name: "capri.fragments.popup",
                    controller: this,
                    // id: "idCity",
                }).then(this._mShowCities.bind(this));
            } else {
                this.oCitiesList.open();
            }
        },
        onConfirm: function (oEvent) {
            debugger;
            let sPath = oEvent.getSource().getBinding("items").getPath();
            if (sPath.indexOf('cities') !== -1) {
                let selectedItem = oEvent.getParameter("selectedItem");
                let sTitle = selectedItem.getTitle();
                this.inputField.setValue(sTitle);
            }else{
                let selectedItems = oEvent.getParameter("selectedItems");
                const aFilters = selectedItems.map(element => {
                    return new Filter("name", FilterOperator.Contains, element.getTitle());
                })

                const oFilter = new Filter({
                    filters: aFilters,
                    and: false
                })

                this.getView().byId("idTable").getBinding("items").filter(oFilter);
            }

        },
        _mShowFilters: function (oFragment) {
            // connect dialog to the root view of this component (models, lifecycle)
            this.oSuppliersList = oFragment;
            this.getView().addDependent(this.oSuppliersList);
            this.oSuppliersList.bindAggregation("items", {
                path: '/suppliers',
                template: new sap.m.StandardListItem({
                    title: '{name}',
                    description: '{city}',
                    icon: 'sap-icon://supplier'
                })
            })
            this.oSuppliersList.open();
        },
        _mShowCities: function (oFragment) {
            debugger;
            // connect dialog to the root view of this component (models, lifecycle)
            this.oCitiesList = oFragment;
            this.getView().addDependent(this.oCitiesList);
            this.oCitiesList.bindAggregation("items", {
                path: '/cities',
                template: new sap.m.StandardListItem({
                    title: '{name}',
                    description: '{type}',
                    icon: 'sap-icon://home'
                })
            });
            this.oCitiesList.setMultiSelect(false);
            this.oCitiesList.open();
        },
        _mRouteChanges: function (oEvent) {
            let sPath = `/fruits/${oEvent.getParameter("arguments").fruitId}`;
            this.getView().bindElement(sPath);
        }
    })

});
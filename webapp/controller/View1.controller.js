sap.ui.define([
    'capri/controller/BaseController',
    'capri/utils/formatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(Controller, Formatter, Filter, FilterOperator) {
    'use strict';
    return Controller.extend("capri.controller.View1", {
        formatter: Formatter,
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        // onNext: function(){
        //     this.getView().getParent().to("AppView2");
        // },
        onItemSelect: function(oEvent){
            let oList = oEvent.getParameter("listItem");
            let sPath = oList.getBindingContextPath();
            let sIndex = sPath.split('/')[sPath.split('/').length - 1];
            // let oDetailPage = this.getView().getParent().getParent().getDetailPage("AppView2");
            // oDetailPage.bindElement(sPath);
            // this.getView().getParent().getParent().to("AppView2");
            this.oRouter.navTo("details",{
                fruitId: sIndex
            });
        },

        onSearch: function(oEvent){
            let aFilter = [];
            let whatWasSearched = oEvent.getParameter("query");
            aFilter.push(new Filter("name", FilterOperator.Contains, whatWasSearched));
            aFilter.push(new Filter("type", FilterOperator.Contains, whatWasSearched));
            let oNewfilter = new Filter({
                filters: aFilter,
                and: false
            })
            let oList = this.getView().byId("idList");
            oList.getBinding("items").filter(oNewfilter);
        }
    })
    
});
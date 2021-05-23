sap.ui.define([
    'sap/ui/core/UIComponent'
], function (UIComponent) {
    'use strict';
    return UIComponent.extend("capri.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            UIComponent.prototype.init.apply(this);
            let oRouter = this.getRouter();
            oRouter.initialize();

        },
        // createContent: function () {

        //     let oXMLView = new sap.ui.view({
        //         id: "App",
        //         viewName: "capri.view.App",
        //         type: "XML"
        //     })

        //     let oView1 = new sap.ui.view({
        //         id: "AppView1",
        //         viewName: "capri.view.View1",
        //         type: "XML"
        //     })

        //     let oView2 = new sap.ui.view({
        //         id: "AppView2",
        //         viewName: "capri.view.View2",
        //         type: "XML"
        //     })

        //     let oView3 = new sap.ui.view({
        //         id: "AppAvengers",
        //         viewName: "capri.view.Avengers",
        //         type: "XML"
        //     })
        //     // oXMLView.byId("appContId").addPage(oView1).addPage(oView2);
        //     oXMLView.byId("appContId").addMasterPage(oView1).addDetailPage(oView3).addDetailPage(oView2);
        //     return oXMLView;
        // },
        destroy: function () {

        }
    })

});
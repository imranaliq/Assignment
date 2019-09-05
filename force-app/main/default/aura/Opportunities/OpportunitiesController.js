({

    doInit: function (cmp, event, helper) {
        helper.getOpporunityStage(cmp, event);
    },
    handleNavigateClick: function (cmp, event, helper) {

        helper.navigateClick(cmp, event);
    },
    onRender: function (component, event, helper) {
        
        if (!component.get("v.initializationCompleted")) {
            //Attaching document listener to detect clicks
            component.find('stage-dropdown').getElement().addEventListener("click", function (event) {
                //handle click component
                helper.handleClick(component, event, 'component');
            });
            //Document listner to detect click outside multi select component
            document.addEventListener("click", function (event) {
                helper.handleClick(component, event, 'document');
            });
            //Marking initializationCompleted property true
            component.set("v.initializationCompleted", true);
            //Set picklist name
            helper.setPickListName(component, component.get("v.selectedOptions"));
        }

    },

})

({
    getOpportunityList: function (cmp, event) {

        var myPageRef = cmp.get("v.pageReference");
        var param = myPageRef.state.c__stages;
        var stageList = param.split(',');

        var action = cmp.get('c.getOpportunityList');
        action.setParams({
            "stages": stageList
        });
        action.setCallback(this, function (response) {
            if (response.getState() == 'SUCCESS') {
                var result = response.getReturnValue();
                cmp.set('v.opportunities', result);
            } else {
                alert('Error.');
            }

        });
        $A.enqueueAction(action);
    },
    updateStage: function (cmp, event, opportunitySelectedIds) {

        var action = cmp.get('c.updateOppurtunityStage');
        action.setParams({
            "opportunityIds": opportunitySelectedIds
        });
        action.setCallback(this, function (response) {
            if (response.getState() == 'SUCCESS' && response.getReturnValue() == true) {
                alert('Opportunity stage updated successfully.');
            } else {
                alert('Error.');
            }
        });

        $A.enqueueAction(action);
    }
})

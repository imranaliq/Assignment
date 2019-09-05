({
    doInit: function (cmp, event, helper) {
        helper.getOpportunityList(cmp, event);
    },
    getSelectedOpportunity: function (cmp, event, helper) {
        var selectedId = '';

        selectedId = event.target.getAttribute('id');

        if (document.getElementById(selectedId).checked
            && cmp.get("v.selectedOpportunity").indexOf(selectedId) < 0)
            cmp.get('v.selectedOpportunity').push(selectedId);
        else {
            var index = cmp.get("v.selectedOpportunity").indexOf(selectedId);
            if (index > -1) {
                cmp.get("v.selectedOpportunity").splice(index, 1);
            }
        }
    },
    handleUpdateStageClick: function (cmp, event, helper) {
        var selectedOpportunityIds = cmp.get('v.selectedOpportunity');

        if (selectedOpportunityIds.length > 0) {
            helper.updateStage(cmp, event, selectedOpportunityIds);
            helper.getOpportunityList(cmp, event);
        }
        else {
            alert('Please select atleast one opportunity');
        }
    }
})

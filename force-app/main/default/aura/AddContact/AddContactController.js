({
    doInit: function (cmp, event, helper) {
        helper.getAccount(cmp, event);
    },
    clickCreate: function (cmp, event, helper) {
        var accounts = cmp.get('v.selectedAccount');
        var validContact = cmp.find('contactform').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        if (validContact) {
            if (accounts.length > 0) {
                var contact = cmp.get('v.newContact');
                helper.createContact(cmp, event, contact, accounts);
                helper.getAccount();
            } else {
                alert('select atleas one account');
            }
        }
    },
    removeSelectedAccount: function (cmp, event, helper) {

        helper.setArray(cmp, event, 'v.selectedAccount', 'v.accounts', 'v.name');
    },
    addSelectedAccount: function (cmp, event, helper) {

        helper.setArray(cmp, event, 'v.accounts', 'v.selectedAccount', 'v.value');
    }
})

({
    getAccount: function (cmp, event) {

        var action = cmp.get('c.getAccount');
        action.setCallback(this, function (response) {
            if (response.getState() == 'SUCCESS') {
                var result = response.getReturnValue();
                cmp.set('v.accounts', result);
            } else {
                alert('Error.');
            }
        });

        $A.enqueueAction(action);
    },
    setArray: function (cmp, event, source, destination, item) {

        var selectedId = event.getSource().get(item);
        var sourceList = cmp.get(source);
        var destinationList = cmp.get(destination);

        sourceList.forEach((option, index) => {
            if (option.Id == selectedId) {
                destinationList.push(option);
                sourceList.splice(index, 1);
            }
        });
        cmp.set(source, sourceList);
        cmp.set(destination, destinationList);
    },
    createContact: function (cmp, event, contact, selectedAccounts) {
        var action = cmp.get('c.addContact');
        contact.AccountId = selectedAccounts[0].Id;
        selectedAccounts.splice(0, 1);
        action.setParams({
            'con': contact,
            'accounts': selectedAccounts
        });
        action.setCallback(this, function (response) {
            if (response.getState() == 'SUCCESS' && response.getReturnValue() == true) {
                let result = response.getReturnValue();
                cmp.set('v.newContact', {
                    'sObjectType': 'Contact'
                    , 'FirstName': ''
                    , 'LastName': ''
                    , 'Phone': ''
                    , 'HomePhone': ''
                    ,'AccountId':''
                });
                cmp.set('v.selectedAccount', []);
                alert('Contact added successfully.');
            } else {
                let state = response.getState()
                alert(state);
            }
        });
        $A.enqueueAction(action);

    }
})

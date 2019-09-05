public with sharing class ContactAddOnMultipleAccountCtrl {
    public ContactAddOnMultipleAccountCtrl() {

    }

@AuraEnabled
    public static list<Account> getAccount(){
        List<Account> accounts = [select Id,Name
                                  from Account
                                  order by Name asc];
        return accounts;
    }

    @AuraEnabled
    public static boolean addContact(Contact con,List<Account> accounts){

        try{
            boolean result = true;
            insert con;

            List<AccountContactRelation> acrList = new List<AccountContactRelation>();
            for (Account a : accounts) {
               
                AccountContactRelation acr = new AccountContactRelation();
                acr.AccountId = a.Id;
                acr.ContactId = con.Id;
                acrList.add(acr);
                
            }

             Database.SaveResult [] insertResult =  Database.insert(acrList,false) ;

               for(Database.SaveResult r : insertResult)
        {
              System.debug(r);
            if(!r.isSuccess())
             result = false;
        }
        return result;

        }catch(exception ex)
        {
            return false;
        }
        
    }
}

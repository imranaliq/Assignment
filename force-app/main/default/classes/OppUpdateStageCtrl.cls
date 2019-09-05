public with sharing class OppUpdateStageCtrl {
    public OppUpdateStageCtrl() {

    }

    @AuraEnabled
    public static List<String> getOpportunityStages(){
        List<String> lstStages = new List<String>();
        Schema.DescribeFieldResult fldResult = Opportunity.stagename.getDescribe();
        List<Schema.PicklistEntry> stagePl = fldResult.getPicklistValues();
        for (Schema.PicklistEntry s : stagePl) {
            lstStages.add(s.getLabel());
        }

        /*System.debug('fldResult '+fldResult); 
        System.debug('lstStages '+lstStages); */
        return lstStages;
    }

    @AuraEnabled
    public static List<Opportunity> getOpportunityList(String[] stages){
        
        List<Opportunity> oppoList = [select Id,Name,stageName 
                                      from opportunity 
                                      where stageName in :stages
                                      order by stageName asc,Name asc];
        return oppoList;
    }

    @AuraEnabled
    public static boolean updateOppurtunityStage(Id[] opportunityIds){
        boolean result = true;
        List<Opportunity> opportunities = [select Id,Name,stageName 
                                             from Opportunity 
                                             where Id in :opportunityIds];
       
        for (Opportunity o : opportunities) {
            o.StageName = 'Closed Won';
            o.CloseDate = system.today();
        }
        
        System.debug(opportunities);
        Database.SaveResult [] updateResult = Database.update(opportunities, false);
        for(Database.SaveResult r : updateResult)
        {
              System.debug(r);
            if(!r.isSuccess())
             result = false;
        }
        return result;
    }
}

public with sharing class PlayerController {
    @AuraEnabled(cacheable=true)
public static List<Players__c> getPlayers() {
    return [SELECT Id, Name, Role__c FROM Players__c];
}
}
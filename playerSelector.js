import { LightningElement, wire, track } from 'lwc';
import getPlayers from '@salesforce/apex/PlayerController.getPlayers';

export default class PlayerSelector extends LightningElement {
    @track playersData;
    @track selectedPlayers = [];
    @track error;

    
    @wire(getPlayers)
    wiredPlayers({ error, data }) {
        if (data) {
            this.playersData = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.playersData = undefined;
        }
    }
    
    // Divide into categories based on Role__c
    get wicketKeepers() {
        return this.playersData ? this.playersData.filter(player => player.Role__c === 'WK') : [];
    }
    
    get batsmen() {
        return this.playersData ? this.playersData.filter(player => player.Role__c === 'BAT') : [];
    }
    
    get allRounders() {
        return this.playersData ? this.playersData.filter(player => player.Role__c === 'AR') : [];
    }
    
    get bowlers() {
        return this.playersData ? this.playersData.filter(player => player.Role__c === 'BOWL') : [];
    }
    
    
    handleChange(e) {
        if (e.target.checked) {
           
            this.selectedPlayers = [...this.selectedPlayers, e.target.value];
        } else {
            
            this.selectedPlayers = this.selectedPlayers.filter(playerId => playerId !== e.target.value);
        }
    }
}
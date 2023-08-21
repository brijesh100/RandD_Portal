import { Component,  Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray} from '@angular/forms';

import { ApiClientService } from 'src/app/service/api-client.service';
import{ RD_CONSTANT} from '../../../../../keys/constant';

@Component({
  selector: 'app-fp-investigator-card',
  templateUrl: './fp-investigator-card.component.html',
  styleUrls: ['./fp-investigator-card.component.css']
})
export class FpInvestigatorCardComponent implements OnChanges {
  @Input() investigator:any; 
  @Input() coInvestigators:any;   
  @Input() isEditMode:any; 
  coInvestigatorForm: FormGroup;
  coInvestigatorFormm: FormGroup;
  user:any;
  searchId:string;
  isred:boolean=false;
  team:any=[];
  other_cos:any=[];
  usererror: any;
  invertigatorIds:any = [];
  successMessage:string;
  errorMessage:string;

  constructor(private fb: FormBuilder, private service: ApiClientService) { }



  ngOnChanges(): void {
    this.coInvestigatorForm = this.fb.group({
      newcoInvestigator:[""],
      coInvestigatorSearchList : this.fb.array([]),
      newlyAddedcoInvestigators: this.fb.array([])
    });
    if(this.coInvestigators)
    {
      if(this.coInvestigators.length>=2)
      {
        this.isred=true;
      }
      this.coInvestigators.forEach(coi =>{
        this.team.push(coi)
        this.newlyAddedcoInvestigators .push(this.fb.control(coi))
      });
    }
    
  }

  clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
  }

  showUserOverview(userId){
    userId=userId.split('-')[0];
    this.service.getUserById(userId).subscribe(userdata =>{
      this.user = userdata;
    })
  }
  get coInvestigatorSearchList(){
    return <FormArray>this.coInvestigatorForm.get('coInvestigatorSearchList');
  }

  get newlyAddedcoInvestigators(){
    return <FormArray>this.coInvestigatorForm.get('newlyAddedcoInvestigators');
  }

  clearcoInvestigatorSearchList(){
    while ( this.coInvestigatorSearchList.length !== 0) {
      this.coInvestigatorSearchList.removeAt(0)
    }
  }

  setcoInvestigatorList(userIds){
    userIds.forEach( id =>{
      if(![...this.coInvestigators, ...this.newlyAddedcoInvestigators.value].includes(id)){
        this.coInvestigatorSearchList.push(this.fb.control(id))
      }
    });
  }

  getMatchingIds(searchId){
    const newcoInvestigator=searchId.charAt(0).toUpperCase() + searchId.slice(1).toLowerCase()
    this.clearcoInvestigatorSearchList();
    if( newcoInvestigator.length > 1){
      this.service.getMatchingUserId(newcoInvestigator)
        .subscribe( userIds => { this.setcoInvestigatorList(userIds) });
    }
  }

  addNewcoInvestigator(index){
    let newcoInvestigator = this.coInvestigatorSearchList.value[index];
    this.newlyAddedcoInvestigators.push(this.fb.control(newcoInvestigator));
    this.coInvestigatorForm.get("newcoInvestigator").reset();
    this.clearcoInvestigatorSearchList();
  }

  deleteNewcoInvestigator(index){
    this.newlyAddedcoInvestigators.removeAt(index);
  }
  deletecoInvestigator(index){
    this.newlyAddedcoInvestigators.removeAt(index);
  }

  getFormData(){
    const {newlyAddedcoInvestigators} = this.coInvestigatorForm.value;
    return { investigator :this.investigator, coInvestigator:[...newlyAddedcoInvestigators]};
  }
  
}

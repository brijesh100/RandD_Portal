import { Component,  Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {filterUserId} from "../../../../utils/project.utils";
import { ApiClientService } from 'src/app/service/api-client.service';

@Component({
  selector: 'app-project-contributors-card',
  templateUrl: './project-contributors-card.component.html',
  styleUrls: ['./project-contributors-card.component.css']
})
export class ProjectContributorsCardComponent implements OnChanges {

  @Input() contributors:any;   
  @Input() isEditMode:any; 
  contributorForm: FormGroup;
  user: any;
  constructor(private fb: FormBuilder, private service: ApiClientService) { }

  ngOnChanges(): void {
    this.contributorForm = this.fb.group({
      newContributor:[""],
      contributorSearchList : this.fb.array([]),
      newlyAddedContributors: this.fb.array(this.contributors)
    });
    console.log(typeof(this.contributors))
  }

  get contributorSearchList(){
    return <FormArray>this.contributorForm.get('contributorSearchList');
  }

  get newlyAddedContributors(){
    return <FormArray>this.contributorForm.get('newlyAddedContributors');
  }

  clearContributorSearchList(){
    while ( this.contributorSearchList.length !== 0) {
      this.contributorSearchList.removeAt(0)
    }
  }

  setContributorList(userIds){
    userIds.forEach( id =>{
      if(![...this.contributors, ...this.newlyAddedContributors.value].includes(id)){
        this.contributorSearchList.push(this.fb.control(id))
      }
    });
  }

  getMatchingIds(searchId){
    const newContributor=searchId.charAt(0).toUpperCase() + searchId.slice(1).toLowerCase()
    this.clearContributorSearchList();
    if( newContributor.length > 1){
      this.service.getMatchingUserId(newContributor)
        .subscribe( userIds => { this.setContributorList(userIds) });
    }
  }

  addNewContributor(index){
    let newContributor = this.contributorSearchList.value[index];
    this.newlyAddedContributors.push(this.fb.control(newContributor));
    this.contributorForm.get("newContributor").reset();
    this.clearContributorSearchList();
  }

  deleteNewcontributor(index){
    this.newlyAddedContributors.removeAt(index);
  }
  deletecontributor(index){
    this.newlyAddedContributors.removeAt(index);
  }

  getFormData(){
    const {newlyAddedContributors} = this.contributorForm.value;
    return [...newlyAddedContributors];
  }
  showUserOverview(userId){
    userId=userId.split('-')[0];
    this.service.getUserById(userId).subscribe(userdata =>{
      this.user = userdata;
    })
  }

}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators,FormArray} from '@angular/forms';
import { ApiClientService } from 'src/app/service/api-client.service';
import { GlobalStoreService } from 'src/app/service/global-store.service';
import { ThemeService } from '../../../theme.service';
@Component({
  selector: 'app-user-data-modal',
  templateUrl: './user-data-modal.component.html',
  styleUrls: ['./user-data-modal.component.css']
})
export class UserDataModalComponent implements OnInit {

  @Input() darktheme:any;

  constructor(private service: ApiClientService,private formBuilder: FormBuilder,private globalStore: GlobalStoreService,private themeService: ThemeService) { }
  userForm:FormGroup;
  submitted = false;
  isSonatechmail = true;
  userId:any;
  @ViewChild('closebutton') closebutton;
  ngOnInit(): void {
    this.userId = localStorage.getItem('USERID');
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]]
  });
  }
  get f() { return this.userForm.controls; }
  onSubmit() {
    const {userId} = this.globalStore.getGlobalStore();
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    // Check if email is sonatechId
    if(!((this.userForm.value.email).includes('sonatech'))){
      this.isSonatechmail = false;
      return;
    }
    // Add user data API Call
    this.service.addContact(this.userForm.value,userId).subscribe(res=>{
      if(res){
        // Closing the modal
        this.closebutton.nativeElement.click();
      }
    });
  }
  change(values)
  {
    this.darktheme=values.currentTarget.checked;
    console.log(values.currentTarget.checked);
    this.globalStore.settheme(values.currentTarget.checked)
    if(this.darktheme){
    this.service.enabledark(this.userId).subscribe();
    this.themeService.toggleDark()
    }
    else{
      this.service.disabledark(this.userId).subscribe();
      this.themeService.toggleLight()
    }
    window.location.reload();
  }
}

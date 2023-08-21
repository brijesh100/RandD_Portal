import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalStoreService } from '../../../service/global-store.service';
import { ApiClientService } from '../../../service/api-client.service';
import { getYesterdayDate, getCreatedDate, filterUserId } from '../../../utils/project.utils';
import { RD_CONSTANT } from '../../../keys/constant';
@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent implements OnInit {
  @ViewChild('iframe') iframe: ElementRef;
  publicationForm: FormGroup;
  successMessage: string;
  errorMessage: string;
  userIdName: string;
  ptypes: any;
  type: any = '';
  isloading: boolean = false;
  publicationId: any;
  publication: any;
  team: any = [];
  upfile: File;
  contributorIds: any = [];
  userDepartment: String;
  usererror: any;
  matchedPublications: any;
  selectedMatchedPublication: any; D
  resolvePublication: Boolean = false;
  resolvePublicationData: any;
  @ViewChild('launchModal') launchModal;
  other_cos: any = [];
  constructor(private fb: FormBuilder, private globalStore: GlobalStoreService, private service: ApiClientService
    , private activatedRoute: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
    this.type = ''
    const { userId, userName, userDepartmentId } = this.globalStore.getGlobalStore();
    this.userDepartment = userDepartmentId
    this.userIdName = `${userId}-${userName}`;
    this.publicationForm = this.fb.group({
      publicationType: ['', Validators.required],
      publicationName: ['', Validators.required],
      paperTitle: ['', Validators.required],
      coAuthor: [''],
      searchedContributorId: [''],

      DOIorURL: ['', Validators.required],
      publisherId: [this.userIdName, Validators.required],
      Department: userDepartmentId
    });

    this.ptypes = { type: ["Journal", "Conference proceedings", "Arvix", "Book", "Book Chapter", "Magazine", "Newspaper", "Blog"] };
  }


  get pubf() { return this.publicationForm.controls; }

  searchDOI() {
    let link = this.publicationForm.value.DOIorURL;
    this.isloading = true;
    if (link.substring(0, 4) != "http") {
      console.log(link);
      // if(link.substring(0,3)!="dx." && link.substring(0,3)!="doi"){
      //   if(link[0]!='/'){
      //     link="/"+link;
      //   }
      //   link="doi.org"+link;
      // }
      link = 'https://' + link;
    }
    this.iframe.nativeElement.src = link;
    fetch(link, {
      headers: {
        'Accept': 'application/vnd.citationstyles.csl+json; charset=utf-8'
      }
    }).then(res => {
      res.json().then(data => {
        this.isloading = false;
        this.publicationForm.patchValue({ ISSN: data.ISSN[0] });
        this.publicationForm.patchValue({ DOIorURL: data.URL });
        this.publicationForm.patchValue({ paperTitle: data.title });
        this.publicationForm.patchValue({ publicationName: data['container-title'] });
        this.publicationForm.patchValue({ volumeNumber: data.volume });
        this.publicationForm.patchValue({ issueNumber: data.issue });
        this.publicationForm.patchValue({ pagesFrom: data.page ? data.page.split('-')[0] : '' });
        this.publicationForm.patchValue({ pagesTo: data.page ? data.page.split('-')[0] : '' });
        this.publicationForm.patchValue({ editionNumber: data.edition });
        // this.publicationForm.patchValue({publicationYear:data.issued.date});
        // this.publicationForm.patchValue({publicationMonth:data.issued.date});
        // this.publicationForm.patchValue({publicationDay:data.issued.date});
        // this.publicationForm.patchValue({publicationPublisher:data.publisher});
        this.publicationForm.patchValue({ ISBN: data.ISBN });

        console.log(data);
        this.successMessage = 'Correct DOI';
      });
    }).catch(err => {
      this.isloading = false;
      console.log(err.StatusCode);
      this.errorMessage = "Invalid DOI, Please proceed if it is a URL";
    })
    setTimeout(() => {

      this.errorMessage = "Invalid DOI, Please proceed if it is a URL";
      this.isloading = false;
    }, 3000)
  }
  changeform(e) {
    this.type = e.target.value
    if (e.target.value == 'Arvix') {
      this.publicationForm = this.fb.group({
        publicationType: e.target.value,
        publicationName: ['', Validators.required],
        paperTitle: ['', Validators.required],
        publisherId: [this.userIdName, Validators.required],
        yearOfPublication: ['', Validators.required],
        contributionAs: ['', Validators.required],
        DOIorURL: ['', Validators.required],
        file: [{ filledApplication: '', acknowledgement: '' }],
        searchedContributorId: [''],
        otherContributorId: [''],
        reach: [''],
        Department: this.userDepartment
      });
    }
    else if (e.target.value == 'Journal' || e.target.value == 'Conference Proceedings') {
      this.publicationForm = this.fb.group({
        publicationType: e.target.value,
        publicationName: ['', Validators.required],
        paperTitle: ['', Validators.required],
        publisherId: [this.userIdName, Validators.required],
        volumeNumber: [''],
        ISSN: [''],
        pagesFrom: [''],
        pagesTo: [''],
        indexing: ['', Validators.required],
        ISBN: [''],
        yearOfPublication: ['', Validators.required],
        contributionAs: ['', Validators.required],
        issueNumber: [''],
        impactFactor: [''],
        editionNumber: [''],
        DOIorURL: ['', Validators.required],
        file: [{ filledApplication: '', acknowledgement: '' }],
        searchedContributorId: [''],
        otherContributorId: [''],
        reach: ['', Validators.required],
        Department: this.userDepartment
      });
    }
    else if (e.target.value == 'Book') {
      this.publicationForm = this.fb.group({
        publicationType: e.target.value,
        publicationName: ['', Validators.required],
        paperTitle: ['', Validators.required],
        publisherId: [this.userIdName, Validators.required],
        volumeNumber: ['', Validators.required],
        ISSN: [''],
        pagesFrom: [''],
        pagesTo: [''],
        indexing: ['', Validators.required],
        ISBN: [''],
        yearOfPublication: ['', Validators.required],
        contributionAs: ['', Validators.required],
        issueNumber: [''],
        impactFactor: [''],
        editionNumber: [''],
        DOIorURL: ['', Validators.required],
        file: [{ filledApplication: '', acknowledgement: '' }],
        searchedContributorId: [''],
        otherContributorId: [''],
        reach: ['', Validators.required],
        Department: this.userDepartment
      });
    }
    else if (e.target.value == 'Book Chapter') {
      this.publicationForm = this.fb.group({
        publicationType: e.target.value,
        publicationName: ['', Validators.required],
        paperTitle: ['', Validators.required],
        publisherId: [this.userIdName, Validators.required],
        volumeNumber: [''],
        ISSN: [''],
        pagesFrom: [''],
        pagesTo: [''],
        indexing: ['', Validators.required],
        ISBN: [''],
        yearOfPublication: ['', Validators.required],
        contributionAs: ['', Validators.required],
        issueNumber: [''],
        impactFactor: [''],
        editionNumber: [''],
        DOIorURL: ['', Validators.required],
        file: [{ filledApplication: '', acknowledgement: '' }],
        searchedContributorId: [''],
        otherContributorId: [''],
        reach: ['', Validators.required],
        Department: this.userDepartment
      });
    }
    else if (e.target.value == 'Magazine' || e.target.value == 'Newspaper') {
      this.publicationForm = this.fb.group({
        publicationType: e.target.value,
        publicationName: ['', Validators.required],
        paperTitle: ['', Validators.required],
        pagesFrom: [''],
        pagesTo: [''],
        ISBN: [''],
        ISSN: [''],
        publisherId: [this.userIdName, Validators.required],
        issueNumber: [''],
        yearOfPublication: ['', Validators.required],
        contributionAs: ['', Validators.required],
        DOIorURL: ['', Validators.required],
        file: [{ filledApplication: '', acknowledgement: '' }],
        searchedContributorId: [''],
        otherContributorId: [''],
        reach: ['', Validators.required],
        Department: this.userDepartment
      });
    }
    else if (e.target.value == 'Blog') {
      this.publicationForm = this.fb.group({
        publicationType: e.target.value,
        publicationName: ['', Validators.required],
        paperTitle: ['', Validators.required],
        publisherId: [this.userIdName, Validators.required],
        yearOfPublication: ['', Validators.required],
        DOIorURL: ['', Validators.required],
        file: [{ filledApplication: '', acknowledgement: '' }],
        searchedContributorId: [''],
        otherContributorId: [],
        reach: ['', Validators.required],
        Department: this.userDepartment
      });
    }

  }

  handleFileInput(files: FileList) {
    this.upfile = files.item(0);
    //this.publicationForm.value.file = files.item(0);
  }

  clearMessage() {
    this.successMessage = "";
    this.errorMessage = "";
    this.usererror = "";
  }

  //Name search
  searchContributorIds(searchId) {
    searchId = searchId.charAt(0).toUpperCase() + searchId.slice(1).toLowerCase()
    if (this.contributorIds.length === 0 || searchId !== this.contributorIds[0]) {
      this.service.getMatchingUserId(searchId).subscribe(userIds => {
        this.contributorIds = userIds;
      })
    }
  }

  //Name Array push with validation
  addContributorToTeam(contributorId) {
    this.service.getUserById(contributorId.split('-')[0]).subscribe(res => {
      if (res) {
        if (!this.team.includes(contributorId) &&
          contributorId != "" &&
          this.team.length <= RD_CONSTANT.MAX_CONTIBUTOR_PER_PROJECT) {
          this.team.push(contributorId);
          this.publicationForm.patchValue({ searchedContributorId: "" });
        }
      }
    }, error => {
      this.usererror = error;
    });
  }
  addotherco(coauthid) {
    console.log(coauthid)
    this.other_cos.push(coauthid);
    this.publicationForm.patchValue({ otherContributorId: '' });
  }
  removeContributorFromTeam(memberId) {
    this.team = this.team.filter(people => (people != memberId || people == this.userIdName));
  }
  removecoauth(memberId) {
    this.other_cos = this.other_cos.filter(people => (people != memberId || people == this.userIdName));
  }
  clearContributorIdsDataList() {
    this.contributorIds = [];
  }


  //Publication name search
  searchMatchingPublication(paperTitle) {
    paperTitle = paperTitle.charAt(0).toUpperCase() + paperTitle.slice(1).toLowerCase()

    this.service.getMatchingPublication(paperTitle).subscribe(res => {
      this.matchedPublications = res;
      console.log(res);
    })
  }

  selectMatchedPublication(publication: String) {
    console.log(publication)
    this.selectedMatchedPublication = publication;
    setTimeout(() => {

      if (publication.startsWith('PUB')) {
        this.launchModal.nativeElement.click();
      }
    }, 100);
  }

  addPublication() {
    const publicationDetails = this.publicationForm.value;
    publicationDetails.coAuthor = filterUserId(this.team);
    publicationDetails.publisherId = publicationDetails.publisherId.split('-')[0];
    publicationDetails.extraCoAuthor = filterUserId(this.other_cos);
    this.service.createNewPublication(publicationDetails).subscribe(response => {
      this.clearMessage();
      this.successMessage = response.message;
      this.publicationForm.reset();
      this.publicationForm.patchValue({ publisherId: this.userIdName });
      this.router.navigate([`/publication/${response.response.publicationId}`]);
    }, error => {
      this.clearMessage();
      this.errorMessage = error;
    })
  }

}

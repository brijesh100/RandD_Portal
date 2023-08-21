export const RD_CONSTANT ={
DESIGNATION : [
  { userDesignationCode: 'ADMIN', userDesignation: 'Admin' },
  { userDesignationCode: 'HOD', userDesignation: 'Head of the Department' },
  { userDesignationCode: 'PROFR', userDesignation: 'Teaching staff' },
  { userDesignationCode: 'RESER', userDesignation: 'Non-Teaching staff' },
  { userDesignationCode: 'STUDT', userDesignation: 'Student' },
  { userDesignationCode: 'MNGMT', userDesignation: 'Management' }
],
SDESIGNATION : [
  { usersDesignationCode: 'ADMIN', usersDesignation: 'Admin' },
  { usersDesignationCode: 'SUBADMIN', usersDesignation: 'Sub-Admin' },
  { usersDesignationCode: 'PRINCI', usersDesignation: 'Principal' },
  { usersDesignationCode: 'HOD', usersDesignation: 'Head of the Department' },
  { usersDesignationCode: 'PROFR', usersDesignation: 'Professor' },
  { usersDesignationCode: 'ASOPROFR', usersDesignation: 'Associate Professor' },
  { usersDesignationCode: 'ASNPROFR', usersDesignation: 'Assistant Professor' },
  { usersDesignationCode: 'LECTURER', usersDesignation: 'Lecturer' },
  { usersDesignationCode: 'RESAS', usersDesignation: 'Research Assistant/Associate' },
  { usersDesignationCode: 'JRF', usersDesignation: 'Junior Research Fellow' },
  { usersDesignationCode: 'AF', usersDesignation: 'Agile Faculty' },
  { usersDesignationCode: 'RESER', usersDesignation: 'Non-Teaching staff' },
  { usersDesignationCode: 'STUDT', usersDesignation: 'Student' },
  { usersDesignationCode: 'MNGMT', usersDesignation: 'Management' }
],
ROLE_WITH_NO_EDIT : ['STUD','MNGMT'],
ROLE_WITH_EDIT : ['HOD'],
ROLE_WITH_NO_CREATE : ['STUD','ADMIN','MNGMT'],
ROLE_WITH_NO_PROFILE : ['MNGMT','ADMIN'],
ROLE_WITH_ADMIN_ACCESS : ['ADMIN'],
ROLE_WITH_NO_DEPARTMENT : ['ADMIN','MNGMT'],
ROLE_WITH_EDIT_FUNDING:['ADMIN'],
ROLE_WITH_EDIT_FUNDING_PROJECT:['ADMIN'],
ROLE_WITH_EDIT_APPLIED_FUNDING_PROJECT:['ADMIN','HOD','MNGMT'],
MAX_CONTIBUTOR_PER_PROJECT: 15,

PROJECT_STATUS_CODE :{
  UNDER_REVIEW:'00',
  ONGOING: '01',
  INACTIVE: '03',
  COMPLETED:'02'
},
PROJECT_STATUS_MAP :{
  '00': 'Under Review',
  '01': 'Ongoing',
  '03': 'Inactive',
  '02': 'Completed'
},

FUNDING_STATUS_CODE :{
  STARTED: '01',
  FILLED:'02',
  CHECKED:'03',
  SUBMITTED:'04',
  REVIEW: '05',
  SHORTLISTED:'06',
  REJECTED:'07',
  ACCEPTED:'08'
},
FUNDING_STATUS_MAP :{
  '01': 'Started',
  '02': 'Filled',
  '03': 'Checked',
  '04': 'Submitted',
  '05': 'Review',
  '06': 'Shortlisted',
  '07': 'Rejected',
  '08': 'Accepted'
},

PATENT_STATUS_CODE :{
  Filed: '01',
  Published:'02',
  FERSubmitted:'03',
  HearingCompleted: '04',
  Granted:'05',
},
PATENT_STATUS_MAP :{
  '01': 'Filed',
  '02': 'Published',
  '03': 'FER Submitted',
  '04': 'HearingCompleted',
  '05': 'Granted',

},
PATENT_STATUS:[
  'Filed',
  'Published',
  'FER Submitted',
  'Hearing Completed',
  'Granted'
],

//increment TOTAL_SIZE if new tile added to TILE_INDEX list
PROJECT_TILE_INDEX :{
    TOTAL_SIZE:5,
    TITLE:0,
    PRIORITY:1,
    SUMMARY:2,
    KEYWORDS:3,
    Details:4,
    REFERENCE:5,
    CONTENT:6,
    Funding:7
  },
FUNDING_TILE_INDEX :{
    TOTAL_SIZE:4,
    HEADER:0,
    DESCRIPTION:1,
    ADDL_DETAIL:2,
    LINKS:3
  },
  RECEIVED_FP_TILE_INDEX :{
    TOTAL_SIZE:7,
    HEADER:0,
    SUMMARY:1,
    KEYWORDS:2,
    AMOUNT:3,
    DATE:4,
    STATUS:5,
    INVESTIGATOR:6
  },

  SNAPSHOT_TILE_TITLE :{
    FUNDINGS:'Funded projects',
    LABS:'Total research labs',
    PROJECTS:'Total projects',
    PUBLICATIONS:'Total Publications',
    MOUS:'Total MOUs',
    PATENT:'Total Patents',
    RFUNDINGS:'Received Fundings',
    AFUNDINGS:'Applied Fundings',
    OTHER:'Other Stats'
  },

  FUNDING_TYPE : [
    { fundingType: 'Research Project grant' },
    { fundingType: 'Travel grant' },
    { fundingType: 'Conference/Workshop grant' },
    { fundingType: 'Others' },
  ],
  GRANT_TYPE : [
    'Research Project grant',
    'Training',
    'Conference/Workshop grant',
    'FDP',
    'Others'
  ],
  SNAPSHOT_TILE :{
    FUNDINGS:'Funded projects',
    LABS:'Total research labs',
    OnPROJECTS:'Ongoing projects',
    CoPROJECTS:'Completed Projects',
    ReProjects:'Research Projects',
    PiProjects:'Priority Projects',
    CONTRIBUTORS:'Contributors',
    PUBLICATIONS:'Total Publications',
    MOUS:'Total MOUs',
    RFUNDINGS:'Received Fundings',
    AFUNDINGS:'Applied Fundings',
    SCI:'Total SCI',
    SCOPUS:'Total SCOPUS',
    OTHERS:'Others',
    Publisher:'Total Publishers ',
    TotPatent:'Total Patents',
    GrantPatent: 'Granted',
    PubPatent:'Published',
    ferSub:'FER Submitted'


  },
  USER_DESIGNATION_MAP :{
    PROFR:'Professor',
    ASOPROFR: 'Associate Professor',
    ASNPROFR:'Assistant Professor',
    HOD:'Head of the Department',
    LECTURER:'Lecturer',
    RESAS:'Research Assistant',
    RESER:'Non-Teaching staff',
    STUDT:'Student',
    MNGMT:'Management',
    ADMIN:'Admin',
    PRINCI:'Principal'


  },
  PublicationTypes:["Journal","Conference Proceedings","Arvix","Book","Book Chapter","Media Outlet"],
  TRlevels:[0,1,2,3,4,5,6,7,8,9],
  TRlevelsColor:{'0':'badge-danger','1':'badge-danger','2':'badge-danger','3':'badge-danger','4':'badge-warning','5':'badge-warning','6':'badge-warning','7':'badge-success','8':'badge-success','9':'badge-success'},
  //declare new const TRlevelsLabel =>
  TRlevelsLabel:["9.Full Commercial Application","8.First of kind Commercial System","7.Demonstration System","6.Prototype System","5.Large scale Prototype","4.Small scale Prototype","3.Needs Validation","2.Technology Formulation","1.Basic Research","0.Idea"
  ],
  TRlevelText:{
    '0': "Idea (UnProven Concept)",
    '1': "Basic Research",
    '2': "Technology Formulation",
    '3': "Needs Validation",
    '4': "Small scale Prototype",
    '5': "Large scale Prototype",
    '6': "Prototype System",
    '7': "Demonstration System",
    '8': "First of a kind Commercial System",
    '9': "Full Commercial Application"
  },
  TRlevelContent:{
    '0': "Unproven concept, no testing has been performed",
    '1': "You can now describe the need(s) but have no evidence",
    '2': "Concept and application have been formulated",
    '3': "Have an initial offering, stakeholder like slideware",
    '4': "Built in a laboratory environment",
    '5': "Tested in intended environment",
    '6': "Tested in intended environment close to expected performance",
    '7': "Operating in operational environment at pre-commercial scale",
    '8': "All technical processes and systems to support commercial activity in ready state!",
    '9': "Technology on general availability for all customers"
  },
  chartColors:{
  'lpink':"rgba(255,99,132,0.9)",
  'lblue':"rgba(54, 162, 235,0.9)",
  'yellow':"rgba(255, 206, 86,0.9)",
  'grey':"rgba(231, 233, 237,0.9)",
  'green':"rgba(75, 192, 192,0.9)",
  'purple':"rgba(153, 153, 239,0.9)",
  'white':"rgba(220, 220, 220,0.9)",
  'red':"rgba(247, 70, 74,0.9)",
  'orange':"rgba(70, 191, 189,0.9)",
  'brown':"rgba(253, 180, 92,0.9)",
  'grey2':"rgba(148, 159, 177,0.9)",
  'darkgrey':"rgba(77, 83, 96,0.9)",
  "bgreen":'rgba(59, 184, 111,0.9)',
  'purple2':"#8722ca",
  'green2':"#70dd55",
  'black':"#000"

},
  breadcrumbNames:{
    'dashboard':'Dashboard',
    'project':'Projects',
    'admin-panel':'Manage',
    'project/showPriority':'Priority Projects',
    'user':'Profile'


  }
}

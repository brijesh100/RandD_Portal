import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCreateGuardService } from '../../service/auth-guard.service';
import { SharedComponentModule } from '../../shared-components/shared-component.module';

import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectContentTileComponent } from './tiles/project-content-tile/project-content-tile.component';
import { ProjectSummaryTileComponent } from './tiles/project-summary-tile/project-summary-tile.component';
import { ProjectReferencesTileComponent } from './tiles/project-references-tile/project-references-tile.component';
import { ProjectKeywordsTileComponent } from './tiles/project-keywords-tile/project-keywords-tile.component';
import { ProjectStatusCardComponent } from './cards/project-status-card/project-status-card.component';
import { ProjectContributorsCardComponent } from './cards/project-contributors-card/project-contributors-card.component';
import { ProjectTitleTileComponent } from './tiles/project-title-tile/project-title-tile.component';
import { ProjectHistoryModalComponent } from './modals/project-history-modal/project-history-modal.component';
import { ProjectUpdateModalComponent } from './modals/project-update-modal/project-update-modal.component';
import { AllProjectSummaryComponent } from './all-project-summary/all-project-summary.component';
import { ProjectFundingCardComponent } from './cards/project-funding-card/project-funding-card.component';
import { ProjectVisibilityCardComponent } from './cards/project-visibility-card/project-visibility-card.component';
import { RemarkModalComponent } from './modals/remark-modal/remark-modal.component';
import { ProjectReviewTileComponent } from './tiles/project-review-tile/project-review-tile.component';
import { ShowRemarkComponent } from './modals/show-remark/show-remark.component';
import { ProjectFileTileComponent } from './tiles/project-file-tile/project-file-tile.component';
import { ProjectLockCardComponent } from './cards/project-lock-card/project-lock-card.component';
import { KeywordSearchComponent } from './keyword-search/keyword-search.component';
import { ChartsModule } from 'ng2-charts';
import { ProjectPublicationCardComponent } from './cards/project-publication-card/project-publication-card.component';
import { ProjectPublicationTileComponent } from './tiles/project-publication-tile/project-publication-tile.component';
import { PriorityProjectFormComponent } from './priority-project-form/priority-project-form.component';
import { PriorityProjectListComponent } from './priority-project-list/priority-project-list.component';
import { PriorityProjectTileComponent } from './tiles/priority-project-tile/priority-project-tile.component';
import { AddReviewRemarkModalComponent } from './modals/add-review-remark-modal/add-review-remark-modal.component';
import { ViewReviewRemarkModalComponent } from './modals/view-review-remark-modal/view-review-remark-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectDepartmentComponent } from './cards/project-department/project-department.component';
@NgModule({
  declarations: [
    ProjectPageComponent,
    ProjectFormComponent,
    ProjectContentTileComponent,
    ProjectSummaryTileComponent,
    ProjectReferencesTileComponent,
    ProjectKeywordsTileComponent,
    ProjectStatusCardComponent,
    ProjectContributorsCardComponent,
    ProjectTitleTileComponent,
    ProjectHistoryModalComponent,
    ProjectUpdateModalComponent,
    AllProjectSummaryComponent,
    ProjectFundingCardComponent,
    ProjectVisibilityCardComponent,
    RemarkModalComponent,
    ProjectReviewTileComponent,
    ShowRemarkComponent,
    ProjectFileTileComponent,
    ProjectLockCardComponent,
    KeywordSearchComponent,
    ProjectPublicationCardComponent,
    ProjectPublicationTileComponent,
    PriorityProjectFormComponent,
    PriorityProjectListComponent,
    PriorityProjectTileComponent,
    AddReviewRemarkModalComponent,
    ViewReviewRemarkModalComponent,
    ProjectDashboardComponent,
    ProjectDepartmentComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    SharedComponentModule,
    NgbModule
  ],
  providers: [ProjectCreateGuardService],
})
export class ProjectModule {}

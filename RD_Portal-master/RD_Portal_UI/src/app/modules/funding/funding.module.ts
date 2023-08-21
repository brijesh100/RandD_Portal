import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FundingRoutingModule } from './funding-routing.module';
import { SharedComponentModule } from '../../shared-components/shared-component.module';

import { AllFundingSummaryComponent } from './funding-call/all-funding-summary/all-funding-summary.component';
import { FundingDetailsPageComponent } from './funding-call/funding-details-page/funding-details-page.component';
import { FundingLinksCardComponent } from './funding-call/cards/funding-links-card/funding-links-card.component';
import { FundingDescriptionTileComponent } from './funding-call/tiles/funding-description-tile/funding-description-tile.component';
import { FundingAdditionalDetailsTileComponent } from './funding-call/tiles/funding-additional-details-tile/funding-additional-details-tile.component';
import { FundingHeaderSectionTileComponent } from './funding-call/tiles/funding-header-section-tile/funding-header-section-tile.component';

import { ReceivedFundingFormComponent } from './funding-project/received/received-funding-form/received-funding-form.component';
import { ReceivedFpDetailsPageComponent } from './funding-project/received/received-fp-details-page/received-fp-details-page.component';
import { FpHeaderSectionTileComponent } from './funding-project/tiles/fp-header-section-tile/fp-header-section-tile.component';
import { FpSummaryTileComponent } from './funding-project/tiles/fp-summary-tile/fp-summary-tile.component';
import { FpKeywordsTileComponent } from './funding-project/tiles/fp-keywords-tile/fp-keywords-tile.component';
import { FpDatesTileComponent } from './funding-project/tiles/fp-dates-tile/fp-dates-tile.component';
import { FpAmountTileComponent } from './funding-project/tiles/fp-amount-tile/fp-amount-tile.component';
import { FpStatusCardComponent } from './funding-project/cards/fp-status-card/fp-status-card.component';
import { FpInvestigatorCardComponent } from './funding-project/cards/fp-investigator-card/fp-investigator-card.component';
import { AppliedFpDetailsPageComponent } from './funding-project/applied/applied-fp-details-page/applied-fp-details-page.component';
import { ApplyFundingModalComponent } from './funding-project/applied/apply-funding-modal/apply-funding-modal.component';
import { FpCheckTileComponent } from './funding-project/tiles/fp-check-tile/fp-check-tile.component';
import { FpSubmitTileComponent } from './funding-project/tiles/fp-submit-tile/fp-submit-tile.component';
import { FpAckTileComponent } from './funding-project/tiles/fp-ack-tile/fp-ack-tile.component';
import { ApplyFundingFormComponent } from './funding-project/apply/apply-funding-form/apply-funding-form/apply-funding-form.component';
import { FpRemarkModalComponent } from './funding-project/cards/fp-remark-modal/fp-remark-modal.component';
import { ApplyFpDetailsComponent } from './funding-project/apply/apply-funding-details/apply-fp-details/apply-fp-details.component';
import { FpProjectTileComponent } from './funding-project/tiles/fp-project-tile/fp-project-tile.component';
import { FundingKeywordTileComponent } from './funding-call/tiles/funding-keyword-tile/funding-keyword-tile.component';
import { FundingFormComponent } from './funding-grant/funding-form/funding-form.component';
import { FundingDetailPageComponent } from './funding-grant/funding-detail-page/funding-detail-page.component';

@NgModule({
  declarations: [
    ReceivedFundingFormComponent,
    AllFundingSummaryComponent,
    FundingDetailsPageComponent,
    FundingDescriptionTileComponent,
    FundingAdditionalDetailsTileComponent,
    FundingHeaderSectionTileComponent,
    FundingLinksCardComponent,
    ReceivedFpDetailsPageComponent,
    FpHeaderSectionTileComponent,
    FpSummaryTileComponent,
    FpKeywordsTileComponent,
    FpDatesTileComponent,
    FpAmountTileComponent,
    FpStatusCardComponent,
    FpInvestigatorCardComponent,
    AppliedFpDetailsPageComponent,
    ApplyFundingModalComponent,
    FpCheckTileComponent,
    FpSubmitTileComponent,
    FpAckTileComponent,
    ApplyFundingFormComponent,
    FpRemarkModalComponent,
    ApplyFpDetailsComponent,
    FpProjectTileComponent,
    FundingKeywordTileComponent,
    FundingFormComponent,
    FundingDetailPageComponent,
  ],
  imports: [
    CommonModule,
    FundingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentModule,
  ],
})
export class FundingModule {}

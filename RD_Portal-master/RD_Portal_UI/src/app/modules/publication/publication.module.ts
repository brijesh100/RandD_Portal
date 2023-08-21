import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from '../../shared-components/shared-component.module';

import { PublicationRoutingModule } from './publication-routing.module';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { AllPublicationSummaryComponent } from './all-publication-summary/all-publication-summary.component';
import { PublicationPageComponent } from './publication-page/publication-page/publication-page.component';
import { PublicationTitleTileComponent } from './tiles/publication-title-tile/publication-title-tile/publication-title-tile.component';
import { PublicationCardComponent } from './tiles/cards/publication-card/publication-card.component';
import { PublicationEditComponent } from './publication-page/publication-edit/publication-edit.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GrdFilterPipe } from './grd-filter.pipe';
import { LockCardComponent } from './tiles/cards/lock-card/lock-card.component';
import { PublicationDashboardComponent } from './publication-dashboard/publication-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { PublicationAuthorResolveModalComponent } from './modals/publication-author-resolve-modal/publication-author-resolve-modal.component';
@NgModule({
  declarations: [PublicationFormComponent, AllPublicationSummaryComponent, PublicationPageComponent, PublicationTitleTileComponent, PublicationCardComponent, PublicationEditComponent,GrdFilterPipe, LockCardComponent, PublicationDashboardComponent, PublicationAuthorResolveModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PublicationRoutingModule,
    SharedComponentModule,
    Ng2SearchPipeModule,
    ChartsModule,
    
  ]
})
export class PublicationModule { }

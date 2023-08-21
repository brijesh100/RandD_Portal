import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentModule } from '../../shared-components/shared-component.module';


import { PatentFormComponent } from './patent-form/patent-form.component';
import {PatentRoutingModule} from './patent-routing.module'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AllPatentsComponent } from './all-patents/all-patents.component';
import { PatentPageComponent } from './patent-page/patent-page.component';
import { PatentDetailsTileComponent } from './patent-tiles/patent-details-tile/patent-details-tile.component';
import { GrdFilterPipe } from './grd-filter.pipe';
import { PatentCardComponent } from './patent-tiles/patent-card/patent-card.component';
import { PatentEditComponent } from './patent-edit/patent-edit.component';
import { PatentDashboardComponent } from './patent-dashboard/patent-dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PatentFormComponent, AllPatentsComponent, PatentPageComponent, PatentDetailsTileComponent, PatentCardComponent,GrdFilterPipe, PatentEditComponent, PatentDashboardComponent],
  imports: [
    CommonModule,
    PatentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    SharedComponentModule,
    NgbModule
  ]
})
export class PatentModule { }

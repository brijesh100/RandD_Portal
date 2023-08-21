import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ConsultancyRoutingModule } from './consultancy-routing.module';
import { ConsultancyFormComponent } from './consultancy-form/consultancy-form.component';
import { ConsultancyPageComponent } from './consultancy-page/consultancy-page.component';
import { AllConsultancySummaryComponent } from './all-consultancy-summary/all-consultancy-summary.component';
import { ConsultancyCardComponent } from './consultancy-tiles/consultancy-card/consultancy-card/consultancy-card.component';
import { ConsultancyDetailsTileComponent } from './consultancy-tiles/consultancy-details-tile/consultancy-details-tile.component';
import { SharedComponentModule } from '../../shared-components/shared-component.module';
@NgModule({
  declarations: [ConsultancyFormComponent, ConsultancyPageComponent, AllConsultancySummaryComponent, ConsultancyCardComponent, ConsultancyDetailsTileComponent],
  imports: [
    CommonModule,
    ConsultancyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentModule
  ]
})
export class ConsultancyModule { }

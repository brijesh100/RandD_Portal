import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { SnapshotTilesComponent} from './snapshot-tiles/snapshot-tiles.component';
import { MessageComponent } from './message/message.component';
import { LoaderComponent } from './loader/loader.component';
import { DateTileComponent } from './date-tile/date-tile.component';
import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';
import { UpdateConfirmationModalComponent } from './modals/update-confirmation-modal/update-confirmation-modal.component';
import { MessageModalComponent } from './modals/message-modal/message-modal.component';
import { UserModalComponent } from './modals/user-modal/user-modal.component';
import { SnapshotsComponent } from './snapshots/snapshots.component';
import { TRLModalComponent } from './modals/trl-modal/trl-modal.component';
import { ChangePasswordComponent } from './modals/change-password/change-password.component';


@NgModule({
  declarations: [
    SnapshotTilesComponent,
    MessageComponent,
    LoaderComponent,
    DateTileComponent,
    EmptyLayoutComponent,
    UpdateConfirmationModalComponent,
    MessageModalComponent,
    UserModalComponent,
    SnapshotsComponent,
    TRLModalComponent,
    ChangePasswordComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    SnapshotTilesComponent,
    MessageComponent,
    LoaderComponent,
    DateTileComponent,
    EmptyLayoutComponent,
    UpdateConfirmationModalComponent,
    MessageModalComponent,
    UserModalComponent,
    SnapshotsComponent,
    TRLModalComponent,
    ChangePasswordComponent
  ]
})
export class SharedComponentModule { }

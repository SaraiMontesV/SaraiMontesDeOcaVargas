import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, TranslateModule, AboutRoutingModule, IonicModule],
  declarations: [AboutComponent],
})
export class AboutModule {}

import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { BrowseRoutingModule } from "./browse-routing.module";
import { BrowseComponent } from "./browse.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [NativeScriptCommonModule, BrowseRoutingModule, CommonModule],
  declarations: [BrowseComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BrowseModule {}

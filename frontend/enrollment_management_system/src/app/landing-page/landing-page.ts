import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
        bootstrapJournalBookmarkFill,
        bootstrapJournalBookmark,
        bootstrapBuildingFill,
        bootstrapList,
        bootstrapClipboard2Fill,
        bootstrapRobot,
        bootstrapHousesFill,
        bootstrapPeopleFill,
        bootstrapCalendar2DateFill,
      } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, NgIcon],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  providers: [provideIcons({
    bootstrapJournalBookmarkFill,
    bootstrapJournalBookmark,
    bootstrapBuildingFill,
    bootstrapList,
    bootstrapClipboard2Fill,
    bootstrapRobot,
    bootstrapHousesFill,
    bootstrapPeopleFill,
    bootstrapCalendar2DateFill
  })]
})
export class LandingPage {
  
}

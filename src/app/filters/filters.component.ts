import {Component, OnInit} from '@angular/core';
import {FACILITIES, ITEM_IDs, ITEM_NAMES} from './filters.model';
import {PresetService} from './preset/preset.service';
import {PresetSetting} from './preset/preset.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  facilities: string[] = FACILITIES;
  itemIds: string[] = ITEM_IDs;
  itemNames: string[] = ITEM_NAMES;
  presetSettings: PresetSetting;

  constructor(private presetService: PresetService) {
  }

  ngOnInit(): void {
    this.presetService.presetSetting$().subscribe(value => this.presetSettings = value);
  }

  updateFacilities(facilities: string[]) {
    this.presetSettings.facilities = facilities;
    this.presetService.updateSetting(this.presetSettings);
    // console.log(this.presetSettings);
  }

  updateItemIds(itemIds: string[]) {
    this.presetSettings.itemIds = itemIds;
    this.presetService.updateSetting(this.presetSettings);
  }

  updateItemNames(itemNames: string[]) {
    this.presetSettings.itemNames = itemNames;
    this.presetService.updateSetting(this.presetSettings);
  }
}

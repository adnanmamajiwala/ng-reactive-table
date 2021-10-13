import {Component, OnInit} from '@angular/core';
import {FACILITIES, ITEM_IDs, ITEM_NAMES} from './filters.model';
import {PresetService} from './preset/preset.service';
import {PresetSettings} from './preset/preset.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  facilities: string[] = FACILITIES;
  itemIds: string[] = ITEM_IDs;
  itemNames: string[] = ITEM_NAMES;
  presetSettings: PresetSettings;

  constructor(private presetService: PresetService) {
  }

  ngOnInit(): void {
    this.presetService.presetSettings$().subscribe(value => this.presetSettings = value);
  }

  updateFacilities(facilities: string[]) {
    this.presetSettings.facilities = facilities;
    this.presetService.updateSettings(this.presetSettings);
  }

  updateItemIds(itemIds: string[]) {
    this.presetSettings.itemIds = itemIds;
    this.presetService.updateSettings(this.presetSettings);
  }

  updateItemNames(itemNames: string[]) {
    this.presetSettings.itemNames = itemNames;
    this.presetService.updateSettings(this.presetSettings);
  }
}

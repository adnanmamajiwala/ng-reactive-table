import {Component, Input, OnInit} from '@angular/core';
import {PresetService} from './preset.service';
import {Preset, PresetSettings} from './preset.model';

@Component({
  selector: 'app-preset',
  templateUrl: './preset.component.html',
  styleUrls: ['./preset.component.scss']
})
export class PresetComponent implements OnInit {

  selected: PresetSettings;
  savedPresets: PresetSettings[] = [];
  preset: Preset = new Preset();
  name: string = '';

  constructor(private presetService: PresetService) {
  }

  ngOnInit(): void {
    this.presetService.getPreset(10001)
      .subscribe(value => {
        if (!!value) {
          this.preset = value;
          this.savedPresets = value.settings;
        }
      });
  }

  onClick(value: PresetSettings) {
    this.selected = value;
    this.presetService.updateSettings(value);
  }

  clear() {
    this.selected = null as any;
    this.presetService.updateSettings(null as any);
  }

  save() {
    this.preset = !!this.preset ? this.preset : new Preset();
    this.preset.practiceId = 10001;
    this.preset.typeName = 'iv';
    this.preset.settings = this.savedPresets;
    this.savedPresets.push(this.selected);
    this.presetService.savePreset(this.preset)
      .subscribe(value => {
        this.preset = value;
        this.savedPresets = value.settings;
      });
  }
}

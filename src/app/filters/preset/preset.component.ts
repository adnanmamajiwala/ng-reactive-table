import {Component, OnInit} from '@angular/core';
import {PresetService} from './preset.service';
import {Preset, PresetSetting} from './preset.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-preset',
  templateUrl: './preset.component.html',
  styleUrls: ['./preset.component.scss']
})
export class PresetComponent implements OnInit {

  selected: PresetSetting;
  preset: Preset;
  name: string = '';

  constructor(private presetService: PresetService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.preset = new Preset();
    this.preset.practiceId = 10001;
    this.preset.typeName = 'iv';
    this.preset.settings = [];

    this.presetService.getPreset(10001)
      .subscribe(value => {
        if (!!value) {
          this.preset = value;
        }
      });
  }

  onClick(value: PresetSetting) {
    this.name = '';
    this.selected = JSON.parse(JSON.stringify(value));
    this.presetService.updateSetting(this.selected);
    console.log(value);
  }

  clear() {
    this.selected = new PresetSetting();
    this.presetService.updateSetting(this.selected);
  }

  save() {
    if (!!this.name) {
      const presetSettings = this.preset.settings;
      const index = presetSettings.findIndex(value => value.name === this.name);
      if (index != -1) {
        presetSettings.splice(index, 1);
      }

      this.selected.name = this.name;
      presetSettings.push(this.selected);
      this.presetService.savePreset(this.preset).subscribe(value => {
        this.preset = value;
        this.name = '';
      });
    } else {
      this.snackBar.open('Please provide name to save the preset', 'x', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 3000
      });
    }
  }
}

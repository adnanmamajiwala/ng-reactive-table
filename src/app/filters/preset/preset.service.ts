import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Preset, PresetSettings} from './preset.model';

@Injectable({
  providedIn: 'root'
})
export class PresetService {

  private presetSettingsSubject = new BehaviorSubject<PresetSettings>(null as any);
  private endpoint = 'http://localhost:8080/presets';

  constructor(private httpClient: HttpClient) {
  }

  getPreset(practiceId: number): Observable<Preset> {
    let url = `${this.endpoint}/${practiceId}/iv`;
    return this.httpClient.get<Preset>(url);
  }

  savePreset(preset: Preset): Observable<Preset> {
    let url = `${this.endpoint}/${preset.practiceId}/iv`;
    return this.httpClient.post<Preset>(url, preset);
  }

  presetSettings$() : Observable<PresetSettings> {
    return this.presetSettingsSubject.asObservable();
  }

  updateSettings(settings: PresetSettings) {
    this.presetSettingsSubject.next(settings);
  }

}

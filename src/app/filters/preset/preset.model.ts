export class Preset {
  id: number;
  practiceId: number;
  typeName: string;
  settings: PresetSettings[];
}

export class PresetSettings {
  name: string;

  facilities: string[];
  itemIds: string[];
  itemNames: string[];
}

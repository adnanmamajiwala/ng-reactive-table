export class Preset {
  id: number;
  practiceId: number;
  typeName: string;
  settings: PresetSetting[];
}

export class PresetSetting {
  name: string;

  facilities: string[];
  itemIds: string[];
  itemNames: string[];
}

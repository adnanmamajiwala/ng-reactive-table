export class Page<T> {
  content: T[];
  size: number;
  totalElements: number;
  totalPages: number;
}

export type SortDirection = 'ASC' | 'DESC';

export class ColumnInfo {
  displayText: string;
  name: string;
  selected = true;
}

export class Group {
  reduced: boolean;
  isGroup: boolean;
  groupName: string;
}

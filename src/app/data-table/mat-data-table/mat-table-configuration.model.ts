export class MatTableConfiguration<T> {
  data: T[] = [];
  columnInfoList: ColumnInfo[] = [];
}

export class ColumnInfo {
  displayText: string;
  name: string;
}

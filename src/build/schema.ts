export interface Schema {

  targetLabel: string;
  bazelCommand: 'build'|'run'|'test';
  watch?: boolean;
}

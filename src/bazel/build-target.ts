import {spawn} from 'child_process';
import {Observable, Subject} from 'rxjs';

export function runBazel(projectDir: string, command: string, watch: boolean, workspaceTarget: string, flags: string[])
    : Observable<void> {

  const doneSubject = new Subject<void>();
  const buildProcess = spawn(watch ? 'ibazel' : 'bazel', [command, workspaceTarget, ...flags], {
    cwd: projectDir,
    stdio: 'inherit',
    shell: false,
  });

  buildProcess.once('close', (code: number) => {
    code === 0 ? doneSubject.next() : doneSubject.error('Bazel failed.');
  });

  return doneSubject.asObservable();
}


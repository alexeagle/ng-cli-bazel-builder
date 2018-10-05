"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var rxjs_1 = require("rxjs");
function runBazel(projectDir, command, watch, workspaceTarget, flags) {
    var doneSubject = new rxjs_1.Subject();
    var buildProcess = child_process_1.spawn(watch ? 'ibazel' : 'bazel', [command, workspaceTarget].concat(flags), {
        cwd: projectDir,
        stdio: 'inherit',
        shell: false,
    });
    buildProcess.once('close', function (code) {
        code === 0 ? doneSubject.next() : doneSubject.error('Bazel failed.');
    });
    return doneSubject.asObservable();
}
exports.runBazel = runBazel;
//# sourceMappingURL=build-target.js.map
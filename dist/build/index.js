"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular-devkit/core");
var chalk_1 = require("chalk");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var build_target_1 = require("../bazel/build-target");
var check_installation_1 = require("../bazel/check-installation");
var BundleBuilder = /** @class */ (function () {
    function BundleBuilder(context) {
        this.context = context;
    }
    BundleBuilder.prototype.run = function (builderConfig) {
        var projectRoot = core_1.getSystemPath(core_1.resolve(this.context.workspace.root, builderConfig.root));
        var targetLabel = builderConfig.options.targetLabel;
        if (!check_installation_1.checkBazelInstallation(projectRoot)) {
            throw new Error('Could not run Bazel. Please make sure that the "bazel" command is' +
                'available in the $PATH.');
        }
        console.info(chalk_1.default.yellow(targetLabel));
        // TODO: Support passing flags.
        return build_target_1.runBazel(projectRoot, builderConfig.options.bazelCommand, builderConfig.options.watch, targetLabel, [])
            .pipe(operators_1.map(function () { return ({ success: true }); }), operators_1.catchError(function () { return rxjs_1.of({ success: false }); }), operators_1.tap(function () { return console.info(chalk_1.default.green('Successfully built:'), chalk_1.default.yellow(targetLabel)); }));
    };
    return BundleBuilder;
}());
exports.BundleBuilder = BundleBuilder;
exports.default = BundleBuilder;
//# sourceMappingURL=index.js.map
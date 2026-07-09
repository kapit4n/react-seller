"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerApplication = void 0;
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const path_1 = __importDefault(require("path"));
class SellerApplication extends (0, boot_1.BootMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication)) {
    constructor(options = {}) {
        super(options);
        this.static('/images', path_1.default.join(__dirname, '../public/images'));
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        this.bootOptions = {
            controllers: {
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
            models: {
                dirs: ['models'],
                extensions: ['.model.js'],
                nested: true,
            },
            repositories: {
                dirs: ['repositories'],
                extensions: ['.repository.js'],
                nested: true,
            },
            datasources: {
                dirs: ['datasources'],
                extensions: ['.datasource.js'],
                nested: true,
            },
        };
    }
    async boot() {
        await super.boot();
    }
}
exports.SellerApplication = SellerApplication;
//# sourceMappingURL=application.js.map
let ApplicationConfiguration = {
  applicationModuleName: 'core',
  applicationModuleVendorDependencies: ['ionic', 'firebase', 'ui.router'],

  registerModule(moduleName) {
    angular.module(moduleName, this.applicationModuleVendorDependencies);
    angular.module(this.applicationModuleName).requires.push(moduleName);

    return angular.module(moduleName);
  }
};

export default ApplicationConfiguration;
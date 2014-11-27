import angular from 'angular';

let ApplicationConfiguration = {
  applicationModuleName: 'fatburnhub',
  applicationModuleVendorDependencies: ['ionic', 'firebase'],

  registerModule(moduleName, dependencies) {
    angular.module(moduleName, dependencies || applicationModuleVendorDependencies);
    angular.module(applicationModuleName).requires.push(moduleName);
  }
};

export default ApplicationConfiguration;
# Introduction

TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project.

# Getting Started

TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:

1. Installation process
2. Software dependencies
3. Latest releases
4. API references

# Build and Test

TODO: Describe and show how to build your code and run the tests.

# Contribute

TODO: Explain how other users and developers can contribute to make your code better.

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:

- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)

# LOCAL CI BUILDS

## Fastlane Installation

Option 1. brew install fastlane
Option 2. sudo gem install fastlane

1. cd ios && fastlane init
   follow the prompts

## IOS files needed to run a local CI

1. install AuthKey_XRN43LMC76.p8 file in the IOS folder
2. request the .env values for each environment.

## ANDROID files needed to run local CI

1. install upload-prod.jks needed to sign the bundle for PRODUCTION BUILD to upload to the playstore
2. install google-prod-creds.json to allow the CI to upload the bundle directly to the Playstore.
3. request the .env values for each environment.

### IOS build cmd's

#### Create a qa build

- npm run ios:deploy:qa - will send a build to firebase IOS-internal testers and saucelabs
- npm run ios:deploy:qa - will send a build to a specific tester listed in the testers prop in the fastfile.
- npm run ios:deploy:prod - send production build to testflight ONLY... make sure the build number is the next incremental number listed in testflight

### ANDROID build cmd's

#### Create a qa build

- npm run android:deploy:qa - will send a build to firebase IOS-internal testers and saucelabs
- npm run android:deploy:prod - send production build to testflight ONLY... make sure the build number is the next incremental number listed in testflight

### CODE-PUSH CLI Documentation

https://github.com/microsoft/code-push/tree/v3.0.1/cli#codepush-management-cli

### REACT-NATIVE Code Push Documentation

https://github.com/microsoft/react-native-code-push

### LOGIN TO APPCENTER

- appcenter login ... make sure you are logged into the appcenter dashboard on your browser

**_Before doing any pushes... run NPM RUN BUNDLE-IOS or ANDROID_**

- appcenter apps list "View list of apps"
- appcenter codepush deployment list -a upwards/upwards-ios

### Release to IOS

- appcenter codepush release-react -a upwards/upwards-ios --plist-file-prefix upwards-QA -t '1.7.X' -d Qa -x

### Release to ANDROID

- appcenter codepush release-react -a upwards/upwards-android -t '1.7.1' -d Production

#### options:

- -d Qa or Production
- -m
- -t "<=1.6" or "1.6" or "1.0 - 1.2"
- -x disable ... use this if you want to use the dashboard to push the update then use the dashboard to release it.

### Rollback a Release

- appcenter codepush rollback OWNER-NAME/APP-NAME DEPLOYMENT-NAME --target-release v1

### CLEARNING RELEASE HISTORY

- appcenter codepush deployment clear -a upwards/upwards-ios Qa

- backup command: code-push deployment clear upwards/upwards-ios Qa

## Branching strategy

https://www.figma.com/file/3QRIsIB0zw9KOXxgysRJjr/Untitled?type=whiteboard&node-id=0-1&t=TLdSNtGLKhXoqNjG-0

.netrc is required for mapbox

grep -A 4 api.mapbox.com ~/.netrc

if problems with xcode build due to mapbox... do a pod install --repo-update

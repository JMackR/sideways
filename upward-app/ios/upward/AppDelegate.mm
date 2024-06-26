#import "AppDelegate.h"



#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

#import "React/RCTLinkingManager.h"
#import <RNBackgroundDownloader.h>
#import "Orientation.h"
#import <Firebase.h>
#import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"upward";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  [FIRApp configure];
  [GMSServices provideAPIKey:@"AIzaSyBElARuIFWfGyTFCoE3NGmel1LMZMf-Hf0"];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  return [RCTLinkingManager application:app openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}

- (void)application:(UIApplication *)application handleEventsForBackgroundURLSession:(NSString *)identifier completionHandler:(void (^)())completionHandler
{
  [RNBackgroundDownloader setCompletionHandlerWithIdentifier:identifier completionHandler:completionHandler];
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

//- (UISceneConfiguration *)application:(UIApplication *)application configurationForConnectingSceneSession:(UISceneSession *)connectingSceneSession options:(UISceneConnectionOptions *)options {
//  if([[connectingSceneSession role] isEqualToString:@"CPTemplateApplicationSceneSessionRoleApplication"]) {
//    UISceneConfiguration *scene = [[UISceneConfiguration alloc] initWithName:@"CarPlay" sessionRole:connectingSceneSession.role];
//    [scene setDelegateClass:CarSceneDelegate.class]; //TODO
//    return scene;
//  } else {
//    UISceneConfiguration *scene = [[UISceneConfiguration alloc] initWithName:@"Phone" sessionRole:connectingSceneSession.role];
//    [scene setDelegateClass:PhoneSceneDelegate.class]; //TODO
//    return scene;
//  }
//}

//- (void)application:(UIApplication *)application didDiscardSceneSessions:(NSSet<UISceneSession *> *)sceneSessions {
//  
//}


@end

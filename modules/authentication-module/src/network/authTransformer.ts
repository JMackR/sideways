export function parseUserLookup(response: string) {
  return response;
}
export function parseClientSettings(response: ClientProps) {
  const color =
    response.mobileAppSetting.mobilePrimaryColor.length > 5 ? response.mobileAppSetting.mobilePrimaryColor : '#cf4a18';
  const parseResponse = {
    mobileAppSetting: {
      fullSiteViewOverrideLabel: response.mobileAppSetting.fullSiteViewOverrideLabel,
      mobilePrimaryColor: color,
      mobileLogo: response.mobileAppSetting.mobileLogo,
      vendorSSOConfigurationItems: response.mobileAppSetting.vendorSSOConfigurationItems,
      elevateDataItem: response.mobileAppSetting.elevateDataItem,
      vendorSSOConfigSectionTitle: response.mobileAppSetting.vendorSSOConfigSectionTitle,
      disableShareIDCardYN: response?.mobileAppSetting?.disableShareIDCardYN,
    },
    user: { ...response.user },
    client: { ...response.client },
  };
  return parseResponse;
}
export function parsePassword(response: string) {
  return response;
}
export function parseDeviceExists(response: string) {
  return response;
}
export function parseErrorResponse(response: any) {
  const {
    data: { Message },
  } = response;
  return Message;
}

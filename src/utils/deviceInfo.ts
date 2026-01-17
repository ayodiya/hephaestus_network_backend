import { UAParser } from "ua-parser-js";

export function getDeviceInfo(userAgent: string) {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return {
    deviceName:
      `${result.device.vendor ?? "Unknown"} ${result.device.model ?? "Device"}`.trim(),
    os: `${result.os.name ?? "Unknown"} ${result.os.version ?? ""}`.trim(),
    browser:
      `${result.browser.name ?? "Unknown"} ${result.browser.version ?? ""}`.trim(),
  };
}

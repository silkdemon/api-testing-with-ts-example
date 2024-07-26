import { t } from "testcafe";

import { IConfigProvider } from "./config-provider";

interface SessionContextDto {
  accessToken: string;
  header: string;
}

export class AuthProvider {
  private readonly _configProvider: IConfigProvider;
  protected _authToken: string = "";
  protected _authHeader: string = "";

  initAccessToken = async (): Promise<void> => {
    if (this._authToken) {
      return;
    }

    const getSessionTokenResult = await t.request({
      url: this._configProvider.authorizationHost,
      method: "POST",
      body: this._configProvider.userContext,
    });

    const sessionToken = getSessionTokenResult.body;
    const getSessionContext = await t.request({
      url: this._configProvider.authorizationHost + "/" + sessionToken,
      method: "GET",
    });

    const jsonData = await getSessionContext.body;

    const mappedData = jsonData as SessionContextDto;
    const accessToken = mappedData.accessToken;

    this._authToken = accessToken;
    this._authHeader = "Bearer " + accessToken;
  };

  constructor(configProvider: IConfigProvider) {
    this._configProvider = configProvider;
  }

  public getHeaders = (): Record<string, string> => {
    if (!this._authHeader) {
      return {};
    }

    return {
      Authorization: this._authHeader,
    };
  };
}

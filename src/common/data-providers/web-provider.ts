import { t } from "testcafe";

import { AuthProvider } from "./auth-provider";
import { IDataProvider } from "./data-provider";
import { getErrorMessageFromMap } from "../common";

interface ErrorResponseBody {
  message: string;
  statusCode: number;
}

export class RequestError {
  public message: string;
  public statusCode: number;
  public responseBody: ErrorResponseBody;

  constructor(
    statusCode: number,
    message: string | (string | object)[],
    responseBody: ErrorResponseBody
  ) {
    if (Array.isArray(message)) {
      this.message = message.join("\n");
    } else {
      this.message = message;
    }

    this.statusCode = statusCode;
    this.responseBody = responseBody;
  }
}

export class WebProvider implements IDataProvider {
  protected readonly _url: string;
  protected _useAuth: boolean = false;
  private readonly _authProvider: AuthProvider;

  constructor(
    authProvider: AuthProvider,
    hostApiUrl: string,
    useAuth: boolean
  ) {
    this._authProvider = authProvider;
    this._url = hostApiUrl;
    this._useAuth = useAuth;
  }

  private checkResponseOrThrow = async (
    response: ResponseAPI | ResponseOptions,
    path: string,
    validStatuses: number[] = [200, 201, 202]
  ) => {
    if (!response) {
      throw new Error("Fetch error");
    }

    const status = await response.status;

    if (validStatuses.includes(status)) {
      return;
    }

    const errorMessageMap = new Map<string, string>([
      ["provider's method", "getArrayData"],
      ["path", path],
      ["status", `${status} ${response.statusText}`],
      ["response body", response.body.toString()],
    ]);

    const requestException = new RequestError(
      status,
      getErrorMessageFromMap(errorMessageMap),
      response.body as ErrorResponseBody
    );

    throw requestException;
  };

  deleteData = async <T>(path: string): Promise<T> => {
    await this._authProvider.initAccessToken();

    const requestUrl = `${this._url}/${path}`;

    const response = await t.request({
      url: requestUrl,
      method: "DELETE",
      headers: this._authProvider.getHeaders(),
    });

    await this.checkResponseOrThrow(response, path);

    const result = response as unknown as T;

    return result;
  };

  getData = async <T>(path: string): Promise<T> => {
    await this._authProvider.initAccessToken();

    const requestUrl = `${this._url}/${path}`;

    const response = await t.request({
      url: requestUrl,
      method: "GET",
      headers: this._authProvider.getHeaders(),
    });

    await this.checkResponseOrThrow(response, path, [200]);

    const result = (await response.body) as unknown as T;

    return result;
  };

  postJson = async <T, R>(path: string, value: T): Promise<R> => {
    await this._authProvider.initAccessToken();

    const requestUrl = `${this._url}/${path}`;
    const response = await t.request({
      url: requestUrl,
      method: "POST",
      body: value,
      headers: this._authProvider.getHeaders(),
    });

    await this.checkResponseOrThrow(response, path);

    const result = (await response.body) as unknown as R;

    return result;
  };
}

interface UserContext {
  userName: string;
  password: string;
}

export interface IConfigProvider {
  authorizationHost: string;
  yourAPIHost: string;
  userContext: UserContext;
}

export default class ConfigProvider implements IConfigProvider {
  private readonly _authorizationHost: string;
  private readonly _yourAPIHost: string;
  private readonly _userContext: UserContext;

  constructor() {
    const testEnv = process.env.TESTCAFE_ENVIRONMENT;

    if (testEnv === "DEV") {
      this._authorizationHost = "authorizationURL";
      this._yourAPIHost = "apiURL";
      this._userContext = {
        userName: "login",
        password: "password",
      };

      return;
    }

    if (testEnv === "TEST") {
      this._authorizationHost = "authorizationURL";
      this._yourAPIHost = "apiURL";
      this._userContext = {
        userName: "login",
        password: "password",
      };

      return;
    }

    throw new Error(
      `UNEXPECTED process.env.TESTCAFE_ENVIRONMENT value: ${testEnv}`
    );
  }

  public get authorizationHost(): string {
    return this._authorizationHost;
  }

  public get yourAPIHost(): string {
    return this._yourAPIHost;
  }

  public get userContext(): UserContext {
    return this._userContext;
  }
}

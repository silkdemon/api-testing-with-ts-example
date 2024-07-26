import { AuthProvider } from "../../../common/data-providers/auth-provider";
import ConfigProvider, {
  IConfigProvider,
} from "../../../common/data-providers/config-provider";
import { IDataProvider } from "../../../common/data-providers/data-provider";
import { WebProvider } from "../../../common/data-providers/web-provider";
import { YourAPIHostProvider } from "../data/your-api-host-provider";

const configProvider: IConfigProvider = new ConfigProvider();
const authProvider: AuthProvider = new AuthProvider(configProvider);
const dataProvider: IDataProvider = new WebProvider(
  authProvider,
  configProvider.yourAPIHost,
  true
);

export const yourAPIHostProvider = new YourAPIHostProvider(dataProvider);

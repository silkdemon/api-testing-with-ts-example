import { IDataProvider } from "../../../common/data-providers/data-provider";
import {
  ApiCreateRequestDto,
  ApiCreateResponseDto,
  ApiDeleteResponseDto,
  ApiGetResponseDto,
  ApiListResponseDto,
} from "../types/your-api-dto";

export class YourAPIHostProvider {
  private _coreProvider: IDataProvider;

  constructor(coreProvider: IDataProvider) {
    this._coreProvider = coreProvider;
  }

  public createApi = async (
    userId: string,
    value: ApiCreateRequestDto
  ): Promise<ApiCreateResponseDto> => {
    return this._coreProvider.postJson(`/v1/api/${userId}/create`, value);
  };

  public deleteApi = async (
    userId: string,
    id: string
  ): Promise<ApiDeleteResponseDto> => {
    return this._coreProvider.deleteData(`/v1/api/${userId}/create/${id}`);
  };

  public getApiList = async (userId: string): Promise<ApiListResponseDto> => {
    return this._coreProvider.getData(`/v1/api/${userId}/create`);
  };

  public getApiById = async (
    userId: string,
    id: string
  ): Promise<ApiGetResponseDto> => {
    return this._coreProvider.getData(`/v1/api/${userId}/create/${id}`);
  };
}

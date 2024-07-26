import { getApiDefaultModel } from "../types/default-models";
import { ApiCreateRequestDto } from "../types/your-api-dto";

export class YourAPIHostFactory {
  public buildApiCreateRequestItem = (name: string): ApiCreateRequestDto => {
    const resultItem = getApiDefaultModel();

    resultItem.name = name;

    return resultItem;
  };
}

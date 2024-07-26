import { v4 as uuidv4 } from "uuid";
import { ApiCreateRequestDto } from "./your-api-dto";

export const getApiDefaultModel = (): ApiCreateRequestDto => {
  return {
    name: "api-test",
    id: uuidv4(),
  };
};

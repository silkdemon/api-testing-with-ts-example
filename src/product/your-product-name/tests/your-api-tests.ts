import { basePage } from "../../../common/common";
import { yourAPIHostProvider } from "../configure/init";
import { YourAPIHostFactory } from "../factories/your-api-host-factory";

const yourApiHostFactory = new YourAPIHostFactory();

fixture`API methods`
  .page(basePage)
  .beforeEach(async () => {
    // create user
  })
  .afterEach(async () => {
    // delete user
  });

test("Create API", async (t) => {
  // Должен быть получен в beforeEach
  const userId = "";

  const requestAPIModel = yourApiHostFactory.buildApiCreateRequestItem("kek");
  const getCreateApiResponse = await yourAPIHostProvider.createApi(
    userId,
    requestAPIModel
  );
  const apiId = getCreateApiResponse.id;

  await t.expect(apiId).eql(requestAPIModel.id);
});

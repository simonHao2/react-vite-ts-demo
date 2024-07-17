import { APIS } from "../../env/api-list";
import { parseParams } from "../../utils/parseParams";
import { get } from "../HttpRequest";

export const getUserList = (params) => get(APIS.getUserList(parseParams(params)))
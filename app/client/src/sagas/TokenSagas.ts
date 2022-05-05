import { ReduxActionTypes } from "@appsmith/constants/ReduxActionConstants";
import {
  updateAppPersistentStore,
  updateAppTransientStore,
} from "actions/pageActions";
import { getAppStoreName } from "constants/AppConstants";
// import { ReduxActionTypes } from "constants/ReduxActionConstants";
import { all, delay, put, select, take, takeEvery } from "redux-saga/effects";
import { getCurrentApplicationId } from "selectors/editorSelectors";
import { getAppStoreData } from "selectors/entitiesSelector";
import { getCurrentGitBranch } from "selectors/gitSyncSelectors";
import AppsmithConsole from "utils/AppsmithConsole";
import localStorage from "utils/localStorage";

function* saveToken(action: any) {
  console.log("chivte changed token", window.localStorage.getItem("mytime"));
  const applicationId = yield select(getCurrentApplicationId);
  const branch = yield select(getCurrentGitBranch);
  if (action.payload) {
    let appStoreName;
    if (applicationId) {
      appStoreName = getAppStoreName(applicationId, branch);
    } else {
      appStoreName = getAppStoreName(action.payload, branch);
    }
    const existingStore = localStorage.getItem(appStoreName) || "{}";
    const parsedStore = JSON.parse(existingStore);
    Object.entries(window.localStorage).forEach((a, b) => {
      if (a[0].includes("loglevel")) {
        parsedStore["accesstoken"] = window.localStorage.getItem("mytime");
      }
    });
    // parsedStore["token"] = window.localStorage.getItem("loglevel");
    const storeString = JSON.stringify(parsedStore);
    localStorage.setItem(appStoreName, storeString);
    yield put(updateAppPersistentStore(parsedStore));
    AppsmithConsole.info({
      text: `store('token', '${window.localStorage.getItem(
        "loglevel",
      )}', false)`,
    });
  } else {
    const existingStore1 = yield select(getAppStoreData);
    let key = "";
    let value: any = "";
    Object.entries(window.localStorage).forEach((a, b) => {
      if (a[0].includes("loglevel")) {
        key = "accesstoken";
        value = window.localStorage.getItem("mytime");
      }
    });
    const newTransientStore = {
      ...existingStore1.transient,
      [key]: value,
    };

    yield put(updateAppTransientStore(newTransientStore));
    AppsmithConsole.info({
      text: `store('token', '${window.localStorage.getItem(
        "loglevel",
      )}', false)`,
    });
  }
  // yield delay(60000);
  // const appId = applicationId
  //   ? applicationId
  //   : action.payload
  //   ? action.payload
  //   : "";
  // console.log("chivte krishna after 60 seconds", appId);
  // yield put({ type: ReduxActionTypes.SAVE_TOKEN, payload: appId });
  yield take(ReduxActionTypes.UPDATE_APP_STORE_EVALUATED);
}

export default function* savetokensagas() {
  yield all([takeEvery(ReduxActionTypes.SAVE_TOKEN, saveToken)]);
}

export const executeSaveTrigger = (payload: string) => {
  return {
    type: ReduxActionTypes.SAVE_TOKEN,
    payload,
  };
};

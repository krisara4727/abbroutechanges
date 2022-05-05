// Leaving this require here. The path-to-regexp module has a commonJS version and an ESM one.
// We are loading the correct one with the typings with our compilerOptions property "moduleResolution" set to "node". Ref: https://stackoverflow.com/questions/59013618/unable-to-find-module-path-to-regexp
// All solutions from closed issues on their repo have been tried. Ref: https://github.com/pillarjs/path-to-regexp/issues/193
const { match } = require("path-to-regexp");

export const PLACEHOLDER_APP_SLUG = "application";
export const PLACEHOLDER_PAGE_ID = "pageId";
export const PLACEHOLDER_PAGE_SLUG = "page";
export const BASE_URL = "/formbuilderui";
export const ORG_URL = BASE_URL + "/org";
export const PAGE_NOT_FOUND_URL = BASE_URL + "/404";
export const SERVER_ERROR_URL = BASE_URL + "/500";
export const APPLICATIONS_URL = BASE_URL + `/applications`;

export const TEMPLATES_PATH = BASE_URL + "/templates";
export const TEMPLATES_ID_PATH = BASE_URL + "/templates/:templateId";

export const USER_AUTH_URL = BASE_URL + "/user";
export const PROFILE = BASE_URL + "/profile";
export const GIT_PROFILE_ROUTE = `${PROFILE}/git`;
export const USERS_URL = BASE_URL + "/users";
export const UNSUBSCRIBE_EMAIL_URL =
  BASE_URL + "/unsubscribe/discussion/:threadId";
export const SETUP = BASE_URL + "/setup/welcome";
export const FORGOT_PASSWORD_URL = `${USER_AUTH_URL}/forgotPassword`;
export const RESET_PASSWORD_URL = `${USER_AUTH_URL}/resetPassword`;
export const BASE_SIGNUP_URL = BASE_URL + `/signup`;
export const SIGN_UP_URL = `${USER_AUTH_URL}/signup`;
export const BASE_LOGIN_URL = BASE_URL + `/login`;
export const AUTH_LOGIN_URL = `${USER_AUTH_URL}/login`;
export const SIGNUP_SUCCESS_URL = BASE_URL + `/signup-success`;
export const ORG_INVITE_USERS_PAGE_URL = `${ORG_URL}/invite`;
export const ORG_SETTINGS_PAGE_URL = `${ORG_URL}/settings`;
export const BUILDER_PATH_DEPRECATED =
  BASE_URL + `/applications/:applicationId/(pages)?/:pageId?/edit`;
export const BUILDER_PATH =
  BASE_URL + `/app/:applicationSlug/:pageSlug(.*\-):pageId/edit`;
export const VIEWER_PATH =
  BASE_URL + `/app/:applicationSlug/:pageSlug(.*\-):pageId`;
export const VIEWER_PATH_DEPRECATED =
  BASE_URL + `/applications/:applicationId/(pages)?/:pageId?`;
export const VIEWER_FORK_PATH = BASE_URL + `/fork`;
export const INTEGRATION_EDITOR_PATH = `/datasources/:selectedTab`;
export const API_EDITOR_BASE_PATH = `/api`;
export const API_EDITOR_ID_PATH = `${API_EDITOR_BASE_PATH}/:apiId`;
export const API_EDITOR_PATH_WITH_SELECTED_PAGE_ID = `${API_EDITOR_BASE_PATH}?importTo=:importTo`;
export const QUERIES_EDITOR_BASE_PATH = `/queries`;
export const QUERIES_EDITOR_ID_PATH = `${QUERIES_EDITOR_BASE_PATH}/:queryId`;
export const JS_COLLECTION_EDITOR_PATH = `/jsObjects`;
export const JS_COLLECTION_ID_PATH = `${JS_COLLECTION_EDITOR_PATH}/:collectionId`;
export const CURL_IMPORT_PAGE_PATH = `/api/curl/curl-import`;
export const PAGE_LIST_EDITOR_PATH = `/pages`;
export const DATA_SOURCES_EDITOR_ID_PATH = `/datasource/:datasourceId`;
export const PROVIDER_TEMPLATE_PATH = `/provider/:providerId`;
export const GEN_TEMPLATE_URL = "generate-page";
export const GENERATE_TEMPLATE_PATH = `/${GEN_TEMPLATE_URL}`;
export const GEN_TEMPLATE_FORM_ROUTE = "/form";
export const GENERATE_TEMPLATE_FORM_PATH = `${GENERATE_TEMPLATE_PATH}${GEN_TEMPLATE_FORM_ROUTE}`;
export const BUILDER_CHECKLIST_PATH = `/checklist`;
export const ADMIN_SETTINGS_PATH = BASE_URL + "/settings";
export const ADMIN_SETTINGS_CATEGORY_DEFAULT_PATH =
  BASE_URL + "/settings/general";
export const ADMIN_SETTINGS_CATEGORY_PATH =
  BASE_URL + "/settings/:category/:subCategory?";
export const BUILDER_PATCH_PATH =
  BASE_URL + `/:applicationSlug/:pageSlug(.*\-):pageId/edit`;
export const VIEWER_PATCH_PATH =
  BASE_URL + `/:applicationSlug/:pageSlug(.*\-):pageId`;

export const matchApplicationPath = match(APPLICATIONS_URL);
export const matchApiBasePath = match(API_EDITOR_BASE_PATH);
export const matchApiPath = match(API_EDITOR_ID_PATH);
export const matchDatasourcePath = match(DATA_SOURCES_EDITOR_ID_PATH);
export const matchQueryBasePath = match(QUERIES_EDITOR_BASE_PATH);
export const matchQueryPath = match(QUERIES_EDITOR_ID_PATH);
export const matchBuilderPath = (pathName: string) =>
  match(BUILDER_PATH)(pathName) || match(BUILDER_PATH_DEPRECATED)(pathName);
export const matchJSObjectPath = match(JS_COLLECTION_ID_PATH);
export const matchViewerPath = (pathName: string) =>
  match(VIEWER_PATH)(pathName) || match(VIEWER_PATH_DEPRECATED)(pathName);
export const matchViewerForkPath = (pathName: string) =>
  match(`${VIEWER_PATH}${VIEWER_FORK_PATH}`)(pathName) ||
  match(`${VIEWER_PATH_DEPRECATED}${VIEWER_FORK_PATH}`)(pathName);
export const matchTemplatesPath = match(TEMPLATES_PATH);
export const matchTemplatesIdPath = match(TEMPLATES_ID_PATH);

export const addBranchParam = (branch: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(GIT_BRANCH_QUERY_KEY, encodeURIComponent(branch));
  return url.toString().slice(url.origin.length);
};

export type BuilderRouteParams = {
  pageId: string;
  applicationId: string;
};

export type AppViewerRouteParams = {
  pageId: string;
  applicationId?: string;
};

export type APIEditorRouteParams = {
  pageId: string;
  apiId?: string;
};

export type ProviderViewerRouteParams = {
  pageId: string;
  providerId: string;
};

export type QueryEditorRouteParams = {
  pageId: string;
  queryId?: string;
  apiId?: string;
};

export type JSEditorRouteParams = {
  pageId: string;
  collectionId?: string;
};

export const GIT_BRANCH_QUERY_KEY = "branch";

export const INTEGRATION_TABS = {
  ACTIVE: "ACTIVE",
  NEW: "NEW",
};

export const INTEGRATION_EDITOR_MODES = {
  AUTO: "auto",
  MOCK: "mock",
};

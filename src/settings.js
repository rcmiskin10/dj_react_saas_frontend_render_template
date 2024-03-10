let API_SERVER_VAL = "";
switch (process.env.NODE_ENV) {
  case "development":
    API_SERVER_VAL = "http://127.0.0.1:8000";
    break;
  case "production":
    API_SERVER_VAL = process.env.REACT_APP_BACKEND_API_URL;
    break;
  default:
    API_SERVER_VAL = "http://127.0.0.1:8000";
    break;
}

export const API_SERVER = API_SERVER_VAL;
export const ENV = process.env.NODE_ENV;

export const SESSION_DURATION = 1000 * 60 * 4; // 4 minutes
export const SITE_NAME = "Boilerplate";

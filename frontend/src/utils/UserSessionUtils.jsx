import StorageParams from "../constants/StorageParams";
import { LOGIN_ROUTE_PATH } from "../constants/NavigationRoutes";

export class UserSessionUtils {
   /**
    * This is used to get the user's bearer token.
    *
    * @returns
    */
   static getBearerToken() {
      return localStorage.getItem(StorageParams.ACCESS_TOKEN);
   }

   /**
    * This is used to get the user's refresh token.
    *
    * @returns
    */
   static getRefreshToken() {
      return localStorage.getItem(StorageParams.REFRESH_TOKEN);
   }
   /**
    * This method is used to clear the local storage and redirect the user to the login screen
    */
   static clearLocalStorageAndLogout() {
      // remove all
      this.setUserAuthToken(null);
      localStorage.clear();
      window.location.reload();
      window.location.href = LOGIN_ROUTE_PATH;
   }

   /**
    * This method is use to set the user's bearer token.
    *
    * @param bearerToken
    */
   static setUserAuthToken(bearerToken) {
      localStorage.setItem(StorageParams.ACCESS_TOKEN, bearerToken);
   }

   /**
    *
    */
   static setUserPermissions(permissions) {
      localStorage.setItem(StorageParams.PERMISSIONS, permissions);
   }

   /**
    *
    */
   static setSuperAdmin(superAdmin) {
      localStorage.setItem(StorageParams.IS_SUPER_ADMIN, superAdmin);
   }

   /**
    * This method is use to set the user's bearer token.
    *
    * @param bearerToken
    */
   static setUserSettings(settings) {
      localStorage.setItem(StorageParams.USER_SETTINGS, JSON.stringify(settings));
   }

   /**
    * This method is use to set the user's app settings.
    *
    */
   static getUserSettings() {
      const value = localStorage.getItem(StorageParams.USER_SETTINGS);
      return JSON.parse(value);
   }

   static getPermissions() {
      const value = localStorage.getItem(StorageParams.PERMISSIONS);
      return JSON.parse(value);
   }

   static getSuperAdmin() {
      const value = localStorage.getItem(StorageParams.IS_SUPER_ADMIN);
      return JSON.parse(value);
   }

   /**
    * This method is use to set the user's bearer token.
    *
    * @param bearerToken
    */
   static setFullSessionObject(fullObject) {
      localStorage.setItem(StorageParams.FULL_LOGIN_DETAILS_JSON, JSON.stringify(fullObject));
   }

   /**
    * This method is use to set the user's bearer token.
    *
    * @param bearerToken
    */
   static getFullSessionObject() {
      const value = localStorage.getItem(StorageParams.FULL_LOGIN_DETAILS_JSON);
      return JSON.parse(value);
   }
   /**
    * This method is used to set the user's refresh token.
    *
    * @param refreshToken
    */
   static setUserRefreshToken(refreshToken) {
      localStorage.setItem(StorageParams.REFRESH_TOKEN, refreshToken);
   }

   /**
    * This method is used to save a JSON object containing user details to local storage.
    *
    * @param userDetails
    */
   static setUserDetails(userDetails) {
      localStorage.setItem(StorageParams.USER_DETAILS_JSON, JSON.stringify(userDetails));
   }

   /**
    * This method is used to get a JSON object containing user details
    * @returns
    */
   static getUserDetails() {
      const value = localStorage.getItem(StorageParams.USER_DETAILS_JSON);
      return JSON.parse(value);
   }

   /**
    * This method is used to get user logged in status
    * @returns
    */
   static isLoggedIn() {
        try {
        const loggedIn = localStorage.getItem(StorageParams.IS_LOGGED_IN);

        if (loggedIn && loggedIn === true) {
            return true;
        }
        return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

   /**
    * This method is used to set user logged in status
    * @returns
    */
   static setLoggedIn(loggedIn) {
      if (loggedIn) {
         localStorage.setItem(StorageParams.IS_LOGGED_IN, true);
      } else {
         localStorage.setItem(StorageParams.IS_LOGGED_IN, false);
      }
   }

   /**
    * This method is used to get the stored expo device Id.
    */
   static getDeviceId() {
      return localStorage.getItem(StorageParams.EXPO_DEVICE_ID);
   }

   /**
    * This method is used to store the expo device Id.
    */
   static setDeviceId(token) {
      localStorage.setItem(StorageParams.EXPO_DEVICE_ID, token);
   }

   /**
    * This method is used to save a JSON object containing country details.
    *
    * @param country
    */
   static setUserCountry(country) {
      localStorage.setItem(StorageParams.COUNTRY, JSON.stringify(country));
   }

   /**
    * This method is used to get user country details
    * @returns
    */
   static getUserCountry() {
      return localStorage.getItem(StorageParams.COUNTRY);
   }

   /**
    * This method is used to save a JSON object containing language.
    *
    * @param language
    */
   static setUserLanguage(language) {
      localStorage.setItem(StorageParams.LANGUAGE, JSON.stringify(language));
   }

   /**
    * This method is used to get a JSON object containing user country details
    * @returns
    */
   static getUserLanguage() {
      return localStorage.getItem(StorageParams.LANGUAGE);
   }

   static async setLoginTime(time) {
      return localStorage.setItem(StorageParams.LOGIN_TIME, time);
   }

   /**
    * This method is used to get the login timestamp
    * @returns
    */
   static getLoginTime() {
      let time = localStorage.getItem(StorageParams.LOGIN_TIME);
      return time;
   }
}

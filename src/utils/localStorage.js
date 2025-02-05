const INTEGRATIONS = ['amplitude', 'none'];
const EUS_LOCATIONS = ['local', 'remote'];

const LOCALSTORAGE_STAGING_API_KEY = 'engagement.dev_base_app.staging_api_key';
const LOCALSTORAGE_PROD_API_KEY = 'engagement.dev_base_app.prod_api_key';
const LOCALSTORAGE_LOCAL_API_KEY = 'engagement.dev_base_app.local_api_key';
const LOCALSTORAGE_LOCAL_SDK_KEY = 'engagement.dev_base_app.local_sdk_key';
const LOCALSTORAGE_LOCAL_ACTIVE_API_KEY = 'engagement.dev_base_app.local_active_api_key';
const LOCALSTORAGE_USER_SLUG = 'test-base-user';
const END_USER_API = 'engagement.dev_base_app.end_user_api';
const LOCALSTORAGE_INTEGRATION = 'engagement.dev_base_app.integration';
const LOCALSTORAGE_EUS_LOCATION = 'amplitude.engagement.eus_location';


// Create function to set and get local storage values
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));    // set value to local storage           
    }
}

export const getLocalStorage = (key) => {
    if (window !== 'undefined') {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : null;    // get value from local storage
    }
    return null;
}

export const getIntegration = () => {
    return getLocalStorage(LOCALSTORAGE_INTEGRATION) || INTEGRATIONS[0];
}

export const setIntegration = (value) => {
    setLocalStorage(LOCALSTORAGE_INTEGRATION, value);
}

export const getEUSLocation = () => {
    return getLocalStorage(LOCALSTORAGE_EUS_LOCATION) || EUS_LOCATIONS[0];
}

export const setEUSLocation = (value) => {
    setLocalStorage(LOCALSTORAGE_EUS_LOCATION, value);
}

export const getLocalStagingAPIKey = () => {
    // Assistance Dev Org
    return getLocalStorage(LOCALSTORAGE_STAGING_API_KEY) || 'bf9e6cb1a12286e520e30681792fb8e2';
}

export const setLocalStagingAPIKey = (value) => {
    setLocalStorage(LOCALSTORAGE_STAGING_API_KEY, value);
}

export const getLocalProdAPIKey = () => {
    return getLocalStorage(LOCALSTORAGE_PROD_API_KEY) || '';
}

export const setLocalProdAPIKey = (value) => {
    setLocalStorage(LOCALSTORAGE_PROD_API_KEY, value);
}

export const getLocalAPIKey = () => {
    return getLocalStorage(LOCALSTORAGE_LOCAL_API_KEY) || '';
}

export const setLocalAPIKey = (value) => {
    console.log('Local API Key:', value);
    setLocalStorage(LOCALSTORAGE_LOCAL_API_KEY, value);
}

export const getLocalUserSlug = () => {
    return getLocalStorage(LOCALSTORAGE_USER_SLUG) || 'test-base-user';
}

export const setLocalUserSlug = (value) => {
    setLocalStorage(LOCALSTORAGE_USER_SLUG, value);
}

// End User API
export const getLocalEndUserAPI = () => {
    return getLocalStorage(END_USER_API) || '';
}

export const setLocalEndUserAPI = (value) => {
    setLocalStorage(END_USER_API, value);
}


// Active API
export const getLocalActiveAPI = () => {
    return getLocalStorage(LOCALSTORAGE_LOCAL_ACTIVE_API_KEY) || 'staging';
}

export const setLocalActiveAPI = (value) => {
    setLocalStorage(LOCALSTORAGE_LOCAL_ACTIVE_API_KEY, value);
}

// Local SDK
export const getLocalSDKKey = () => {
    return getLocalStorage(LOCALSTORAGE_LOCAL_SDK_KEY) || 'amplitude';
}

export const setLocalSDKKey = (value) => {
    setLocalStorage(LOCALSTORAGE_LOCAL_SDK_KEY, value);
}


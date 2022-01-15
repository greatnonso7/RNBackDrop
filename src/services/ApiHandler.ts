import { Observable, throwError, from } from 'rxjs';
import {
  mergeMap,
  retryWhen,
  take,
  delay,
  catchError,
  map,
} from 'rxjs/operators';
import axios, { AxiosPromise } from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { ENV } from '../utils';

async function handleRequest(req: any) {
  req.headers.Accept = 'application/json';
  req.headers.language = 'en';
  req.headers.timestamp = new Date().getTime();
  req.timeout = 60000;
  req.headers['x-api-key'] = ENV.catApiKey;

  console.log({ req });

  return req;
}

async function handleResponse(res: any) {
  console.log('InterResponse', res);
  if (res.status === 401 || (res.data && res.data.code === 401)) {
    // await refresh();
    // navigate('Auth', {});
  }
  return res;
}

/**
 * This is used to manage errors from api calls by checking needed information
 * before responding to the caller.
 * @param err
 * @returns {Observable<never>}
 */
function errorHandler(err: any): Observable<any> {
  const message = 'Error was encountered';
  if (err && err?.status === 0) {
    Object.assign(err.data, { message });
  }
  console.log('Error=', err);
  return throwError(err);
}

/**
 * This is used to modify the header request and relies on some header constraints
 * to generate some header fields
 */
axios.interceptors.request.use(
  async (req: any) => await handleRequest(req),
  (error: any) => Promise.reject(error),
);

/**
 * This is used to modify response call to reprocess error 401 and generate new
 * token to use for new and current running request.
 */
axios.interceptors.response.use(
  async (res: any) => await handleResponse(res),
  (err: any) => Promise.reject(err),
);

/**
 * This takes in a promise and convert to an observable
 * then makes the api request, it tries the api call 2 times only if failed
 * before responding to the caller.
 * @param apiCaller
 * @returns {Observable<*>}
 */
async function processApiRequest(
  apiCaller: AxiosPromise<any>,
): Promise<Observable<any>> {
  const message =
    'No network access. please check your connectivity or restart your WIFI.';
  const state = await NetInfo.fetch();

  return state.isConnected
    ? from(apiCaller)
        .pipe(
          retryWhen(
            (errors: { pipe: (arg0: any, arg1: any, arg2: any) => any }) =>
              errors.pipe(
                mergeMap((err: any) => errorHandler(err)),
                delay(1000),
                take(2),
              ),
          ),
          catchError((err: { response: any }) => errorHandler(err.response)),
          map((res: { data: any }) => res.data),
        )
        .toPromise()
    : Promise.reject({
        isNetworkError: true,
        data: { message },
      });
}

/***
 * The ApiHandler framework with observable
 */
export default {
  post: async (url: string, data: any, options?: any) =>
    processApiRequest(
      axios.post(
        options?.isFullPath ? url : ENV.baseUrl + url,
        data,
        options && { headers: options },
      ),
    ),
  put: async (url: string, data: any, options?: any) =>
    processApiRequest(
      axios.put(
        options?.isFullPath ? url : ENV.baseUrl + url,
        data,
        options && { headers: options },
      ),
    ),
  delete: async (url: string, data?: any, options?: any) => {
    data = data
      ? data instanceof Object && !Object.keys(data).length
        ? null
        : data
      : null;
    const config = data
      ? { headers: options, data }
      : { headers: options, data: '' };
    return processApiRequest(
      axios.delete(options?.isFullPath ? url : ENV.baseUrl + url, config),
    );
  },
  get: async (url: string, data?: any, options?: any) => {
    data = data
      ? data instanceof Object && !Object.keys(data).length
        ? null
        : data
      : null;
    const config = data
      ? { headers: options, data }
      : { headers: options, data: '' };
    return processApiRequest(
      axios.get(options?.isFullPath ? url : ENV.baseUrl + url, config),
    );
  },
};

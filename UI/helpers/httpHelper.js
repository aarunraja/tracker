import axios from 'axios';
import { getHeaderDetail, showMessage } from './utility';
export default class HttpHelper {
    static httpRequest = async (
        url,
        methodType,
        headers,
        body
    ) => {
        headers = await getHeaderDetail(headers);
        let config = {
            method: methodType,
            url: url,
            headers: headers,
            data: body,
            raxConfig: {
                retry: 3,
                noResponseRetries: 2,
                retryDelay: 100,
                httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],
                statusCodesToRetry: [[100, 199], [429, 429], [500, 599]]
            }
        };

        return await axios(config)
            .then(function (response) {
                return HttpHelper.successHandler(response);
            })
            .catch(function (error) {
                HttpHelper.errorHandler(error);
            });
    };

    static successHandler = (response) => {
        if (response.status === 200 || response.status === 201) {
            return response.data;
        }
        else {
            console.log('Something Went Wrong');
        }
    };

    static errorHandler = (error) => {
        if (error.response.data) {
            switch (error.response.status) {
                case 400:
                    if (error.response.data.message) {
                        showMessage(error.response.data.message, true);
                    }
                    else {
                        showMessage(error.response.data, true);
                    }
                    break;
                case 401:
                    // showMessage("Session Expired, Please login again", true);
                    break;
                case 404:
                    showMessage("Requested resource does not exist", true);
                    break;
                case 409:
                    showMessage('Version control conflit', 'Conflict', true);
                    break;
                case 500:
                    showMessage('Internal server error', 'Error', true);
                    break;
                default:
                    showMessage('Problem with response', 'Error Occured', true);
                    break;
            }
        }
        else if (error.request) {
            console.log('Problem with request');
        }
        else {
            console.log(error);
        }

        throw error;
    };
}

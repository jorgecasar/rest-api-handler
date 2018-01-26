// @flow
export type ApiResponseType<Respond> = {
    data: Respond;
    status: number;
    source: Response;
}

export type ProcessedResponse = ApiResponseType<Object | string>;

function decodeResponse(response: Response): Promise<Object | string> {
    if (response.headers.get('content-type').indexOf('application/json') !== -1) {
        return response.json();
    }

    return response.text();
}

export default (response: Response): Promise<ProcessedResponse> => {
    return decodeResponse(response)
        .then((decodedResponse: Object | string) => {
            // create custom response format
            const toRespond: ProcessedResponse = {
                data: decodedResponse,
                status: response.status,
                source: response,
            };

            // resolve promise on 2xx answer
            if (response.status >= 200 && response.status <= 299) {
                return toRespond;
            }

            // otherwise create an error
            throw toRespond;
        });
};
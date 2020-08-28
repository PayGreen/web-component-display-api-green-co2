import axios from 'axios';

class ApiRequestHelper {
    // CONSTANTS
    public static readonly DEFAULT_MONTH_TYPE: string = 'strict';
    private readonly API_ROUTE: string = '/carbon/statistics/last-month';

    // VARIABLES
    private apiHost: string;
    private userToken: string;

    constructor(apiHost: string, userToken: string) {
        this.apiHost = apiHost;
        this.userToken = userToken;
    }

    /**
     *
     * @param {string} monthType
     * @returns {any} The API response
     */
    async getCarbonStatistics(monthType: string) {
        const type = monthType ? monthType : ApiRequestHelper.DEFAULT_MONTH_TYPE;

        return await axios
            .get(this.apiHost + this.API_ROUTE, {
                params: {
                    token: this.userToken,
                    type: type,
                },
            })
            .then((res) => res)
            .catch((err) => err.response);
    }
}

export default ApiRequestHelper;

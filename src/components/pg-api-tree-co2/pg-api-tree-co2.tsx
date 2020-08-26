import { Component, h, Prop, State } from '@stencil/core';
import ApiRequestHelper from '../../utils/ApiRequestHelper';

@Component({
    tag: 'pg-api-tree-co2',
    styleUrl: 'style/pg-api-tree-co2.scss',
    shadow: true,
})
export class PgApiTreeCo2 {
    /**
     * The Host of the API
     */
    @Prop() apiHost!: string;

    /**
     * The statisticsToken of the ApiUser
     */
    @Prop() userToken!: string;

    /**
     * The type of the month to report
     */
    @Prop() monthType: string = ApiRequestHelper.DEFAULT_MONTH_TYPE;

    /**
     * The response of the API
     */
    @State() apiResponse: any;

    async componentWillLoad() {
        const helper = new ApiRequestHelper(this.apiHost, this.userToken);
        this.apiResponse = await helper.getCarbonStatistics(this.monthType);

        console.log(this.apiResponse);
    }

    render() {
        const {
            status,
            data: { carbonEmitted, carbonOffset, detail },
        } = this.apiResponse;

        if (status !== 200) {
            return (
                <div class="pg-card-alert">
                    <h6>Alerte</h6>
                    <span>{detail}</span>
                </div>
            );
        }
        return (
            <div class="pg-card">
                <div class="pg-card-content">
                    <div>
                        <h6>Bilan carbone</h6>

                        <span>
                            Grâce à notre effort collectif, nous avons compensé{' '}
                            <span class="pg-card-content-value">
                                {(carbonOffset / carbonEmitted) * 100}
                            </span>
                            % de nos émissions de CO2 !
                        </span>
                    </div>

                    <div>
                        <h6>CO2 compensé</h6>

                        <span>
                            <span class="pg-card-content-value">
                                {carbonOffset}
                            </span>{' '}
                            TeqCO2*
                        </span>
                    </div>

                    <div>
                        <h6>CO2 émis</h6>

                        <span>
                            <span class="pg-card-content-value">
                                {carbonEmitted}
                            </span>{' '}
                            TeqCO2*
                        </span>
                    </div>
                </div>
                <span class="pg-card-note">* Tonne par équivalent CO2.</span>
            </div>
        );
    }
}

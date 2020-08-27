import { Component, h, Prop, State } from '@stencil/core';
import ApiRequestHelper from '../../utils/ApiRequestHelper';
import { colorOptions, colorDefault } from '../../shared/constants';

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
     * The color of the widget
     */
    @Prop() cardColor: string;

    /**
     * The response of the API
     */
    @State() apiResponse: any;

    async componentWillLoad() {
        const helper = new ApiRequestHelper(this.apiHost, this.userToken);
        this.apiResponse = await helper.getCarbonStatistics(this.monthType);

        console.log(this.apiResponse);
    }

    private convertToKg(tonCo2Eq: number): string {
        let kgCo2Eq = tonCo2Eq * 1000;

        return kgCo2Eq.toFixed(2);
    }

    render() {
        const {
            status,
            data: { carbonEmitted, carbonOffset, detail },
        } = this.apiResponse;

        if (status !== 200) {
            return (
                <div class="pg-card pg-danger">
                    <div class="pg-title">Erreur</div>
                    <div class="pg-text">{detail}</div>
                </div>
            );
        }

        let cardStyle = new String('pg-card pg-').concat(
            this.cardColor &&
                Object.values(colorOptions).includes(this.cardColor)
                ? this.cardColor
                : colorDefault,
        );
        return (
            <div class={cardStyle}>
                <div class="pg-text">
                    <span class="pg-carbon-stats">
                        {this.convertToKg(carbonEmitted)}
                    </span>{' '}
                    Kg{' '}
                    <strong>
                        CO<sub>2</sub>eq Émis
                    </strong>
                </div>
                <div class="pg-text">
                    <span class="pg-carbon-stats">
                        {this.convertToKg(carbonOffset)}
                    </span>{' '}
                    Kg{' '}
                    <strong>
                        CO<sub>2</sub>eq Compensé
                    </strong>
                </div>
                <div class="pg-text">
                    Pour l'activité d'achat en ligne de nos clients
                </div>
            </div>
        );
    }
}

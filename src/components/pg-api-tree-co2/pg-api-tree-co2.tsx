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
     * The legend of the widget
     */
    @Prop() textLegend?: string = 'Pour l\'ensemble des achats en ligne de nos clients';

    /**
     * The link of the widget
     */
    @Prop() targetLink?: string = '';

    /**
     * The link of the widget
     */
    @Prop() colorMain?: string = '#33ad73';

    /**
     * The link of the widget
     */
    @Prop() colorBg?: string = 'transparent';

    /**
     * The link of the widget
     */
    @Prop() colorText?: string = '#333333';

    /**
     * The response of the API
     */
    @State() apiResponse: any;

    async componentWillLoad() {
        const helper = new ApiRequestHelper(this.apiHost, this.userToken);
        this.apiResponse = await helper.getCarbonStatistics(this.monthType);
    }

    /**
     * Convert a CarbonReport value expressed in tonCo2Eq into kgCo2Eq
     * Create HTML display for decimal
     * 
     * @param {number} tonCo2Eq
     * @returns {string}
     */
    private convertToKg(tonCo2Eq: number): string {
        let kgCo2Eq = tonCo2Eq * 1000;
        let kgInt = Math.round(kgCo2Eq);
        let kgRest = kgCo2Eq.toFixed(2).slice(-2);

        return <span>{kgInt}<small>.{kgRest}</small></span>;
    }

    render() {
        const {
            status,
            data: { carbonEmitted, carbonOffset, detail },
        } = this.apiResponse;

        if (status !== 200) {
            return <div class="pg-co2-card pg-co2-card__danger">{detail}</div>;
        }
        
        const carbonOffsetPercent = Math.round(carbonOffset/carbonEmitted * 100);

        const content = (
            <div>
                <div class="pg-co2-card__offset">
                    <span
                        class="pg-co2-card__offset__amount"
                        style={{color: this.colorMain}}
                    >
                        {this.convertToKg(carbonOffset)}
                    </span>

                    <span class="pg-co2-card__offset__unit">
                        kg CO<sub>2</sub>eq
                    </span>

                    <span
                        class="pg-co2-card__offset__text"
                        style={{color: this.colorMain}}
                    >
                        compensé
                    </span>
                </div>

                <div class="pg-co2-card__legend">
                    {this.textLegend}
                </div>

                <div class="pg-co2-card__chart">
                    <div
                        class="pg-co2-card__chart__progress-bar"
                        style={{borderColor: this.colorMain}}
                    >
                        <div
                            class="pg-co2-card__chart__progress-bar__value"
                            style={{
                                width: carbonOffsetPercent + '%',
                                backgroundColor: this.colorMain
                            }}
                        ></div>
                    </div>

                    <span class="pg-co2-card__chart__value">
                        {carbonOffsetPercent}&nbsp;%
                    </span>
                </div>
            </div>
        );

        const wrapperStyle = {
            color: this.colorText,
            backgroundColor: this.colorBg
        };

        if (this.targetLink !== '') {
            return (
                <a
                    href={this.targetLink}
                    target="_blank"
                    class="pg-co2-card"
                    style={wrapperStyle}
                >
                    {content}
                </a>
            );
        }

        return <div class="pg-co2-card" style={wrapperStyle}>{content}</div>;
    }
}

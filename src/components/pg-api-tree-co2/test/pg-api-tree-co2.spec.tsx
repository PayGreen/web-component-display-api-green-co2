import { newSpecPage } from '@stencil/core/testing';
import { PgApiTreeCo2 } from '../pg-api-tree-co2';

describe('pg-api-tree-co2', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PgApiTreeCo2],
      html: `<pg-api-tree-co2></pg-api-tree-co2>`,
    });
    expect(page.root).toEqualHtml(`
      <pg-api-tree-co2>
        <mock:shadow-root>
          <div class="paygreen-card">
            <div>
              <h6>
                Bilan carbone
              </h6>
              <span>
                Grâce à notre effort collectif, nous avons compensé NaN% de nos émissions de CO2 !
              </span>
            </div>
            <div>
              <h6>
                CO2 compensé
              </h6>
              <span>
                 TeqCO2*
              </span>
            </div>
            <div>
              <h6>
                CO2 émis
              </h6>
              <span>
                 TeqCO2*
              </span>
            </div>
            <span>
              * Tonne par équivalent CO2.
            </span>
          </div>
        </mock:shadow-root>
      </pg-api-tree-co2>
    `);
  });
});

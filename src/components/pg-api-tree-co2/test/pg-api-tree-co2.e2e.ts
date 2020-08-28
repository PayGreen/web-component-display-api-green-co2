import { newE2EPage } from '@stencil/core/testing';

describe('pg-api-tree-co2', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<pg-api-tree-co2></pg-api-tree-co2>');

    const element = await page.find('pg-api-tree-co2');
    expect(element).toHaveClass('hydrated');
  });
});

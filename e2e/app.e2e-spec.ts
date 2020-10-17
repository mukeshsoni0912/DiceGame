import { TelebuPage } from './app.po';

describe('telebu App', () => {
  let page: TelebuPage;

  beforeEach(() => {
    page = new TelebuPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

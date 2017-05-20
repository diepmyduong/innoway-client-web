import { InnowayPage } from './app.po';

describe('innoway App', () => {
  let page: InnowayPage;

  beforeEach(() => {
    page = new InnowayPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

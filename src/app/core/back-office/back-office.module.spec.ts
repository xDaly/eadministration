import { BackOfficeModule } from './back-office.module';

describe('BackOfficeModule', () => {
  let backOfficeModule: BackOfficeModule;

  beforeEach(() => {
    backOfficeModule = new BackOfficeModule();
  });

  it('should create an instance', () => {
    expect(backOfficeModule).toBeTruthy();
  });
});

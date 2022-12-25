import { FrontOfficeModule } from './front-office.module';

describe('FrontOfficeModule', () => {
  let frontOfficeModule: FrontOfficeModule;

  beforeEach(() => {
    frontOfficeModule = new FrontOfficeModule();
  });

  it('should create an instance', () => {
    expect(frontOfficeModule).toBeTruthy();
  });
});

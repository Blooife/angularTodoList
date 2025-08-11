import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubUserComponent } from './github-user.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { GithubUser } from '../../models/GithubUser';

describe('GithubUserComponent', () => {
  let component: GithubUserComponent;
  let fixture: ComponentFixture<GithubUserComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubUserComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GithubUserComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do nothing if input is empty', () => {
    //arrange
    component.searchControl.setValue('');

    //act
    component.search();

    //assert
    expect(component.user).toBeNull();
    expect(component.notFound).toBeFalse();
    httpMock.expectNone(() => true);
  });

  it('should do nothing if input is only spaces', () => {
    //arrange
    component.searchControl.setValue('   ');

    //act
    component.search();

    //assert
    expect(component.user).toBeNull();
    expect(component.notFound).toBeFalse();
    httpMock.expectNone(() => true);
  });

  it('should set user on successful search', () => {
    //arrange
    const mockUser: GithubUser = {
      login: 'testUser',
      avatar_url: 'someAvatarUrl',
    };

    component.searchControl.setValue('testUser');

    //act
    component.search();

    //assert
    const req = httpMock.expectOne('https://api.github.com/users/testUser');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);

    expect(component.user).toEqual(mockUser);
    expect(component.notFound).toBeFalse();
  });

  it('should set notFound on error', () => {
    //arrange
    component.searchControl.setValue('notExistingUser');

    //act
    component.search();

    //assert
    const req = httpMock.expectOne('https://api.github.com/users/notExistingUser');
    expect(req.request.method).toBe('GET');
    req.flush({}, { status: 404, statusText: 'Not Found' });

    expect(component.user).toBeNull();
    expect(component.notFound).toBeTrue();
  });
});

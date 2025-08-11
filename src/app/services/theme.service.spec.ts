import { TestBed } from '@angular/core/testing';
import { ThemeService, Theme } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();

    document.body.className = '';

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getStoredTheme', () => {
    it('should return "light" if no theme in localStorage', () => {
      expect((service as any).getStoredTheme()).toBe('light');
    });

    it('should return "dark" if localStorage has dark', () => {
      localStorage.setItem('app-theme', 'dark');
      expect((service as any).getStoredTheme()).toBe('dark');
    });

    it('should return "light" if localStorage has invalid value', () => {
      localStorage.setItem('app-theme', 'invalid');
      expect((service as any).getStoredTheme()).toBe('light');
    });
  });

  describe('setTheme', () => {
    it('should update localStorage, emit new theme and apply class', () => {
      const theme: Theme = 'dark';

      spyOn(service, 'applyTheme').and.callThrough();
      const nextSpy = jasmine.createSpy('next');
      service.theme$.subscribe(nextSpy);

      service.setTheme(theme);

      expect(localStorage.getItem('app-theme')).toBe('dark');
      expect(service.applyTheme).toHaveBeenCalledWith('dark');
      expect(nextSpy).toHaveBeenCalledWith('dark');
      expect(document.body.classList.contains('dark')).toBeTrue();
      expect(document.body.classList.contains('light')).toBeFalse();
    });
  });

  describe('applyTheme', () => {
    it('should remove old classes and add new theme class to body', () => {
      document.body.classList.add('light');
      service.applyTheme('dark');

      expect(document.body.classList.contains('dark')).toBeTrue();
      expect(document.body.classList.contains('light')).toBeFalse();

      service.applyTheme('light');
      expect(document.body.classList.contains('light')).toBeTrue();
      expect(document.body.classList.contains('dark')).toBeFalse();
    });
  });

  describe('initTheme', () => {
    it('should get stored theme, apply it and emit it', () => {
      localStorage.setItem('app-theme', 'dark');

      spyOn(service, 'applyTheme').and.callThrough();
      const nextSpy = jasmine.createSpy('next');
      service.theme$.subscribe(nextSpy);

      service.initTheme();

      expect(service.applyTheme).toHaveBeenCalledWith('dark');
      expect(nextSpy).toHaveBeenCalledWith('dark');
      expect(document.body.classList.contains('dark')).toBeTrue();
    });
  });
});

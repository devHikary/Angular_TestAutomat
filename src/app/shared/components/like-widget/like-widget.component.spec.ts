import { LikeWidgetModule } from './like-widget.module';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LikeWidgetComponent } from './like-widget.component';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent>;
  let component: LikeWidgetComponent = null;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports:[LikeWidgetModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('should create component ', () => {
    expect(component).toBeTruthy();
  });

  it('Should auto generate ID when id input property is missing', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('Should NOT generate ID when id input property is present', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  it(`#${LikeWidgetComponent.prototype.like.name}
    should trigger emission whe called`, () => {
      fixture.detectChanges();
      component.liked.subscribe(() => {
        expect(true).toBeTruthy();
      });
      component.like();
  });
});

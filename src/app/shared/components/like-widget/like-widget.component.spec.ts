/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LikeWidgetComponent } from './like-widget.component';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe(LikeWidgetComponent.name, () => {
  // let component: LikeWidgetComponent = null;
  let fixture: ComponentFixture<LikeWidgetComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ LikeWidgetComponent ],
      providers: [UniqueIdService],
      imports:[FontAwesomeModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
  });

  it('should create component ', () => {
    const instance = fixture.componentInstance;
    expect(instance).toBeTruthy();
  });
});

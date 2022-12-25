import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService, LoaderState } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'tia-spinner',
    template: `
    <div [class.hidden]="!show">
        <div *ngIf="show" [@hide] class="loader-overlay card">
            <div class="lds-ripple"><div></div><div></div></div>
        </div>
    </div>
    `,
    styleUrls: ['./loader.component.scss'],
    animations: [
        trigger('hide', [
            transition('void => *', [
                style({ opacity: 1 }),
                animate("2s")
            ]),
            transition('* => void', [
                animate("2s", keyframes([
                    style({ opacity: 1 }),
                    style({ opacity: 1 }),
                    style({ opacity: 0.5 }),
                    style({ opacity: 0.25 }),
                    style({ opacity: 0 })
                ]))
            ])
        ])
    ]

})
export class LoaderComponent implements OnInit, OnDestroy {

    show = false;
    private subscription: Subscription;
    constructor(private loaderService: LoaderService) { }
    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
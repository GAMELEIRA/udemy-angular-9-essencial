import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appFor]'
})
export class ForDirective implements OnInit {

  @Input("appForEm") numbers: number[];

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {

   }

  ngOnInit(): void {

    for(let number of this.numbers){

      this.container.createEmbeddedView(this.template, {$implicit:number});

    }

  }

}

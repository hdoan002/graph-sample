import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NGX Graph';

  view = [ window.innerWidth, window.innerHeight - 100 ];
  autoZoom = true;
  panOnZoom = true;
  enableZoom = true;
  autoCenter = true;
  curve = false;

  matched: Array<any>;

  select = {
    stroke: '#666'
  };


  zoomToFit$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();

  ngxNode =
  [
    {
      id: '1',
      label: 'Something A',
      profile: 'This is alpha node.'
    },
    {
      id: '2',
      label: 'Something B',
      profile: 'This is bravo node.'
    },
    {
      id: '3',
      label: 'Something C',
      profile: 'This is charlie node.'
    },
    {
      id: '4',
      label: 'Something D',
      profile: 'This is delta node.'
    },
    {
      id: '5',
      label: 'Something E',
      profile: 'This is echo node.'
    },
    {
      id: '6',
      label: 'Something F',
      profile: 'This is foxtrot node.'
    }
  ];

  ngxLinks =
  [
    {
      id: 'a',
      source: '1',
      target: '2',
      label: 'is parent of',
      selected: false,
      color: {
        stroke: '#666'
      }
    }, {
      id: 'b',
      source: '2',
      target: '3',
      label: 'custom label',
      selected: false,
      color: {
        stroke: '#666'
      }
    },
    {
      id: 'c',
      source: '1',
      target: '3',
      label: 'custom label',
      selected: false,
      color: {
        stroke: '#666'
      }
    },
    {
      id: 'd',
      source: '1',
      target: '4',
      label: 'custom label',
      selected: false,
      color: {
        stroke: '#666'
      }
    },
    {
      id: 'e',
      source: '3',
      target: '5',
      label: 'custom label',
      selected: false,
      color: {
        stroke: '#666'
      }
    },
    {
      id: 'f',
      source: '3',
      target: '6',
      label: 'custom label',
      selected: false,
      color: {
        stroke: '#666'
      }
    },
  ];

  ngxCluster = [
    {
      id: '0',
      label: 'Layer 0',
      childNodeIds: ['1', '3', '4']
    },
    {
      id: 'asdfasdf',
      label: 'Layer 1',
      childNodeIds: ['5', '6']
    },
    {
      id: 'asdfasdfgdsafasd',
      label: 'Layer 2',
      childNodeIds: ['2']
    }
  ];


  fitGraph() {
    this.zoomToFit$.next(true);
    console.log('Fitting');
  }

  centerGraph() {
    this.center$.next(true);
    console.log('Centering');
  }

  match(node: string) {
    console.log(this.ngxLinks);
    this.matched = this.ngxLinks.filter(element => element.source.match(node));
    this.matched.forEach(item => item.selected = !item.selected);
    if (this.matched[0] !== undefined) {
      if (this.matched[0].selected) {
        this.matched.forEach(item => item.color.stroke = '#f00');
      } else {
        this.matched.forEach(item => item.color.stroke = '#666');
      }
    }
  }

  getColor(some) {
    console.log('I did something');
    console.log(some);
    if (some === true) {
      this.select.stroke = '#f00';
    } else {
      this.select.stroke = '#666';
    }
  }

}

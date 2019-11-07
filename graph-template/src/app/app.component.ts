import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'graph-template';

  view = [ window.innerWidth, window.innerHeight - 200 ];
  autoZoom = true;
  panOnZoom = true;
  enableZoom = true;
  autoCenter = true;
  curve = false;

  zoomToFit$: Subject<boolean> = new Subject();

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
      label: 'is parent of'
    }, {
      id: 'b',
      source: '2',
      target: '3',
      label: 'custom label'
    },
    {
      id: 'c',
      source: '1',
      target: '3',
      label: 'custom label'
    },
    {
      id: 'd',
      source: '1',
      target: '4',
      label: 'custom label'
    },
    {
      id: 'e',
      source: '3',
      target: '5',
      label: 'custom label'
    },
    {
      id: 'f',
      source: '3',
      target: '6',
      label: 'custom label'
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

}

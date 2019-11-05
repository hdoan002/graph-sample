import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'graph-template';

  ngxNode =
  [
    {
      id: '1',
      label: 'A'
    }, {
      id: '2',
      label: 'B'
    }, {
      id: '3',
      label: 'C'
    },
    {
      id: '4',
      label: 'D'
    }, {
      id: '5',
      label: 'E'
    }, {
      id: '6',
      label: 'F'
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
}

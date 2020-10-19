import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  title: string = '';
  description: string = '';
  projects: Array<any> = [];

  constructor(private projService: ProjectsService) { }

  ngOnInit(): void {
  }

  addProject(){
    this.projService.addProject(this.title, this.description);
    console.log('addProject() runs in component')
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})
export class BugsComponent implements OnInit {

  title: string;
  difficulty: string;
  description: string;
  status: string;
  projId: string;

  constructor(private projectService: ProjectsService, private actr: ActivatedRoute) { 
    // Grab and attach projID from url endpoint to the local variable
    this.projId = this.actr.snapshot.params.projId; 
  }

  ngOnInit(): void {
  }

  addBug() {
    // ADD FUNCTIONALITY TO THE PROJECTS SERVICE TO SEND THIS INFO TO THE DB
    this.projectService.addBug(this.title, this.description, this.difficulty, this.status, this.projId);


    console.log(this.title);
    console.log(this.difficulty);
    console.log(this.description);
    console.log(this.status);
    console.log(this.projId);

    
    // Clear input data after new bug is added
    this.title = '';
    this.difficulty = ''; // may need to set options to ull
    this.description = '';
    this.status = '';
    

  }
}

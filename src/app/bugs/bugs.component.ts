import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  
  projectName: string;
  bugsList: Array<Object> = []; // will fill with data retrieved from projectsService

  bugs$: Observable<any>;
  
    


  constructor(private projectService: ProjectsService, private actr: ActivatedRoute, private afs: AngularFirestore) { 
    // Grab and attach projID from url endpoint to the local variable
    this.projId = this.actr.snapshot.params.projId;
    
    // Keeps bugsList updated with latest data from FireStore
    this.afs.collection('bugs', ref => ref.where('projId', '==', this.projId)).valueChanges({idField: 'id'})
      .subscribe(val => this.bugsList = val);

    // Grab and attach project title from DB to 'projectName'
    this.afs.collection('projects').doc(this.projId).valueChanges().subscribe((val: any)=> {
      this.projectName = val ? val.title : null
    });

  }

  ngOnInit(): void {
    console.log(this.bugsList)
  }

  addBug() {
    this.projectService.addBug(this.title, this.description, this.difficulty, this.status, this.projId);

    // LOGS INPUT DATA SENT TO DB... DELETE LATER
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

  removeBug(bugId: string){ // STILL NEED TO TEST FUNCTIONALITY
    this.projectService.removeBug(bugId)
  }

}

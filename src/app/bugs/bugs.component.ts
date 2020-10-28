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

  // Individual Bug Variables
  title: string;
  difficulty: string;
  description: string;
  status: string;
  projId: string;
  
  projectName: string;
  bugsList: Array<Object> = []; // filled with data retrieved from projectsService
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

  }

  addBug() {
    this.projectService.addBug(this.title, this.description, this.difficulty, this.status, this.projId);
    
    // Clear input data after new bug is added
    this.title = '';
    this.difficulty = ''; 
    this.description = '';
    this.status = '';
  }

  removeBug(bugId: string){ 
    this.projectService.removeBug(bugId)
  }

  /**
   * Updates the status of an item to the status given in the argument
   * 
   * @param bugId Id associated with the bug that needs a status change
   * @param nextStatus The next status to progress to according to current status
   * 
   * @returns string value of the "next" status
   */
  updateStatus(bugId: string, nextStatus: string) {
    // BUILD OUT FUNCTIONALITY ON SERVICE SIDE
  }
}

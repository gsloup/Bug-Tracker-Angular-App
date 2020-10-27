import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  
  projectName: string;

  constructor(private projectService: ProjectsService, private actr: ActivatedRoute, private afs: AngularFirestore) { 
    // Grab and attach projID from url endpoint to the local variable
    this.projId = this.actr.snapshot.params.projId;

    // Grab and attach project title from DB to 'projectName'
    this.afs.collection('projects').doc(this.projId).valueChanges().subscribe((val: any)=> {
      this.projectName = val ? val.title : null
    })    
  }

  ngOnInit(): void {
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

  removeBug(){
    // add code later to send to the back end
  }

  // Use projectId to get the name of the project so it may be displayed as a header
  // getProjectName() {
  //   let projectsDocument = this.afs.doc<project>('projects/' + this.projId);
  //   let project = projectsDocument.snapshotChanges().pipe(
  //     map(changes => changes.map(a => {
  //       const data = a.payload.doc.data() as project;
  //       const id = a.payload.doc.id;
  //       return {id, ...data};
  //     }))
  //   )
  // }

}

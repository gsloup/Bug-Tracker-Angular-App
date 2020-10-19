import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { ProjectsService } from '../services/projects.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  title: string = '';
  description: string = '';
  projects: Array<Object> = [];

  userId$ = new Subject<string>();
  projects$ = this.userId$.pipe(
    switchMap(uid => {
      return this.afs.collection('projects', ref => ref.where('userId', '==', uid)).valueChanges({idField: 'id'})
    })
  )

  constructor(private projectService: ProjectsService, private afs: AngularFirestore, private auth: AngularFireAuth) { 
    this.auth.user.subscribe(v => {
      this.userId$.next( v ? v.uid : null);
    });
    this.projects$.subscribe(val => this.projects = val);
  }

  ngOnInit(): void {
  }

  addProject(){
    this.projectService.addProject(this.title, this.description);
    console.log('addProject() runs in component');
  }
  removeProject(id){
    this.projectService.removeProject(id);
  }

}

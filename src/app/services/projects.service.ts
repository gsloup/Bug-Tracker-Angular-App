import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  userId: string = '';
  projId: string = ''; 
  bugId: string = ''; 

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) { 
    // Attaches Google User to userId var
    this.auth.user.subscribe(v=> {
      this.userId = v ? v.uid : null;
    });
  }
  // Projects' Functions
  addProject(title: string, description: string){
    this.afs.collection('projects').add({
      userId: this.userId,
      title: title,
      description: description
    })
    console.log("addProject() runs in service")
  }
  removeProject(projId: string){
    this.afs.collection('projects').doc(projId).delete();
  }
  
  // Bugs' Functions
  addBug(title: string, description: string, difficulty: string, status: string, projId: string){
    this.afs.collection('bugs').add({
      // userId: this.userId, // may not need since it is linked to projId
      projId: projId,
      title: title,
      description: description,
      difficulty: difficulty,
      status: status
    })
  }
  removeBug(bugId: string){
    this.afs.collection('bugs').doc(bugId).delete(); // UNSURE OF WHETHER THIS FUNCTION WILL WORK
  }
}

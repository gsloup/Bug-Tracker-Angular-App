import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  userId: string = '';

  // NEED TO ADD A PROJECT ID FOR THE ADDBUG FEATURE

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) { 
    this.auth.user.subscribe(v=> {
      this.userId = v ? v.uid : null;
    });
  }
  addProject(title: string, description: string){
    this.afs.collection('projects').add({
      userId: this.userId,
      title: title,
      description: description
    })
  }
  removeProject(projId: string){
    this.afs.doc(projId).delete(); // UNSURE OF WHETHER THIS FUNCTION WILL WORK
  }
  addBug(title: string, description: string){
    this.afs.collection('bugs').add({
      userId: this.userId,
      title: title,
      description: description
    })
  }
  removeBug(bugId: string){
    this.afs.doc(bugId).delete(); // UNSURE OF WHETHER THIS FUNCTION WILL WORK
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  userId: string = '';
  projId: string = ''; // will need to grab it from either the store or firestore
  bugId: string = ''; // see above

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
    console.log("addProject() runs in service")
  }
  removeProject(projId: string){
    this.afs.collection('projects').doc(projId).delete(); // UNSURE OF WHETHER THIS FUNCTION WILL WORK
  }
  addBug(title: string, description: string){
    this.afs.collection('bugs').add({
      userId: this.userId, // may not need, if linked via projId
      // projId: this.projId
      title: title,
      description: description
    })
  }
  removeBug(bugId: string){
    this.afs.collection('bugs').doc(bugId).delete(); // UNSURE OF WHETHER THIS FUNCTION WILL WORK
  }
}

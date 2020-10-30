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
    // Delete the specific project
    this.afs.collection('projects').doc(projId).delete();

    // Delete the project's children data (bugs)
    this.afs.collection('bugs', ref => ref.where('projId', '==', projId)).valueChanges({idField: 'id'})
      .subscribe(bugs => bugs.forEach(b=> this.afs.collection('bugs').doc(b.id).delete()));
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
    this.afs.collection('bugs').doc(bugId).delete(); 
  }

  /**
   * Updates the status of an item to the status given in the argument in Google Firestore
   * 
   * @param bugId Id associated with the bug that needs a status change
   * @param newStatus The next status to progress to according to current status
   * 
   * @returns string value of the "next" status
   */
  updateStatus(bugId: string, newStatus: string) {
    this.afs.collection('bugs').doc(bugId).update({status: newStatus});
  }
}

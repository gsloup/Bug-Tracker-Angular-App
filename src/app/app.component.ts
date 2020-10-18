import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bugTrackerAngularApp';
  items: Observable<any[]>;
  constructor(db: AngularFirestore, public auth: AngularFireAuth, private router: Router) {
    this.items = db.collection('items').valueChanges();
  }

  logout() {
    this.auth.signOut().then(v=> this.router.navigate(['/login']));
  }
}

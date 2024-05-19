import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


interface Song {
  id?: string;
  title: string;
  artist: string;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule, MatButtonModule, MatMenuModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Music App';
  songList: Observable<Song[]>;

  constructor(private firestore: Firestore) {
    const songCollection = collection(this.firestore, 'songs');
    this.songList = collectionData(songCollection, { idField: 'id' }) as Observable<Song[]>;
  }

}

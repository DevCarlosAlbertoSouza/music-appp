// src/app/form/form.component.ts
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Firestore, collectionData, collection, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

interface Song {
  id?: string   ;
  title: string;
  artist: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone:true,
  imports:[
    FormsModule,CommonModule,RouterLink
  ]
})
export class FormComponent implements OnInit {
  song: Song = { title: '', artist: '' };
  songList: Observable<Song[]>;
  editingSong: Song | null = null;

  constructor(private firestore: Firestore) {
    const songCollection = collection(this.firestore, 'songs');
    this.songList = collectionData(songCollection, { idField: 'id' }) as Observable<Song[]>;
  }

  ngOnInit(): void {}

  async saveSong(form: NgForm) {
    const songCollection = collection(this.firestore, 'songs');
    if (this.editingSong) {
      const songDoc = doc(this.firestore, `songs/${this.editingSong.id}`);
      await updateDoc(songDoc, { title: this.song.title, artist: this.song.artist });
      this.editingSong = null;
    } else {
      await addDoc(songCollection, this.song);
    }
    this.song = { title: '', artist: '' };
    form.resetForm();
  }

  async deleteSong(id?: string) {
    const songDoc = doc(this.firestore, `songs/${id}`);
    await deleteDoc(songDoc);
  }

  editSong(song: Song) {
    this.song = { ...song };
    this.editingSong = song;
  }
}

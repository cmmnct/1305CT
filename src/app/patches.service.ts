import { Injectable, inject } from '@angular/core';
import { ColorPatch } from './models/colorpatch';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatchesService {

  http = inject(HttpClient)

  patches: ColorPatch[] = [

  ]

  patchesSubject$: BehaviorSubject<ColorPatch[]> = new BehaviorSubject(this.patches);

  patches$!: Observable<ColorPatch[]>

  getPatches(): ColorPatch[] {
    return this.patches
  }
  getPatches$(): BehaviorSubject<ColorPatch[]> {
    return this.patchesSubject$
  }
  update(patch: ColorPatch, updateP: ColorPatch) {
    // verzend de patch naar de API
    this.patches[this.patches.indexOf(patch)] = updateP;
    this.patchesSubject$.next(this.patches);
  }
  delete(patch: ColorPatch) {
    this.patches.splice(this.patches.indexOf(patch), 1);

    this.patchesSubject$.next(this.patches);
  }
  create(patch: ColorPatch) {
    // verzend nieuwe patch naar de API
    this.patches.push(patch);
    this.patchesSubject$.next(this.patches);
  }

  fetchPatches() {
    this.patches$ = this.http.get<ColorPatch[]>('https://my-json-server.typicode.com/cmmnct/patchDemo/patches').pipe(
      map(patches => patches.map(patch => new ColorPatch(patch.r, patch.g, patch.b, patch.a, patch.name, patch.id)))
    )
  }

  fetchPatchesSubject() {
    this.http.get<ColorPatch[]>('https://my-json-server.typicode.com/cmmnct/patchDemo/patches').pipe(
      map(patches => patches.map(patch => new ColorPatch(patch.r, patch.g, patch.b, patch.a, patch.name, patch.id)))
    ).subscribe(data => {
      this.patches = data;
      this.patchesSubject$.next(this.patches)
    }
    );
  }

  constructor() {
    this.fetchPatches() // haalt de patches op en stopt dit in een (cold) Observable
    this.fetchPatchesSubject(); // haalt de patches op, stopt dit in een array en voegt het toe aan een (hot) obervable
  }
}

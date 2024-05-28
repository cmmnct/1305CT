import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPatch } from '../models/colorpatch';
import { signal } from '@angular/core';
import { ColorthumbComponent } from '../colorthumb/colorthumb.component';
import { PatchEditorComponent } from '../patch-editor/patch-editor.component';
import { PatchesService } from '../patches.service';
import { Observable } from 'rxjs';
import { ColorPatchPipe } from '../pipes/colorpatchPipe';

@Component({
  selector: 'tvs-colorpatches',
  standalone: true,
  imports: [FormsModule , CommonModule, ColorthumbComponent, PatchEditorComponent, AsyncPipe, ColorPatchPipe],
  templateUrl: './colorpatches.component.html',
  styleUrl: './colorpatches.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorpatchesComponent implements OnInit {

  patchesService = inject(PatchesService);

  //constructor(private patchesService:PatchesService){}
  name = "Mark"
  editState = false;
  patches!: ColorPatch[];
  patches$!: Observable<ColorPatch[]>;


  currentPatch = new ColorPatch(56,87,98,1,"smoke");
  editPatch = new ColorPatch(0,0,0,1,'');

  ngOnInit(){
    this.patches = this.patchesService.getPatches();
    this.patches$ = this.patchesService.getPatches$();
  }

 

  patchesS = signal([
    new ColorPatch(255,255,255,1,'white'),
    new ColorPatch(0,0,0,1,'black'),
    new ColorPatch(255,0,0,1,'red'),
    new ColorPatch(0,255,0,1,'green'),
    new ColorPatch(0,0,255,1,'blue'),
    new ColorPatch(255,255,0,1, 'yellow'),
    new ColorPatch(0,255,255,1,'cyan'),
    new ColorPatch(255,0,255,1,'magenta'),
    new ColorPatch(24,56,78,1,'some color')
  ]) 

  onDeletePatch(patch:ColorPatch){
    console.log("delete patch clicked" + patch.name);
    this.patches.splice(this.patches.indexOf(patch),1);
  }

  onEditPatch(patch:ColorPatch){
    console.log("edit patch clicked" + patch.name);
    this.currentPatch = patch;
    this.editPatch = new ColorPatch(patch.r, patch.g, patch.b, patch.a, patch.name, patch.id);
    this.editState = true;
  }

  onCancelEdit(){
    this.editState = false;
    this.currentPatch = new ColorPatch(0,0,0,1,'');
  }

  onSavePatch(){
    this.editState = false;
    if(this.patches.indexOf(this.currentPatch) === -1){
     this.patches.push(this.editPatch);
    } else {
      this.patches[this.patches.indexOf(this.currentPatch)] = this.editPatch;
    }
    this.editPatch = new ColorPatch(0,0,0,1,'');
  }

  onClickAdd(){
    this.editState = true;
  }

}

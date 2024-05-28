import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorPatch } from '../models/colorpatch';
import { signal } from '@angular/core';
import { ColorthumbComponent } from '../colorthumb/colorthumb.component';
import { PatchEditorComponent } from '../patch-editor/patch-editor.component';
import { PatchesService } from '../patches.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'tvs-colorpatches',
  standalone: true,
  imports: [FormsModule, CommonModule, ColorthumbComponent, PatchEditorComponent, AsyncPipe],
  templateUrl: './colorpatches-observables.component.html',
  styleUrl: './colorpatches-observables.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorpatchesObservablesComponent implements OnInit {

  patchesService = inject(PatchesService);

  //constructor(private patchesService:PatchesService){}
  name = "Mark"
  editState = false;
  patches$!: BehaviorSubject<ColorPatch[]>;


  currentPatch!: ColorPatch ;
  editPatch! : ColorPatch;

  ngOnInit() {
    this.patches$ = this.patchesService.getPatches$();
    this.resetPatches();
  }

  onDeletePatch(patch: ColorPatch) {
    console.log("delete patch clicked" + patch.name);
    if (confirm('R U sure?')) {
      this.patchesService.delete(patch)
    }
  }

  onEditPatch(patch: ColorPatch) {
    console.log("edit patch clicked" + patch.name);
    this.currentPatch = patch;
    this.editPatch = new ColorPatch(patch.r, patch.g, patch.b, patch.a, patch.name, patch.id);
    this.editState = true;
  }

  onCancelEdit() {
    this.editState = false;
    this.resetPatches()
  }

  onSavePatch() {
    this.editState = false;
    if (this.currentPatch.name) {
      this.patchesService.update(this.currentPatch, this.editPatch);
    } else {
      this.patchesService.create(this.editPatch)
    }
    this.resetPatches()

  }

  onClickAdd() {
    this.editState = true;
  }

  resetPatches(){
    this.editPatch = new ColorPatch(0, 0, 0, 1, '');
    this.currentPatch = new ColorPatch(0, 0, 0, 1, '');
  }

}

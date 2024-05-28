import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPatch } from '../models/colorpatch';
import { ColorPatchPipe } from '../pipes/colorpatchPipe';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'tvs-patch-editor',
  standalone: true,
  imports: [FormsModule, ColorPatchPipe, NgStyle],
  templateUrl: './patch-editor.component.html',
  styleUrl: './patch-editor.component.css'
})
export class PatchEditorComponent {

@Input() patch = new ColorPatch(0,0,0,1,'black');

@Output() save = new EventEmitter<void>();
@Output() cancel = new EventEmitter<void>();

}

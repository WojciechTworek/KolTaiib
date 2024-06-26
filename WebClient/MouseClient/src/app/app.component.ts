import { Component, OnInit } from '@angular/core';
import { MouseService, Mouse } from './mouse/mouse.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mice: Mouse[] = [];
  addMouseForm: FormGroup;
  dodawanie: boolean = false;

  constructor(private mouseService: MouseService, private fb: FormBuilder) {
    this.addMouseForm = this.fb.group({
      model: ['', Validators.required],
      dpi: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadMice();
  }

  loadMice(): void {
    this.mouseService.getMice().subscribe((data: Mouse[]) => {
      this.mice = data;
    });
  }

  deleteMouse(id: number): void {
    this.mouseService.deleteMouse(id).subscribe(() => {
      this.loadMice();
    });
  }

  addMouse(): void {
    if (this.addMouseForm.valid) {
      const newMouse: Partial<Mouse> = {
        model: this.addMouseForm.get('model')?.value,
        dpi: this.addMouseForm.get('dpi')?.value
      };

      this.mouseService.addMouse(newMouse).subscribe(() => {
        this.loadMice();
        this.addMouseForm.reset();
        this.dodawanie = false;
      });
    }
  }
  toggleAddMouse(): void {
    this.dodawanie = !this.dodawanie;
  }
}

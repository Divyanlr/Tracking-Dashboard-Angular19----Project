import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocationService } from '../services/location.service';
import { SelectionService } from '../services/selection.service';
import { Individual } from '../models/individual.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  filterForm: FormGroup;
  individuals = signal<Individual[]>([]);
  isDarkMode = signal(false);
  private fb = inject(FormBuilder);
  private locationService = inject(LocationService);
  private selectionService = inject(SelectionService);

  constructor() {
    this.filterForm = this.fb.group({
      nameFilter: ['']
    });
  }

  ngOnInit(): void {
    this.locationService.getIndividuals().subscribe(individuals => {
      this.individuals.set(individuals);
    });

    this.filterForm.get('nameFilter')?.valueChanges.subscribe(value => {
      this.locationService.getIndividuals().subscribe(individuals => {
        const filtered = individuals.filter(i => i.name.toLowerCase().includes(value.toLowerCase()));
        this.individuals.set(filtered);
      });
    });
  }

  toggleDarkMode(): void {
    this.isDarkMode.update(val => !val);
    document.body.classList.toggle('dark-mode', this.isDarkMode());
  }

  selectIndividual(id: number): void {
    this.selectionService.selectIndividual(id);
  }
}
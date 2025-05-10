import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private selectedIndividualId = signal<number | null>(null);

  selectIndividual(id: number | null): void {
    this.selectedIndividualId.set(id);
  }

  getSelectedIndividualId(): number | null {
    return this.selectedIndividualId();
  }
}
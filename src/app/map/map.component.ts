import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { LocationService } from '../services/location.service';
import { SelectionService } from '../services/selection.service';
import { Individual } from '../models/individual.model';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  private map: L.Map | null = null;
  private markers: { [id: number]: L.Marker } = {};
  private locationService = inject(LocationService);
  private selectionService = inject(SelectionService);
  private selectedId$ = new BehaviorSubject<number | null>(null);
  private isMarkerClick = false;

  ngAfterViewInit(): void {
    console.log('Viewport size', window.innerWidth, window.innerHeight);
    this.initializeMapWithRetry();
  }

  private initializeMapWithRetry(attempts = 3, delay = 200): void {
    const mapContainer = document.getElementById('map');
    const size = mapContainer?.getBoundingClientRect();
    console.log('Map size attempt', size);

    if (size?.width === 0 && attempts > 0) {
      console.log(`Map width is 0, retrying in ${delay}ms, attempts left: ${attempts}`);
      setTimeout(() => this.initializeMapWithRetry(attempts - 1, delay * 2), delay);
      return;
    }

    if (!mapContainer || size?.width === 0) {
      console.error('Map container not ready or has zero width');
      return;
    }

    this.initMap();
    combineLatest([
      this.locationService.getIndividuals(),
      this.selectedId$.asObservable()
    ]).subscribe(([individuals, selectedId]) => {
      if (this.map && !this.isMarkerClick) {
        this.map.closePopup();
        console.log('Closing popup for selection:', selectedId);
      }
      this.updateMarkers(individuals, selectedId);
      if (selectedId !== null) {
        const selectedIndividual = individuals.find(i => i.id === selectedId);
        if (selectedIndividual && this.map) {
          this.map.setView([selectedIndividual.location.lat, selectedIndividual.location.lng], 15);
        }
      }
      this.isMarkerClick = false;
    });

    setInterval(() => {
      const selectedId = this.selectionService.getSelectedIndividualId();
      if (selectedId !== this.selectedId$.getValue()) {
        console.log('Selected ID:', selectedId);
        this.selectedId$.next(selectedId);
      }
    }, 100);
  }

  private initMap(): void {
    if (this.map) return;
    console.log('Map center set to Berlin:', [52.5200, 13.4050]);
    this.map = L.map('map', {
      center: [52.5200, 13.4050],
      zoom: 15
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', () => {
      this.map!.closePopup();
      console.log('Map clicked -- closing popup');
    });

    this.map.invalidateSize();
    console.log('Map initialized successfully');
  }

  private updateMarkers(individuals: Individual[], selectedId: number | null): void {
    if (!this.map) return;

    Object.keys(this.markers).forEach(id => {
      if (!individuals.find(i => i.id === +id)) {
        this.map!.removeLayer(this.markers[+id]);
        delete this.markers[+id];
      }
    });

    individuals.forEach(individual => {
      const isSelected = selectedId === individual.id;
      const animationStyle = isSelected
        ? 'animation: pulse 1.5s infinite ease-in-out;'
        : '';
      const icon = L.divIcon({
        className: `leaflet-marker-icon marker-${individual.status}${isSelected ? ' selected' : ''}`,
        html: `<div style="background-color: ${individual.status === 'safe' ? '#28A745' : '#FF4D4F'}; width: ${isSelected ? '30px' : '20px'}; height: ${isSelected ? '30px' : '20px'}; border-radius: 50%; ${animationStyle}"></div>`,
        iconSize: [isSelected ? 30 : 20, isSelected ? 30 : 20],
        iconAnchor: [isSelected ? 15 : 10, isSelected ? 15 : 10]
      });

      if (this.markers[individual.id]) {
        this.markers[individual.id].setIcon(icon);
        this.markers[individual.id].setLatLng([individual.location.lat, individual.location.lng]);
        this.markers[individual.id].setPopupContent(`${individual.name}: ${individual.status}`);
      } else {
        this.markers[individual.id] = L.marker([individual.location.lat, individual.location.lng], { icon })
          .addTo(this.map!)
          .bindPopup(`${individual.name}: ${individual.status}`)
          .on('click', () => {
            Object.values(this.markers).forEach(marker => {
              if (marker !== this.markers[individual.id]) {
                marker.closePopup();
              }
            });
            this.isMarkerClick = true;
            this.selectionService.selectIndividual(individual.id);
            console.log('Marker click, ID:', individual.id, 'Selected');
          });
      }
    });
  }
}
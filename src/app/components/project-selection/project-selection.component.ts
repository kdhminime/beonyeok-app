import { Component } from '@angular/core';

// Import services
import { AuthServicesService } from '../../services/auth/auth-services.service';

@Component({
  selector: 'app-project-selection',
  standalone: true,
  imports: [],
  templateUrl: './project-selection.component.html',
  styleUrl: './project-selection.component.scss'
})
export class ProjectSelectionComponent {

  constructor(
    public authService: AuthServicesService
  ) {}

  public welcomeMessage: string = 'You are signed in!';
}

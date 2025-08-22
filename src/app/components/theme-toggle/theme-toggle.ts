import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss'
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  isDark = false;

  ngOnInit() {
    this.isDark = this.themeService.getTheme() === 'dark';
  }

  onToggle() {
    const next = this.themeService.toggle(); // cf. retour de toggle ci-dessous
    this.isDark = next === 'dark';
    console.log('Theme saved:', next);
  }
}
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { MainContent } from './components/main-content/main-content';
import { AboutContent } from './components/about-content/about-content';
import { Content } from "./components/content/content";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MainContent, AboutContent, Content],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('cours-angular');
}

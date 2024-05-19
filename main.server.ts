import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../music-app/src/app/app.component';
import { appConfig } from '../music-app/src/app/app.config';

const bootstrap = () => bootstrapApplication(AppComponent, appConfig);

export default bootstrap;

# Skippywars

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

Original shopping cart:
https://www.youtube.com/watch?v=855KrFfF9-w&list=PLuxS_TWA04F7539hy9rIoReOHv9iHtrZp&index=51

**\*** Knowledge **\***

links https://www.interviewbit.com/angular-interview-questions/ https://github.com/DanWahlin/Angular-JumpStart https://github.com/DanWahlin/angular-architecture https://github.com/DanWahlin/Angular-RESTfulService

Why Angular?

JQuery and JavaScript couldn't maintain state across views
Angular provides routing, state management, rxjs library and http by default.
Major Angular blocks

In short: a. angular.json -> main.ts -> app.module.ts -> app.component.ts -> index.html
In detail: a. angular.json - The CLR builder looks for this config file and endpoints within for the application endpoint b. main.ts - The angular.json build section points to the main.ts file which creates the browser enviroment.
c. app.module.ts - The first Angular module is called and bootstrapped - AppModule. It has declarations to all the components
d. app.component.ts - The AppComponent is bootstrapped by the Angular base module called NgModule. It interacts with the webpage and serves data to it. e. index.html - The AppComponent's directive selector is called.
Component properties and declaration

Selector - used for accessing the component as a directive
Template/TemplateURL - contains HTML of the component
StylesURL - contains component-specific stylesheets
Defined by the @Component decorator
Angular binding between the component(Model) and its view(HTML template) (one-way or two-way)

Property binding "[...]"
Event binding "(...)"
String interpolation binding "{{ 2 + 2 }}"
Angular provides two types of compilation:

JIT(Just-in-Time) compilation a. Faster deployment
AOT(Ahead-of-Time) compilation a. More responsive UI since the application is completly compiled before runtime. b. All external HTML/CSS files are sent with the application, allowing for less AJAX requests. c. Errors in building phase can be handled by developers d. All HTML files are pulled into the JS files at compile time, adding security to the application.
Observables versus Promises Observables emit multiple objects over time Promises emit on object Observables are lazy, only called when subscribed to Promises are not lazy Observables can be cancelled by an unsubscribe call Promises can't be cancelled Observables have operators such as map, forEach, filter, reduce, retry, retryWhen etc.

Angular component lifecycle

In short: a. constructor -> ngOnchanges -> ngOnInit -> ngDoCheck -> (ngAfterContentInit/ngAfterContentChecked/ngAfterViewInit/ngAfterViewChecked) -> ngOnDestroy
In detail: a. constructor - Called during component instaniation b. ngOnchanges - Called on propertiy changes, holds pre/cur values c. ngOnInit - Called once for component setup d. ngDoCheck - Called for non-Angular events e. Hook Options a. ngAfterContentInit - Called after the first ngDoCheck is called b. ngAfterContentChecked - Called after each subsequent ngDoCheck is called c. ngAfterViewInit - Called after compoent view is initialized d. ngAfterViewChecked - Called when compoent's view is checked f. ngOnDestroy - Called just before a component is destroyed, used for service clean ups
Angular's 3 types of directives

Components: By the selector
Attribute Directives: Its a custom way to modify the HTML DOM.
a. Import 'Directive' and 'ElementRef' @angular/core. ie: import { Directive, ElementRef } from '@angular/core'; b. Decorate a class with @Directive and create a property bound selector. ie: @Directive({ selector: '[appHighlight]' }) c. Define the exported class and create an elementRef constructor. ie: export class HighlightDirective { constructor(el: ElementRef) { el.nativeElement.style.backgroundColor = 'yellow'; } } d. Place this custom directive within the HTML like you would a component directove. ie: "Highlight me!/>"
Structural Directives Prebuilt Angular directives such as *ngIf, *ngFor and \*ngSwitch that mod the HTML DOM using the component's methods and attributes.
Bootstrap Flex description.

What is it basically? This...
What is p-2? Its vertical padding
Angular Universal allows for applications to run server-side

First time users can instantly see a view of the application. This benefits in providing better user experience.
Many search engines expect pages in plain HTML, thus, Universal can make sure that your content is available on every search engine, which leads to better SEO.
Any server-side rendered application loads faster since rendered pages are available to the browser sooner.
Angular component communication

Parent to child using the @Input decorator
Child to parent using the @ViewChild decorator
Child to parent using the @Output decorator and EventEmitter
Angular dependancy injection is done using the @Injectable decorator

Versus differences Ng 7+ Routing on Modules: { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) }, Ng < 7 Routing on Modules: { path: 'customers', loadChildren: 'app/customers/customers.module#CustomersModule' }, List more differences between Ng7/8 and Ng10 (Look at Jump-Start)

**\*** TODO **\***

Continue watch training to add data
Add crud to manager table
Add yellow "Add" buttons to menuItem cards
Consistant slider padding
Add wait wheel on loading menuItems
Add edit/+or- buttons bellow pressed cart item.
TrackBy?
Add error logging to all components
Add simple login
Add session cache
Finish pic/details switch MenuItemDetail modal
**\*** Commands **\***

npm install npm@latest -g ng add @angular/material ng add @ng-bootstrap/ng-bootstrap npm install -g @angular/cli ng v npm v rm -r node_modules npm i ng serve -o ng serve --port 0 ng serve --aot ng build // create deployment artifacts to the dist folder ng build --aot // create deployment artifacts to the dist folder ng config schematics.@schematics/angular:component.styleext scss Create component: ng g c manager-details --skip-import

**\*** Hints **\***

Try to keep each menu item to a module for lazy loading and seperation of concerns in PolyFils.ts change: import 'core-js/es7/reflect'; to: import 'core-js/es/reflect'; Create a project that is SSASS enabled ng new sassy-project --style=scss

ng-template

menu close web-doctor
**\*** Issues **\***

HomeComponent.getMenuItemsPerManufacturer refreshes calling menuItems$ (observable, from menuItemService) and also filters on categoryFilters (observable, from categoryFilterService). However, categoryFilters$ never refreshed as menuItems$ does. So I created a collection within the categoryFilterService containing the said observable - and used this list for filtering. Why did I have to do this?

**\*\*** Architecture **\*\***

TODO:

Implement logService?
Adjust the cartItem buttons, they're a little off
Add some unit tests for Jenkins
Standardize CSS class names
Disable cart icon and counter when empty
Re-purpose cart component as order component
If last cart item is selected, add extra bottom padding
Add tooltip to suggest clicking on a cart item
Add edit button to close cart item modal and open cart edit modal
Add checkout page from cart submit

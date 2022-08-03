import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { NavController, Platform } from "@ionic/angular";
import { Order, Request } from "../types";
import { HomeService } from "./home/home.service";
import { MessageService } from "./services/message.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  orders: Order[] = [];
  requests: Request[] = [];
  loading = true;
  error = false;
  url = "/sign-in";

  constructor(
    private router: Router,
    private platform: Platform,
    private statusBar: StatusBar,
    private message: MessageService,
    private homeService: HomeService,
    private splashScreen: SplashScreen,
    private navCtrl: NavController
  ) {
    this.initializeApp();

    this.router.events.subscribe((event) => {
      event instanceof NavigationEnd ? (this.url = event.url.split("/")[1]) : null;
    });

    this.homeService.homeData().subscribe(
      (result) => {
        this.loading = result.loading;
        this.orders = result.data.orders;
        // this.requests = result.data.requests;
      },
      (err) => {
        console.error({ err });
        this.error = true;
        this.message.toast("خطایی رخ داده است");
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLogout() {
    this.navCtrl.navigateBack("/sign-in").then(() => {
      localStorage.clear();
    });
  }
}

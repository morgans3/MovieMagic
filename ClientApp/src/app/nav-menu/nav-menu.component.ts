import { Component } from "@angular/core";
import { NotificationService } from "../_services/notification.service";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private notificationService: NotificationService) {}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  signup() {
    this.notificationService.info("This feature is in development and coming soon....");
  }
}

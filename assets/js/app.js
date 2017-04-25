import "phoenix_html"
import { Stripepay } from "./modules/stripepay";

window.addEventListener("load", function() {
  Stripepay.run();
});
// src/leaflet-routing-machine.d.ts
import 'leaflet';

declare module 'leaflet' {
  namespace Routing {
    class Control extends L.Control {
      constructor(options?: RoutingControlOptions);
    }

    interface RoutingControlOptions {
      waypoints: L.LatLng[];
      lineOptions?: {
        styles: Array<{ color: string; weight: number }>;
      };
      createMarker?: (i: number, waypoint: L.Routing.Waypoint, n: number) => L.Marker;
    }

    namespace L.Routing {
      class Waypoint {
        constructor(latLng: L.LatLng);
        latLng: L.LatLng;
      }
    }

    function control(options: RoutingControlOptions): Control;
  }
}

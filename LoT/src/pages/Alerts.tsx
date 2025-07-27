import type { JSX } from "react";
import MyLocationMap from "../component/MyLocationMap";

export function AlertsPage(): JSX.Element {
  return (
    <div>
      <p>alerta</p>
      <div>
        <MyLocationMap></MyLocationMap>
      </div>
    </div>
  );
}

import type { JSX } from "react";
import MyLocationMap from "../component/MyLocationMap";

export function MapsPage(): JSX.Element {
  return (
    <div>
      <p>Tu ubicacacion actual</p>
      <div>
        <MyLocationMap></MyLocationMap>
      </div>
    </div>
  );
}

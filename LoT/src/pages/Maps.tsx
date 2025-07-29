import type { JSX } from "react";
import MyLocationMap from "../component/MyLocationMap";

export function MapsPage(): JSX.Element {
  return (
    <div>
      <h1>Tu ubicacacion actual</h1>
      <div>
        <MyLocationMap></MyLocationMap>
      </div>
    </div>
  );
}

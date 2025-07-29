import type { JSX } from "react";
import { useAlertHistoryData } from "../hooks/sensor/useAlertsHistoryData";
import { AlertsList } from "../component/alerts/AlertsList";

export function AlertsPage(): JSX.Element {
  const { sensors } = useAlertHistoryData();

  if (sensors.length == 0) {
    return (
      <div>
        <p>No hay alertas de bajo combustible registradas.</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1>alerta</h1>
      <div>
        <AlertsList data={sensors}></AlertsList>
      </div>
    </div>
  );
}

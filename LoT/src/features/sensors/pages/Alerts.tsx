import type { JSX } from "react";
import { useAlertHistoryData } from "../hooks/useAlertsHistoryData";
import { AlertsList } from "../componets/AlertsList";

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

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { EventState, ShipmentTracking } from "@/types";
import { TransitEventState } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function createData(branch: string, date: string, time: string, state: TransitEventState) {
  return { branch, date, time, state };
}

interface EventsTableProps {
  transitEvents: ShipmentTracking["TransitEvents"] | undefined;
}

type EventsRow = {
  branch: string;
  date: string;
  time: string;
  state: TransitEventState;
};

export default function BasicTable({ transitEvents }: EventsTableProps) {
  const [tableRows, setTableRows] = useState<EventsRow[]>([]);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (transitEvents) {
      const rows: EventsRow[] = [];
      const locale = i18n.language === "en" ? "en-US" : "ar-EG";
      for (const element of transitEvents) {
        const eventDate = new Date(element.timestamp);
        rows.push(
          createData(element.hub ?? "Madinet Nasr", eventDate.toLocaleDateString(locale), eventDate.toLocaleTimeString(locale), element.state)
        );
      }
      setTableRows(rows);
    }
  }, [transitEvents]);

  return (
    <div className="table-container">
      <h2>{t("shipment-details")}</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Branch</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row, index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.branch}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{EventState[row.state]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

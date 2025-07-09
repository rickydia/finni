import { Link, useLoaderData } from "react-router";
import db from "~/lib/prisma";
import type { Route } from "./+types/route";
import css from "./styles.module.css";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Patients" }, { name: "description", content: "Patients" }];
}

export async function loader() {
  const patients = await db.patient.findMany({
    orderBy: { createdAt: "desc" },
  });
  return patients;
}

export default function PatientList() {
  const patients = useLoaderData<typeof loader>();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>Patients</h1>
        <Link to="new" className={css.addLink}>
          Add New
        </Link>
      </div>

      <table className={css.table}>
        <thead className={css.tableHeader}>
          <tr>
            <th className={css.tableHeaderCell}>Name</th>
            <th className={css.tableHeaderCell}>DOB</th>
            <th className={css.tableHeaderCell}>Status</th>
            <th className={css.tableHeaderCell}>Address</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className={css.tableRow}>
              <td className={css.tableCell}>
                {p.firstName} {p.middleName} {p.lastName}
              </td>
              <td className={css.tableCell}>
                {new Date(p.dateOfBirth).toLocaleDateString()}
              </td>
              <td className={css.tableCell}>{p.status}</td>
              <td className={css.tableCell}>{p.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

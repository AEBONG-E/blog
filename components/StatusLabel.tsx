import { STATUS_CLASS, type Status } from "@/lib/taxonomy";

export function StatusLabel({ status, count }: { status: Status; count?: number }) {
  return (
    <span className={`status-label ${STATUS_CLASS[status]}`}>
      {status}
      {count !== undefined ? ` ${count}` : ""}
    </span>
  );
}

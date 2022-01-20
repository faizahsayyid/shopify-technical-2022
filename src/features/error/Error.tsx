import styles from "./Error.module.css";

export const Error = ({ message }: { message?: string }) => {
  return (
    <div className={"text-danger " + styles.error}>
      <strong className="text-danger">ERROR:</strong>{" "}
      {message ? message : "Could not make your search. Please try again."}
    </div>
  );
};

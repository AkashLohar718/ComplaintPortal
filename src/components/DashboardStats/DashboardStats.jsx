import "./DashboardStats.css";

function DashboardStats({ title, value, type }) {
  return (
    <div className={`dashboard-stat-card ${type}`}>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

export default DashboardStats;
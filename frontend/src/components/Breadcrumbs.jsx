import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Map path segments to breadcrumb labels
  const breadcrumbNameMap = {
    properties: "Properties",
    details: "Property Details",
  };

  return (
    <nav aria-label="breadcrumb" style={{ marginBottom: ".5rem", marginTop: "6rem", marginLeft: '5rem' }}>
      <ol style={{ display: "flex", listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} style={{ marginLeft: "0.5rem" }}>
              {!isLast ? (
                <>
                  <span style={{ margin: "0 0.5rem" }}>&gt;</span>
                  <Link to={to}>{breadcrumbNameMap[value] || value}</Link>
                </>
              ) : (
                <>
                  <span style={{ margin: "0 0.5rem" }}>&gt;</span>
                  <span style={{color: '#fdb10e'}}>{breadcrumbNameMap[value] || value}</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
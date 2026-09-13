import { CSSProperties } from "react";

export const BrowserUpgradeWarning = () => {
  const containerStyle: CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const cardStyle: CSSProperties = {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    padding: "32px",
    maxWidth: "672px",
    width: "100%",
    textAlign: "center",
  };

  const iconContainerStyle: CSSProperties = {
    marginBottom: "24px",
    display: "flex",
    justifyContent: "center",
  };

  const iconWrapperStyle: CSSProperties = {
    width: "64px",
    height: "64px",
    backgroundColor: "#fef3c7",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const titleStyle: CSSProperties = {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#111827",
    marginBottom: "16px",
    lineHeight: "1.2",
  };

  const descriptionStyle: CSSProperties = {
    fontSize: "18px",
    color: "#4b5563",
    marginBottom: "24px",
    lineHeight: "1.6",
  };

  const sectionTitleStyle: CSSProperties = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "16px",
  };

  const browsersGridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "16px",
    marginBottom: "32px",
  };

  const browserLinkStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#111827",
    transition: "all 0.2s ease",
  };

  const browserIconStyle: CSSProperties = {
    width: "48px",
    height: "48px",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  };

  const browserNameStyle: CSSProperties = {
    fontSize: "14px",
    fontWeight: "500",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Icon */}
        <div style={iconContainerStyle}>
          <div style={iconWrapperStyle}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d97706"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>

        {/* Main message */}
        <h1 style={titleStyle}>Browser Update Required</h1>

        <p style={descriptionStyle}>
          Your browser doesn&apos;t support all the features required for this
          application.
          <br /> Please download one of these browsers, or update your browser
          to the latest version.
        </p>

        {/* Browser recommendations */}
        <div style={{ marginBottom: "32px" }}>
          <h3 style={sectionTitleStyle}>Recommended Browsers</h3>
          <div style={browsersGridStyle}>
            {[
              { name: "Chrome", url: "https://www.google.com/chrome/" },
              { name: "Firefox", url: "https://www.mozilla.org/firefox/" },
              { name: "Safari", url: "https://www.apple.com/safari/" },
              { name: "Edge", url: "https://www.microsoft.com/edge" },
            ].map(browser => (
              <a
                key={browser.name}
                href={browser.url}
                target="_blank"
                rel="noopener noreferrer"
                style={browserLinkStyle}
                onMouseOver={e => {
                  e.currentTarget.style.borderColor = "#93c5fd";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                <div style={browserIconStyle}>
                  <span>🌐</span>
                </div>
                <span style={browserNameStyle}>{browser.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

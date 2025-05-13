import { Button, Divider } from "antd";
import { asset } from "../../assets/assets";

const EmailVerification = ({ email, onSuccess }) => {
  const handleResend = () => {
    // Add resend logic here
    console.log("Resending confirmation to:", email);
  };
  return (
    <>
      <div className="verification-container">
        <div className="verification-card">
          <img
            src={asset.verification}
            alt=""
            style={{ width: "70%", height: "100%" }}
          />
        </div>
        <div className="verification-card">
          <h1>Email Confirmation</h1>
          <p style={{ textAlign: "center", margin: "0 0", lineHeight: "1.5" }}>
            We have sent a link to{" "}
            <span
              style={{ color: "#fdb10e", fontWeight: 600, fontSize: "1rem" }}
            >
              {email}
            </span>{" "}
            to confirm the validity of your email address. After receiving the
            email follow the instructions provided to complete your
            registration.
          </p>
          <Divider style={{ margin: "20px 0 0 0" }}></Divider>
          <p style={{ lineHeight: "1.5" }}>
            If you didn&apos;t receive any email{" "}
            <span
              style={{ color: "#fdb10e", cursor: "pointer", marginLeft: "5px" }}
            >
              <Button
                type="link"
                onClick={handleResend}
                style={{ color: "#fdb10e", padding: "0 5px" }}
              >
                Resend confirmation email
              </Button>
            </span>
          </p>
          <Button
            type="default"
            onClick={onSuccess}
            style={{ marginTop: "20px" }}
          >
            Continue to Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;

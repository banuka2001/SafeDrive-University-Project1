import React, { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import "../styles/SafetyGuidelines.css";
import { DarkModeContext } from "../context/DarkModeContext";

const faqData = [
  {
    key: "customers",
    title: "🚘 For Customers",
    content: (
      <ul>
        <li><strong>Identity Verification:</strong> Always verify the driver by scanning the provided QR code before starting the trip.</li>
        <li><strong>Vehicle Preparedness:</strong> Ensure your vehicle is roadworthy before handing it to the driver.</li>
        <li><strong>Respectful Behavior:</strong> Treat your driver with courtesy. Offensive or aggressive behavior is not tolerated.</li>
        <li><strong>Emergency Situations:</strong> Use the in-app emergency feature or contact authorities in case of emergency.</li>
      </ul>
    ),
  },
  {
    key: "drivers",
    title: "👨‍✈️ For Drivers",
    content: (
      <ul>
        <li><strong>QR Code Verification:</strong> Start the trip only after scanning the customer's QR code.</li>
        <li><strong>No Substance Use:</strong> Drivers must remain completely sober before and during all rides.</li>
        <li><strong>Professional Conduct:</strong> Be polite, professional, and refrain from inappropriate conversation.</li>
        <li><strong>Safe Driving:</strong> Follow all traffic laws and avoid distractions while driving.</li>
        <li><strong>Trip Status Updates:</strong> Update ride progress through the app and inform users of any issues or delays.</li>
      </ul>
    ),
  },
  {
    key: "general",
    title: "🔐 General Safety Practices",
    content: (
      <ul>
        <li><strong>Data Privacy:</strong> Keep your login credentials confidential and report suspicious activity.</li>
        <li><strong>Ratings & Reviews:</strong> Share feedback after every ride to maintain high service standards.</li>
        <li><strong>Support Access:</strong> Reach out to our support team 24/7 for any issues or lost items.</li>
      </ul>
    ),
  },
  {
    key: "violations",
    title: "⚠️ Violations and Reporting",
    content: (
      <>
        <p>
          Unsafe behavior, such as intoxicated driving, harassment, or fraud, may result in:
        </p>
        <ul>
          <li>Temporary or permanent suspension of account access</li>
          <li>Reports made to local authorities</li>
          <li>Restriction from using customer support features</li>
        </ul>
        <p>
          Please report any safety or conduct issues immediately using the in-app support tools.
        </p>
      </>
    ),
  },
];

const CustomToggle = ({ children, eventKey, isActive }) => (
  <div className="d-flex align-items-center justify-content-between w-100">
    <span>{children}</span>
    <span style={{ fontSize: "1.5rem", marginLeft: "1rem" }}>
      {isActive ? "-" : "+"}
    </span>
  </div>
);

const SafetyGuidelines = () => {
  const [activeKey, setActiveKey] = React.useState("customers");
  const { isDarkMode } = useContext(DarkModeContext);

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <div className={`safety-guidelines container py-5${isDarkMode ? " dark" : ""}`}>
      <h1 className="text-center mb-4">
        <span className="text-primary">Safety&nbsp;</span>
        <span className="text-warning">Guidelines</span>
        </h1>
      <Accordion activeKey={activeKey} alwaysOpen={false}>
        {faqData.map((item) => (
          <Accordion.Item eventKey={item.key} key={item.key}>
            <Accordion.Header onClick={() => handleToggle(item.key)}>
              <CustomToggle eventKey={item.key} isActive={activeKey === item.key}>
                {item.title}
              </CustomToggle>
            </Accordion.Header>
            <Accordion.Body>{item.content}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default SafetyGuidelines;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FORM_URL = "https://forms.gle/S5GhGrFrTGSNWg2j7";

const Apply = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.open(FORM_URL, "_blank", "noopener,noreferrer");
    navigate("/");
  }, [navigate]);

  return null;
};

export default Apply;

import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { fetchAppById } from "../../services/appsService";
import Loader from "../../components/Loader";
import AppForm from "./AppForm";

const EditApp = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchAppById(id)
      .then((data) => {
        if (active) setApp(data);
      })
      .catch(() => {
        if (active) setNotFound(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [id]);

  if (loading) return <Loader fullPage />;
  if (notFound) return <Navigate to="/admin/apps" replace />;

  return <AppForm mode="edit" app={app} />;
};

export default EditApp;

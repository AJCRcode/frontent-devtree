import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeAPI";
import DevTree from "../components/DevTree";

export default function AppLayout() {
  console.log("AppLayout");
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 1000),
    refetchOnWindowFocus: false,
  });
  console.log("data", data, "isLoading", isLoading, "isError", isError);

  if (isLoading)
    return (
      <p className="font-bold text-2xl text-center text-white">Cargando...</p>
    );

  if (isError && !data) {
    return <Navigate to="/auth/login" />;
  }

  if (data) return <DevTree data={data} />;

  return null; // O algún componente de fallback
}

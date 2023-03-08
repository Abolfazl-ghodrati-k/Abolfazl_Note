import { useContext } from "react";
import { LoadingContext } from "../context/Loading";

function useLoading() {
  const { text, settext, loading, setloading } = useContext(LoadingContext)!;
  return { text, settext, loading, setloading };
}

export default useLoading;

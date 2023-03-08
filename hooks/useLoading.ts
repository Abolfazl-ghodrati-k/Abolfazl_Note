import { useContext } from "react";
import { LoadingContext } from "../context/Loading";

function useLoading() {
  const { text, settext, loading, setloading } = useContext(LoadingContext)!;
  const startLoading = (t:string) => {
    setloading(true)
    settext(t)
  }
  const finishLoading = () => {
    setloading(false)
    settext('')
  }
  return { loading, text, settext, startLoading, finishLoading };
}

export default useLoading;

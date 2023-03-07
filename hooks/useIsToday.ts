import { getDate } from "../components/Note";
import { useState, useEffect } from 'react'

function useIsToday( date :  string | undefined) {
  const [isToday, setisToday] = useState(false)
  const {date: today} = getDate()
  
  useEffect(()=>{
    if(today == date){
      setisToday(true)
    } else {
      setisToday(false)
    }
  },[])
  
  return isToday;
}

export default useIsToday;

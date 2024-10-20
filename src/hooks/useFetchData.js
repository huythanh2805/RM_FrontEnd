import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export function useFetchData(url){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
      const fetData = async () => {
        try {
          const res = await fetch(url, {
            method: "GET",
          })
          if(!res.ok) {
           return toast({
              variant: "destructive",
              title: "Can't get any data!",
            })
          }
          const data = await res.json()
          setData(data.data)
          setLoading(false)
        } catch (error) {
          setError(error)
          setLoading(false)
          toast({
            variant: "destructive",
            title: "Something wrong with useFetchData!",
          })
        }
      }
      fetData()
    }, [url])
  
    return {
      loading,
      error,
      data,
    }
  }
  